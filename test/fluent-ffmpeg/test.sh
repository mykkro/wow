#!/bin/bash

ffmpeg -i ./media/test.3gp \
      -acodec libvorbis -ab 128k -ar 41000 \
      -vcodec libtheora -s 640x360 -r 30 \
      -y \
      ./output/test.ogv
