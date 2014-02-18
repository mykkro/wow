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
            src: ['./pages/login/main.js'],
            dest: 'public/js/pages/login.js',
            options: { alias: [ './pages/login/main.js:pagescript' ]}
          },
          pg_home: {
            src: ['./pages/home/main.js'],
            dest: 'public/js/pages/home.js',
            options: { alias: [ './pages/home/main.js:pagescript' ]}
          },
          pg_books: {
            src: ['./pages/books/main.js'],
            dest: 'public/js/pages/books.js',
            options: { alias: [ './pages/books/main.js:pagescript' ]}
          },
          pg_bookcategories: {
            src: ['./pages/bookcategories/main.js'],
            dest: 'public/js/pages/bookcategories.js',
            options: { alias: [ './pages/bookcategories/main.js:pagescript' ]}
          },
          pg_radio: {
            src: ['./pages/radio/main.js'],
            dest: 'public/js/pages/radio.js',
            options: { alias: [ './pages/radio/main.js:pagescript' ]}
          },
          pg_youtube: {
            src: ['./pages/searchvideos/main.js'],
            dest: 'public/js/pages/searchvideos.js',
            options: { alias: [ './pages/searchvideos/main.js:pagescript' ]}
          },
          pg_uservideos: {
            src: ['./pages/uservideos/main.js'],
            dest: 'public/js/pages/uservideos.js',
            options: { alias: [ './pages/uservideos/main.js:pagescript' ]}
          },
          pg_userapps: {
            src: ['./pages/userapps/main.js'],
            dest: 'public/js/pages/userapps.js',
            options: { alias: [ './pages/userapps/main.js:pagescript' ]}
          },
          pg_favvideos: {
            src: ['./pages/favvideos/main.js'],
            dest: 'public/js/pages/favvideos.js',
            options: { alias: [ './pages/favvideos/main.js:pagescript' ]}
          },
          pg_video: {
            src: ['./pages/video/main.js'],
            dest: 'public/js/pages/video.js',
            options: { alias: [ './pages/video/main.js:pagescript' ]}
          },
          pg_app: {
            src: ['./pages/app/main.js'],
            dest: 'public/js/pages/app.js',
            options: { alias: [ './pages/app/main.js:pagescript' ]}
          },
          pg_enter: {
            src: ['./pages/entertainment/main.js'],
            dest: 'public/js/pages/entertainment.js',
            options: { alias: [ './pages/entertainment/main.js:pagescript' ]}
          },
          pg_testing: {
            src: ['./pages/testing/main.js'],
            dest: 'public/js/pages/testing.js',
            options: { alias: [ './pages/testing/main.js:pagescript' ]}
          },
          pg_widgets: {
            src: ['./pages/widgets/main.js'],
            dest: 'public/js/pages/widgets.js',
            options: { alias: [ './pages/widgets/main.js:pagescript' ]}
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
            {src: ['bin/win32/**']},
            {src: ['node_modules/**', 
              '!node_modules/browserify/**',
              '!node_modules/browserify-shim/**',
              '!node_modules/grunt/**',
              '!node_modules/grunt-browserify/**',
              '!node_modules/grunt-contrib-compress/**',
              '!node_modules/grunt-contrib-less/**',
              '!node_modules/grunt-execute/**',
              '!node_modules/grunt-node-webkit-builder/**',
              '!node_modules/grunt-downloadfile/**',
              '!node_modules/node-chrome/**',
              '!node_modules/pouchdb/**',
              ]}
          ]
        }
      },
      downloadfile: {
        files: [
          {url:'http://nodejs.org/dist/v0.10.25/node.exe', dest:'bin/win32'},
          {url:'http://nodejs.org/dist/v0.10.25/x64/node.exe', dest:'bin/win64'}
        ]
      },  
    })
	  grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-downloadfile');

    grunt.registerTask('default', ['browserify', 'less']);
}
