#!/bin/bash

node runserver.js &
chromium-browser --kiosk --window-size=960,600 --url http://localhost:9999 --no-proxy-server
wait

