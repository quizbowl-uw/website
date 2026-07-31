# How to Edit the UW Quizbowl Website
*Updated by Kevin Kodama on August 18, 2022*

## Introduction
The UW Quizbowl Website is hosted at the address https://students.washington.edu/quizbowl/. To access the backend, you need to SSH into the student web publishing hub, which is called **vergil**. The backend server is located at quizbowl@vergil.u.washington.edu. You will also need access to the UW Quizbowl NetID, which has its own password.

## Part 1: Setup

### Windows
If you are on Windows, you'll need a special program to edit the website. Try one of these:
**Winscp**: Recommended for beginners. Primarily uses a GUI (graphical user interface) to edit, but you can also open a terminal. Download at https://winscp.net/eng/download.php.
**PuTTY**: Recommended by UW. Primarily uses a terminal to edit. Download at https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html.
**Git Bash**: You might already have Git Bash installed if you work with computers a lot. SSH should work fine from here as well. Download at https://git-scm.com/download/win.

### MacOS
If you are on MacOS or Linux, you can already follow the first tutorial using your built-in Terminal application. If you are intimidated by the terminal, there are probably some GUI-based Mac applications that you can try out, most notably FileZilla. However, FileZilla is a paid app, and I haven't found any alternatives. I'd recommend just learning how to use the Terminal; it's a skill that will help you later!

## Part 2A: MacOS / Linux / Git Bash / PuTTY Instructions

### Connecting to the Server
Open your Terminal application (or download and open PuTTY / Git Bash / other SSH client if you are on Windows) and type in the command "ssh quizbowl@vergil.u.washington.edu" (on PuTTY, type "quizbowl@vergil.u.washington.edu" in the Host Name box). You will then be prompted for a password. Enter the UW Quizbowl NetID password. *Note: the password will NOT show up as mystery characters on your screen as you are typing it.* Upon successful password entry, you should see a foreboding message about how this server is NOT FOR COMMERCIAL OR PERSONAL USE. You may run into the error "no matching host key type". If so, see the bottom of this guide. To see what's on the website, try the "ls" command. You should see a *public_html* directory, as well as a few files from the old UW site circa 2013. Do **NOT** delete or replace *public_html*. Seriously, don't do it. It contains a special link to the server that allows you to serve static pages. If you delete this folder, you'll have to go into the internal quizbowl NetID settings and reset the website. It's a whole mess. You don't want to have to do that. Trust me. If you delete it, scroll down to the bottom of this guide.

Anyway, now that you've made sure **NOT** to delete *public_html*, let's go inside the site with the command "cd public_html" and then "ls". This is where the real good stuff is. The home page of the website is *index.html*. Any other pages on the website will have this *.html* extension. Images for the website are located inside the *img* folder. This very document is stored at *README.md*. Don't worry about the rest of the files, but please don't mess with them either! If you want to return to a location after opening one of its folders, use the "cd .." command. If you want to get a preview of any file, use the "cat" command followed by the file name.

### Editing, Uploading, and Downloading Files
If you just want to update some text, you can edit files directly on the server using the "vim" command / editor. Type "vim" followed by the name of the file you wish to edit, and it will open an editor with the contents of the file. A full introduction to Vim is beyond the scope of this document, but here are the basics:
- There are two modes in Vim: NORMAL and INSERT mode. If you are in INSERT mode, it will say "-- INSERT --" at the bottom of the screen. You will not be able to edit text unless you are in INSERT mode. To switch to INSERT mode, press the "i" key. To switch to NORMAL mode, press the "esc" key.
- You can navigate around the document with the arrow keys.
- **IMPORTANT**: To exit Vim, go to NORMAL mode (by hitting the escape key). If you do NOT wish to save your work, type ":q!". If you do wish to save your work, type ":wq!". This should bring you back to the normal site navigation interface.
- If you want to learn more about Vim, there is a built-in tutorial that can be accessed with the command "vimtutor".

If you want to make more substantial edits (or upload images to the site), you might be more comfortable sending files back and forth from your computer to the website. This is *much* easier to do from your computer, because gaining access to your computer remotely is harder than gaining access to the UW Quizbowl site remotely. So, I would recommend going back your computer and going to where you want to put the files. First, use the "exit" command to leave the UW Quizbowl server. Then use "cd" as before to get to your folder of choice. To download files to your computer, use the command "scp source address:destination". For example, you could try "scp quizbowl@vergil.u.washington.edu:public_html/index.html quizbowl-website" to grab the main page and put it in a folder called quizbowl-website. In this example, make sure that the quizbowl-website folder exists before running the command! Also, remember that the destination is determined relative to the location you are already in. So make sure that the directory you're in is the one that you want!

If you want to grab all the files at once (which is usually what you want), type "scp -r quizbowl@vergil.u.washington.edu:public_html/* quizbowl-website" to copy over everything. You will be prompted for the password again. To send the files back up, go to the parent directory and use the scp command in the reverse order: "scp -r quizbowl-website/* quizbowl@vergil.u.washington.edu:public_html". You can verify that your changes have been submitted by going back to the website at students.washington.edu/quizbowl. Be aware that the site may be cached on your device, so you might have to refresh it a few times to see your changes appear. Whew!

## Part 2B: Winscp / GUI Instructions
Compared to using the Terminal, Winscp is easy (but less powerful). Type "vergil.u.washington.edu" into the Host Name box. Next, type "quizbowl" into the User name box and the UW Quizbowl NetID password into the Password box. The default port of 22 is fine. Once you press login, there will probably be some warnings you can ignore. But upon a successful login, you should see a split screen: the left side shows your computer and the right side shows the UW Quizbowl website. You can find the files in the main part of the website by double-clicking the *public_html* folder and then opening the *index.html* file. You can edit it right there in Winscp's editor, and pressing save will save your changes. This should be sufficient for minor edits, like updating times and dates. If you want to make more substantial edits, you may want to download and/or upload some files. To do this, just go to the desired folder on your computer (using the left side of the screen) and click the desired file and press "Download" on the right side. You can upload files by just doing this process in reverse with the "Upload" buttton. Be sure to NOT delete the *public_html* folder. It contains special functionality that allows the index.html page inside of it to be displayed on the site. Seriously, don't delete it. If you delete it, scroll to the bottom of this guide. Most of the editing stuff is self-explanatory, since Winscp is a graphical interface designed for beginners. However, you can still open a PuTTY terminal if you need to . If you choose to do so, everything in the MacOS / Terminal guide should still apply to you.

## Part 3: Further Reading
A full guide to web development and UW IT stuff is beyond the scope of this document. If you want a detailed introduction to web development, I would highly recommend taking CSE 154, which is offered to CS majors and non-majors alike through the Allen School. Here are some places to start learning more:

### NetID Management
This is where you can handle everything related to the UW Quizbowl NetID account. You can change the password, activate / deactivate web hosting, change the email settings, and do just about everything.
https://uwnetid.washington.edu/manage/

### UW IT Web Hosting Guide
This is the official UW guide to editing the website. I made this document so you don't have to look at it, but there is some stuff there that I did not cover and may be relevant to you at some point. It's pretty hard to use, but it has pretty much everything covered if you look hard enough.
https://itconnect.uw.edu/connect/web-publishing/shared-hosting/

### Introduction to Vim
If you want to learn more about that mysterious editor from before, check out this guide. Editing the website is definitely faster if you don't have to send files back and forth all the time.
https://www.tutorialspoint.com/vim/index.htm

### w3 Schools HTML Tutorial
This is a slow-paced tutorial that teaches you the basics of HTML so you can write your own web pages. The tutorial has a lot of interactive material that allows you to see your changes live.
https://www.w3schools.com/html/default.asp

### The Odin Project (only for MacOS)
If you want to dig deeper, this tutorial goes into styling, interactive JavaScript elements, and web dev frameworks (like React, Angular, and Vue). Only do this tutorial if you're really into web development.
*It is possible to get a React App to run on the UW Quizbowl website; that is a thing I did once. However, I would not recommend. You can ask me about it if you're curious.*
https://www.theodinproject.com/paths

## Troubleshooting

### If you deleted the *public_html* folder despite everything, see below:
Your public_html folder is actually a symlink (Linux-speak for ‘shortcut’) that points to a special folder on one of our web publishing servers. When you delete and then re-add the public_html “folder” this link is not automatically re-created. In order to fix this issue, you must do the following:
- Rename or delete your current public_html folder. Make sure no folder or file exists called “public_html”
- Deactivate your relevant web publishing service at https://uwnetid.washington.edu/manage/?service.
- Activate that service again. As part of the activation it should re-recreate your public_html folder.

### Unable to negotiate: no matching host key type found
This error is a bit harder to address; I would suggest reading over the Stack Overflow post below. This error occurs because the UW Quizbowl web server is not the most secure. You'll have to find some kind of file on your system that contains your SSH configuration and edit it. Good luck!
https://stackoverflow.com/questions/69875520/unable-to-negotiate-with-40-74-28-9-port-22-no-matching-host-key-type-found-th

*If you run into a problem not addressed in this guide, you can email me on Gmail (kodama.math).*
