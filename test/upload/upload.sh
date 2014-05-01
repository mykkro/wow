#!/bin/bash

# test image upload...

# usage: upload.sh image.jpg

curl --request 'POST' 'http://localhost:9999/fileupload' --verbose -F "image=@$1" -F "status=Test from cURL" --header "Expect: "