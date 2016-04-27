#!/bin/sh
if [ -z "$1" ]
then
  echo "Which folder do you want to deploy to GitHub Pages?"
  exit 1
fi
php index.php > dist/index.html
cp asset/common.bundle.css dist/asset/
git subtree push --prefix $1 origin gh-pages