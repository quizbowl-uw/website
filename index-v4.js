/*
 * KEVIN KODAMA
 * 09/26/2022
 *
 * This is the JavaScript for the University of Washington Quizbowl Team website.
 * It provides support for random literature generation, a quizbowl demo, and a lot
 * more interesting things.
 * 
 * Last updated by Yaj Jhajhria on June 23, 2026.
 */

"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * takes a csv file and parses it into usable array format
   * @param {string} str - csv file string to parse
   * @param {string} delimiter - delimiter character for file
   * @returns {Array} - array generated from csv
   */
  function csvToArray(str, delimiter = ",") {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    headers[5] = "url";
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    const arr = rows.map(function(row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function(object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });

    // return the array
    return arr;
  }

  /**
   * makes a fetch request to a server hosting a csv file with literary works,
   * then parses the text to send a random one of those works to the DOM
   */
  function processTable() {
    fetch("assets/short_generator_weighted.csv")
      .then(response => response.text())
      .then(async data => {
        let myResponse = data.toString();
        let myArray = csvToArray(myResponse);
        let randInt = Math.floor(Math.random() * myArray.length);
        await constructNode(myArray, randInt);
      });
    changeCSS();
  }

  /**
   * changes CSS of section after click
   */
  function changeCSS() {
    let node = document.getElementById("interactive");
    if (node.classList.contains("pre-clicked")) {
      node.classList.remove("pre-clicked");
    }
    node.classList.add("post-clicked");
  }

  /**
   * takes array and constructs nodes to attach to the DOM from that array
   * @param {*} myArray array containing literary works, consists of title,
   * author, url, type, and hits columns
   * @param {*} i requested row number of array (randomly generated)
   */
  async function constructNode(myArray, i) {
    // creating node for link to work text
    let titleAnchor = document.createElement('a');
    titleAnchor.href = myArray[i].url;
    titleAnchor.textContent = myArray[i].title;
    let titleItem = document.createElement('li');
    titleItem.appendChild(titleAnchor);

    // creating node for author text
    let authorItem = document.createElement('li');
    authorItem.textContent = myArray[i].type + " by " + myArray[i].author;

    // creating node for country text
    let countryItem = document.createElement('li');
    countryItem.textContent = myArray[i].country;

    // creating node for link to QuizDB
    let query = myArray[i].title.replace(" ", "+");
    let quizAnchor = document.createElement('a');
    let quizUrl = "https://www.qbreader.org/db/?queryString=" + query + "&categories=Literature";
    quizAnchor.href = quizUrl;
    let hits = await getDBHits(myArray[i].title).catch(() => myArray[i].hits);
    // let hits = myArray[i].hits;
    quizAnchor.textContent = "QB Reader database link (" + hits + " hits)";
    let quizItem = document.createElement('li');
    quizItem.appendChild(quizAnchor);

    // adding nodes to list
    let newList = document.createElement('ul');
    newList.append(titleItem, authorItem, countryItem, quizItem);
    newList.setAttribute('id', "read-list");
    newList.classList.add("no-list-decor");

    let newItem = document.createElement('section');
    let newTitle = document.createElement('h2');
    newTitle.textContent = "Read This!"
    newItem.appendChild(newTitle);
    newItem.appendChild(newList);

    // appending list to DOM
    let nodeDestination = document.getElementById("item-holder");
    console.log(nodeDestination);
    console.log(nodeDestination.childNodes);
    if (nodeDestination.childNodes.length === 3) {
      nodeDestination.appendChild(newItem);
    } else {
      nodeDestination.replaceChild(newItem, nodeDestination.childNodes[4]);
    }
  }

  /**
   * calls the qbreader api to get the number of hits for a title on the db.
   * @param {*} query title of literary work to get qbreader hits for
   */
  async function getDBHits(query) {
    try {
      const baseUrl = "https://www.qbreader.org/api/query";
      const params = new URLSearchParams({
        queryString: query,
        categories: ["Literature"],
      });
      const response = await fetch(`${baseUrl}?${params.toString()}`);
      const data = await response.json();
      return (data.tossups?.count || 0) + (data.bonuses?.count || 0);
    } catch (error) {
      console.error("Error getting number of qbreader hits. Defauting to data in CSV.");
    }
  }

  /**
   * adds click event listeners to buttons
   */
  function init() {
    const gen = document.querySelector('#random-generator');
    gen.addEventListener('click', processTable);
  }
})();
