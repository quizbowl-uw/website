#!/bin/bash

# Usage: ./replace_name.sh file dead_name new_name
# Case Specific Gavin != gavin 

# Check if correct number of arguments is provided
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 input_file old_name new_name"
    exit 1
fi

file=$1
dead_name=$2
new_name=$3

# Check if the input file exists
if [ ! -f "$file" ]; then
    echo "Error: File '$file' not found!"
    exit 1
fi

# Modify the content, changing the file
sed -i "s/$dead_name/$new_name/g" "$file"
echo "All instances of '$dead_name' have been replaced with '$new_name' in '$file'"
