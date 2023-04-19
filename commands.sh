#!/bin/bash

node ./dist/scraper.js &
/wait
node ./dist/index.js