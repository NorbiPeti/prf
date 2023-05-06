#!/usr/bin/env bash

echo "Installing packages"
npm install
echo "Running application"
wait-for-it database:27017 -t 0
npm start
