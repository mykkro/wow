module.exports = function (grunt) {
    grunt.initConfig({
      zip: {
        samplebook: {
          cwd: 'books/samplebook/',
          src: ['books/samplebook/**'],
          dest: 'dist/samplebook.zip'
        },
        fifteen: {
          cwd: 'games/fifteen/',
          src: ['games/fifteen/**'],
          dest: 'dist/fifteen.zip'
        },
        pexeso: {
          cwd: 'games/pexeso/',
          src: ['games/pexeso/**'],
          dest: 'dist/pexeso.zip'
        },
        raphatris: {
          cwd: 'games/raphatris/',
          src: ['games/raphatris/**'],
          dest: 'dist/raphatris.zip'
        },
        raphanoid: {
          cwd: 'games/raphanoid/',
          src: ['games/raphanoid/**'],
          dest: 'dist/raphanoid.zip'
        }
      },
      concat: {
        js: {
          options: {
            separator: ';',
          },
          src: [
            'shared/js/underscore-min.js',
            'shared/js/base.js',
            'shared/js/jquery-2.0.3.min.js',
            'shared/js/jquery.zoomooz.min.js',
            'shared/js/alertify.min.js',
            'shared/js/raphael-min.js',

            'shared/js/raphaelicious-1.0.js',
            'shared/js/util.js',
            'shared/js/watches.js',

            'shared/js/game.js',
            'shared/js/splash.js',
            'shared/js/minilog.js',
            'shared/js/gameui.js',
            'shared/js/app.js'
          ],
          dest: 'games/raphanoid/js/bundle.js'
        },
        css: {
          src: [
            'shared/css/normalize.css',
            'shared/css/ui.css',
            "shared/css/alertify.core.css",
            "shared/css/alertify.default.css"
          ],
          dest: 'games/raphanoid/css/bundle.css'
        }
      }
    })

    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-contrib-concat');
}
