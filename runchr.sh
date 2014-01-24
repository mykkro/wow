#!/bin/bash

node runserver.js &
chromium-browser --url http://localhost:9999
wait

