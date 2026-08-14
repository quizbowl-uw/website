#!/bin/bash
# Authored by Yaj Jhajhria in 2026.

for file in "$@"; do
	cwebp -q 80 $file -o ${file%.*}.webp
done
