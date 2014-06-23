#!/bin/bash

find . -maxdepth 2 -name package.json -execdir npm install \;

