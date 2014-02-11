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
            src: ['./js/widgetizer.js', './js/i18n.js', './js/pageinfo.js', './js/dialogs.js'],
            dest: 'public/js/bundle.js',
            options: {
              alias: ['./js/widgetizer.js:widgetizer', './js/i18n.js:i18n', './js/pageinfo.js:pageinfo', './js/dialogs.js:dialogs']
            }
          },
          // TODO do automatic scanning or regular expression...
          pg_admin: {
            src: ['./js/admin.js'],
            dest: 'public/js/pages/admin.js',
            options: { alias: [ ] }
          },
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
          pg_uservideos: {
            src: ['./pages/uservideopage.js'],
            dest: 'public/js/pages/uservideopage.js',
            options: { alias: [ './pages/uservideopage.js:pagescript' ]}
          },
          pg_userapps: {
            src: ['./pages/userapps.js'],
            dest: 'public/js/pages/userapps.js',
            options: { alias: [ './pages/userapps.js:pagescript' ]}
          },
          pg_favvideos: {
            src: ['./pages/favvideospage.js'],
            dest: 'public/js/pages/favvideopage.js',
            options: { alias: [ './pages/favvideopage.js:pagescript' ]}
          },
          pg_video: {
            src: ['./pages/video.js'],
            dest: 'public/js/pages/video.js',
            options: { alias: [ './pages/video.js:pagescript' ]}
          },
          pg_app: {
            src: ['./pages/app.js'],
            dest: 'public/js/pages/app.js',
            options: { alias: [ './pages/app.js:pagescript' ]}
          },
          pg_enter: {
            src: ['./pages/entertainment.js'],
            dest: 'public/js/pages/entertainment.js',
            options: { alias: [ './pages/entertainment.js:pagescript' ]}
          }
      },
      less: {
        development: {
          options: {
            paths: ["./css"]
          },
          files: {
            "public/css/bundle.css": "less/style.less"
          }
        },
        production: {
          options: {
            paths: ["./css"],
            cleancss: true
          },
          files: {
            "public/css/bundle.min.css": "less/style.less"
          }
        }
      },
      execute: {
          target: {
              src: ['runserver.js']
          }
      },
      compress: {
        main: {
          options: {
            archive: 'dist/wow.zip'
          },
          files: [
            {src: ['assets/**', 'css/**', 'fonts/**', 'js/**', 'lib/**', 'locales/**', 'media/**', 'pages/**', 'public/**', 'routes/**', 'templates/**', 'views/**']},
            {src: ['run.bat', 'run.js', 'server.js', 'package.json', 'main.js']},
            {src: ['node_modules/**', 
              '!node_modules/browserify/**',
              '!node_modules/browserify-shim/**',
              '!node_modules/grunt/**',
              '!node_modules/grunt-browserify/**',
              '!node_modules/grunt-contrib-compress/**',
              '!node_modules/grunt-contrib-less/**',
              '!node_modules/grunt-execute/**',
              '!node_modules/grunt-node-webkit-builder/**',
              '!node_modules/node-chrome/**',
              '!node_modules/pouchdb/**',
              ]}
          ]
        }
      }      
    })
	  grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('default', ['browserify', 'less']);
}
