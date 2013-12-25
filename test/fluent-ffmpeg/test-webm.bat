
echo 'Converting 3gp to webm...'
ffmpeg -i ./media/test.3gp -acodec libvorbis -ab 128k -ar 41000  -s 640x360 -r 30 -y ./output/test-3gp.webm

echo 'Converting flv to webm...'
ffmpeg -i ./media/test.flv -acodec libvorbis -ab 128k -ar 41000  -s 640x360 -r 30 -y ./output/test-flv.webm

echo 'Converting webm to webm...'
ffmpeg -i ./media/test.webm -acodec libvorbis -ab 128k -ar 41000  -s 640x360 -r 30 -y ./output/test-webm.webm

echo 'Converting mp4 to webm...'
ffmpeg -i ./media/test.mp4 -acodec libvorbis -ab 128k -ar 41000  -s 640x360 -r 30 -y ./output/test-mp4.webm

echo 'Converting ogv to webm...'
ffmpeg -i ./media/test.ogv -acodec libvorbis -ab 128k -ar 41000  -s 640x360 -r 30 -y ./output/test-ogv.webm

echo 'Converting avi to webm...'
ffmpeg -i ./media/test.avi -acodec libvorbis -ab 128k -ar 41000  -s 640x360 -r 30 -y ./output/test-avi.webm

echo 'Converting mov to webm...'
ffmpeg -i ./media/test.mov -acodec libvorbis -ab 128k -ar 41000  -s 640x360 -r 30 -y ./output/test-mov.webm

