
echo 'Converting 3gp to ogv...'
ffmpeg -i ./media/test.3gp -acodec libvorbis -ab 128k -ar 41000 -s 640x360 -r 30 -y ./output/test-3gp.ogv

echo 'Converting flv to ogv...'
ffmpeg -i ./media/test.flv -acodec libvorbis -ab 128k -ar 41000 -s 640x360 -r 30 -y ./output/test-flv.ogv

echo 'Converting webm to ogv...'
ffmpeg -i ./media/test.webm -acodec libvorbis -ab 128k -ar 41000 -s 640x360 -r 30 -y ./output/test-webm.ogv

echo 'Converting mp4 to ogv...'
ffmpeg -i ./media/test.mp4 -acodec libvorbis -ab 128k -ar 41000 -s 640x360 -r 30 -y ./output/test-mp4.ogv

echo 'Converting ogv to ogv...'
ffmpeg -i ./media/test.ogv -acodec libvorbis -ab 128k -ar 41000 -s 640x360 -r 30 -y ./output/test-ogv.ogv

echo 'Converting avi to ogv...'
ffmpeg -i ./media/test.avi -acodec libvorbis -ab 128k -ar 41000 -s 640x360 -r 30 -y ./output/test-avi.ogv

echo 'Converting mov to ogv...'
ffmpeg -i ./media/test.mov -acodec libvorbis -ab 128k -ar 41000 -s 640x360 -r 30 -y ./output/test-mov.ogv


