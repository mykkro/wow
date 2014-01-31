module.exports = function (grunt) {
    grunt.initConfig({
      nodewebkit: {
        options: {
            build_dir: '../webkitbuilds', // Where the build version of my node-webkit app is saved
            mac: false, 
            win: true,
            linux32: false, 
            linux64: true, 
    		version: '0.8.4',
            app_name: 'wow',
            app_version: '0.1'
        },
        src: ['./**/*'] // Your node-wekit app
      },
      browserify: {
        basic: {
            src: ['./js/widgetizer.js', './js/i18n.js', './js/pageinfo.js'],
            dest: 'public/js/bundle.js',
            options: {
              alias: ['./js/widgetizer.js:widgetizer', './js/i18n.js:i18n', './js/pageinfo.js:pageinfo']
            }
          },
          // TODO do automatic scanning or regular expression...
          pg_login: {
            src: ['./pages/login.js'],
            dest: 'public/js/pages/login.js',
            options: { alias: [ './pages/login.js:pagescript' ]}
          },
          pg_home: {
            src: ['./pages/home.js'],
            dest: 'public/js/pages/home.js',
            options: { alias: [ './pages/home.js:pagescript' ]}
          },
          pg_books: {
            src: ['./pages/books.js'],
            dest: 'public/js/pages/books.js',
            options: { alias: [ './pages/books.js:pagescript' ]}
          },
          pg_bookcategories: {
            src: ['./pages/bookcategories.js'],
            dest: 'public/js/pages/bookcategories.js',
            options: { alias: [ './pages/bookcategories.js:pagescript' ]}
          },
          pg_radio: {
            src: ['./pages/radio.js'],
            dest: 'public/js/pages/radio.js',
            options: { alias: [ './pages/radio.js:pagescript' ]}
          },
          pg_youtube: {
            src: ['./pages/youtube.js'],
            dest: 'public/js/pages/youtube.js',
            options: { alias: [ './pages/youtube.js:pagescript' ]}
          },
          pg_video: {
            src: ['./pages/video.js'],
            dest: 'public/js/pages/video.js',
            options: { alias: [ './pages/video.js:pagescript' ]}
          }
      },
      less: {
        development: {
          options: {
            paths: ["./css"]
          },
          files: {
            "public/css/bundle.css": "css/style.less"
          }
        },
        production: {
          options: {
            paths: ["./css"],
            cleancss: true
          },
          files: {
            "public/css/bundle.min.css": "css/style.less"
          }
        }
      },
      execute: {
          target: {
              src: ['runserver.js']
          }
      }
    })
	  grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-execute');

    grunt.registerTask('default', ['browserify', 'less']);
}
