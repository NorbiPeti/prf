#!/usr/bin/env bash

cd client
echo "Installing packages"
npm install
echo "Running application"
npm run watch
