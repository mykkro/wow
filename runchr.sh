#!/bin/bash

node runserver.js &
chromium-browser --kiosk --url http://localhost:9999 --no-proxy-server
wait

