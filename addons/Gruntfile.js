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
        raphanoid: {
          options: {
            separator: ';',
          },
          src: [
            'games/raphanoid/js/raphanoid/raphanoid.js',
            'games/raphanoid/js/raphanoid/komponent.js',
            'games/raphanoid/js/raphanoid/ball.js',
            'games/raphanoid/js/raphanoid/bat.js',
            'games/raphanoid/js/raphanoid/brick.js',
            'games/raphanoid/js/raphanoid/livescounter.js',
            'games/raphanoid/js/raphanoid/scorecounter.js',
            'games/raphanoid/js/raphanoid/screen.js',
            'games/raphanoid/js/raphanoidgame.js'
          ],
          dest: 'games/raphanoid/js/app.js'
        },
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
            'shared/js/alpaca.min.js',

            'shared/js/raphaelicious-1.0.js',
            'shared/js/util.js',
            'shared/js/watches.js',

            'shared/js/game.js',
            'shared/js/splash.js',
            'shared/js/minilog.js',
            'shared/js/gameui.js'
          ],
          dest: 'shared/js/bundle.js'
        },
        css: {
          src: [
            'shared/css/normalize.css',
            'shared/css/compiled.css',
            "shared/css/alertify.core.css",
            "shared/css/alertify.default.css",
            'shared/css/alpaca.min.css',
          ],
          dest: 'shared/css/bundle.css'
        }
      },
      copy: {
        main: {
          files: [
            // includes files within path
            {expand: true, cwd: 'shared/js/', src: ['bundle.js'], dest: 'games/raphanoid/js/' },
            {expand: true, cwd: 'shared/css/', src: ['bundle.css'], dest: 'games/raphanoid/css/' },
            {expand: true, cwd: 'shared/media/', src: ['**'], dest: 'games/raphanoid/media/' },
            {expand: true, cwd: 'shared/', src: ['index.html'], dest: 'games/raphanoid/' },

            {expand: true, cwd: 'shared/js/', src: ['bundle.js'], dest: 'games/raphatris/js/' },
            {expand: true, cwd: 'shared/css/', src: ['bundle.css'], dest: 'games/raphatris/css/' },
            {expand: true, cwd: 'shared/media/', src: ['**'], dest: 'games/raphatris/media/' },
            {expand: true, cwd: 'shared/', src: ['index.html'], dest: 'games/raphatris/' },

            {expand: true, cwd: 'shared/js/', src: ['bundle.js'], dest: 'games/fifteen/js/' },
            {expand: true, cwd: 'shared/css/', src: ['bundle.css'], dest: 'games/fifteen/css/' },
            {expand: true, cwd: 'shared/media/', src: ['**'], dest: 'games/fifteen/media/' },
            {expand: true, cwd: 'shared/', src: ['index.html'], dest: 'games/fifteen/' },

            {expand: true, cwd: 'shared/js/', src: ['bundle.js'], dest: 'games/pexeso/js/' },
            {expand: true, cwd: 'shared/css/', src: ['bundle.css'], dest: 'games/pexeso/css/' },
            {expand: true, cwd: 'shared/media/', src: ['**'], dest: 'games/pexeso/media/' },
            {expand: true, cwd: 'shared/', src: ['index.html'], dest: 'games/pexeso/' }
          ]
        }
      },
      mustache_render: {
          options: {
            // Task global options go here
          },
          main: {
            options: {
              // Target specific options go here
            },
            files : [
              {
                data: "games/raphatris/wow.json",
                template: 'templates/index.mustache',
                dest: 'games/raphatris/index.html'
              }
            ]
          }
        },
      less: {
        main: {
          options: {
            paths: ["shared/less"]
          },
          files: {
            "shared/css/compiled.css": "shared/less/style.less"
          }
        }
      },
      generateindex: {
        raphatris: {
        },
        raphanoid: {

        },
        fifteen: {

        },
        pexeso: {

        }
      }      
    })

    grunt.registerMultiTask('dummy', 'Dummy stuff.', function() {
      grunt.log.writeln(this.target + ': ' + this.data);
    });

    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mustache-render');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerMultiTask('generateindex', 'Generate index.html and package.json.', function (key, value) {      
        var name = this.target
        var mustache = require("mustache")
        var gamedir = 'games/'+name+'/'
        var projectFile = gamedir + "wow.json";
        var data = grunt.file.readJSON(projectFile);

        function createIndex(name, locale) {
          var templateFile = "templates/index.html.mustache"
          var outFile = gamedir + "index_"+locale+".html"
          var localeFile = gamedir + "lang/"+locale+".json"
          var locData = grunt.file.readJSON(localeFile)
          var template = grunt.file.read(templateFile)

          var dd = { 
            wow: data, 
            translated: locData,
            wow_json: JSON.stringify(data),
            locale_json: JSON.stringify(locData)
          }
          grunt.file.write(outFile, mustache.render(template, dd));
        }
        createIndex(name, 'en')
        createIndex(name, 'cz')
        createIndex(name, 'de')

        // write package.json...
        var gamedir = 'games/'+name+'/'
        var templateFile = "templates/package.json.mustache"
        var template = grunt.file.read(templateFile)
        var outFile = gamedir + "package.json"
        grunt.file.write(outFile, mustache.render(template, data));
    });

  grunt.registerTask('default', ['less', 'concat', 'copy', 'generateindex']);
}
