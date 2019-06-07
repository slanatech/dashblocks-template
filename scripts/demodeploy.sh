#!/bin/bash

# abort on errors
set -e

# navigate into the build output directory
cd demo

git init
git add -A
git commit -m 'deploy for github pages'

git push -f https://github.com/slanatech/dashblocks-template.git master:gh-pages

cd -
