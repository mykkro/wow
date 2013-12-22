
# Magician

  Library for **easy** image manipulation. Requires ImageMagick.

# Installation

```npm install magician```

# Dependencies

The main dependency is ImageMagick. convert and identify command-line tools, in fact. If you are happy user of Mac, you can install ImageMagick using HomeBrew:

```brew install imagemagick```

or using [ImageMagick Installer](http://cactuslab.com/imagemagick/) by CactusLab.

# Features

* Resizing images (-resize, -thumbnail or -sample)
* Cropping images
* Getting dimensions of an image

# Usage

```
Magician = require 'magician'

image = new Magician "source.jpg", "target.jpg"

image.resize width: 100, height: 100, (err) -> # you can force magician to use thumbnail or sample methods by passing thumbnail: yes or sample: yes respectively.
	# done!
	
image.crop x: 0, y: 0, width: 200, height: 100, (err) ->
	# done!

image.convert (err) ->
	# convert from source format to target format

image.getDimensions (err, dimensions) ->
	width = dimensions.width
	height = dimensions.height
```

# Tests

You can run tests using mocha:

```
mocha
```

Don't forget to install development dependencies first:

```
npm install --development
```

# TODO List

* Resizing using ratio
* Improve test for convert() method
* Blurring image

# License 

(The MIT License)

Copyright (c) 2011 Vadim Demedes &lt;sbioko@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.