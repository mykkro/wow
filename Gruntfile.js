module.exports = function(grunt) {
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
                src: [
                    './js/widgetizer.js',
                    './js/i18n.js',
                    './js/pageinfo.js',
                    './js/dialogs.js',
                    './js/mygamepad.js',
                    './js/BasePage.js',
                    './js/eventtarget.js',
                    './js/virtualcontrol.js'
                ],
                dest: 'public/js/bundle.js',
                options: {
                    alias: [
                        './js/widgetizer.js:widgetizer',
                        './js/i18n.js:i18n',
                        './js/pageinfo.js:pageinfo',
                        './js/dialogs.js:dialogs',
                        './js/mygamepad.js:mygamepad',
                        './js/BasePage.js:BasePage',
                        './js/eventtarget.js:eventtarget',
                        './js/virtualcontrol.js:virtualcontrol'
                    ],
                    transform: ['brfs']
                }
            },
            game_bundle: {
                // browserify -r ./js/game/Game:Game -r ./js/game/MiniLog:Minig -r ./js/game/Util:Util -r ./js/game/Watches:Watches -o public/js/  game.bundle.js
                src: [
                    './js/game/Game.js',
                    './js/game/GridController.js',
                    './js/game/MiniLog.js',
                    './js/game/Util.js',
                    './js/game/Watches.js'
                ],
                dest: 'public/js/game.bundle.js',
                options: {
                    alias: [
                        './js/game/Game.js:Game',
                        './js/game/GridController.js:GridController',
                        './js/game/MiniLog.js:MiniLog',
                        './js/game/Util.js:Util',
                        './js/game/Watches.js:Watches'
                    ],
                }
            },
            // TODO do automatic scanning or regular expression...
            pg_admin: {
                src: ['./js/admin.js'],
                dest: 'public/js/pages/admin.js',
                options: {
                    alias: [],
                    transform: ['brfs']
                }
            },
            pg_login: {
                src: ['./pages/login/main.js'],
                dest: 'public/js/pages/login.js',
                options: {
                    alias: ['./pages/login/main.js:pagescript'],
                    transform: ['brfs']
                }
            },
            pg_home: {
                src: ['./pages/home/main.js'],
                dest: 'public/js/pages/home.js',
                options: {
                    alias: ['./pages/home/main.js:pagescript'],
                    transform: ['brfs']
                }
            },
            pg_books: {
                src: ['./pages/books/main.js'],
                dest: 'public/js/pages/books.js',
                options: {
                    alias: ['./pages/books/main.js:pagescript'],
                    transform: ['brfs']
                }
            },
            pg_bookcategories: {
                src: ['./pages/bookcategories/main.js'],
                dest: 'public/js/pages/bookcategories.js',
                options: {
                    alias: ['./pages/bookcategories/main.js:pagescript'],
                    transform: ['brfs']
                }
            },
            pg_radio: {
                src: ['./pages/radio/main.js'],
                dest: 'public/js/pages/radio.js',
                options: {
                    alias: ['./pages/radio/main.js:pagescript'],
                    transform: ['brfs']
                }
            },
            pg_youtube: {
                src: ['./pages/searchvideos/main.js'],
                dest: 'public/js/pages/searchvideos.js',
                options: {
                    alias: ['./pages/searchvideos/main.js:pagescript'],
                    transform: ['brfs']
                }
            },
            pg_uservideos: {
                src: ['./pages/uservideos/main.js'],
                dest: 'public/js/pages/uservideos.js',
                options: {
                    alias: ['./pages/uservideos/main.js:pagescript'],
                    transform: ['brfs']
                }
            },
            pg_userapps: {
                src: ['./pages/userapps/main.js'],
                dest: 'public/js/pages/userapps.js',
                options: {
                    alias: ['./pages/userapps/main.js:pagescript'],
                    transform: ['brfs']
                }
            },
            pg_favvideos: {
                src: ['./pages/favvideos/main.js'],
                dest: 'public/js/pages/favvideos.js',
                options: {
                    alias: ['./pages/favvideos/main.js:pagescript'],
                    transform: ['brfs']
                }
            },
            pg_video: {
                src: ['./pages/video/main.js'],
                dest: 'public/js/pages/video.js',
                options: {
                    alias: ['./pages/video/main.js:pagescript'],
                    transform: ['brfs']
                }
            },
            pg_app: {
                src: ['./pages/app/main.js'],
                dest: 'public/js/pages/app.js',
                options: {
                    alias: ['./pages/app/main.js:pagescript'],
                    transform: ['brfs']
                }
            },
            pg_game: {
                src: ['./pages/game/main.js'],
                dest: 'public/js/pages/game.js',
                options: {
                    alias: ['./pages/game/main.js:pagescript'],
                    transform: ['brfs']
                }
            },
            pg_rulegame: {
                src: ['./pages/rulegame/main.js'],
                dest: 'public/js/pages/rulegame.js',
                options: {
                    alias: ['./pages/rulegame/main.js:pagescript'],
                    transform: ['brfs']
                }
            },
            pg_enter: {
                src: ['./pages/entertainment/main.js'],
                dest: 'public/js/pages/entertainment.js',
                options: {
                    alias: ['./pages/entertainment/main.js:pagescript'],
                    transform: ['brfs']
                }
            },
            pg_testing: {
                src: ['./pages/testing/main.js'],
                dest: 'public/js/pages/testing.js',
                options: {
                    alias: ['./pages/testing/main.js:pagescript'],
                    transform: ['brfs']
                }
            },
            pg_widgets: {
                src: ['./pages/widgets/main.js'],
                dest: 'public/js/pages/widgets.js',
                options: {
                    alias: ['./pages/widgets/main.js:pagescript'],
                    transform: ['brfs']
                }
            },
            pg_netradio: {
                src: ['./pages/netradio/main.js'],
                dest: 'public/js/pages/netradio.js',
                options: {
                    alias: ['./pages/netradio/main.js:pagescript'],
                    transform: ['brfs']
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            appjs: {
                src: [
                    "js/vendor/underscore-min.js",
                    "js/vendor/jquery-2.1.0.min.js",
                    "js/vendor/jquery.history.min.js",
                    "js/vendor/jquery.svg.min.js",
                    "js/vendor/jquery.svgdom.min.js",
                    "js/vendor/jquery.zoomooz.min.js",
                    "js/vendor/jquery.ba-resize.js",
                    "js/vendor/d3.v3.min.js",
                    "js/vendor/svgjs/svg.min.js",
                    "js/vendor/svgjs/svg.easing.min.js",
                    "js/vendor/svgjs/svg.filter.js",
                    "js/vendor/soundmanager2.js",
                    "js/vendor/jquery.playable.js",
                    "js/vendor/jquery.youtubedrop.js",
                    "js/vendor/gamepad.min.js",
                    "js/vendor/mustache.js",
                    // tried newer alpaca (in js/vendor/alpaca), but there are some problems
                    // so we use the older one
                    "js/vendor/alpaca.min.js",
                    "js/vendor/moment-with-langs.min.js",
                    "js/vendor/raphael-min.js",
                    "js/vendor/raphaelicious-1.0.js",
                    "js/vendor/yetii.js"
                ],
                dest: 'public/js/wow-libs.js'
            },
            adminjs: {
                src: [
                    // "js/vendor/jquery.ui/jquery-ui-1.10.4.min.js"
                ],
                dest: 'public/js/wow-admin.js'
            },
            appcss: {
                src: [
                    "public/css/normalize.css",
                    "js/vendor/alpaca.min.css"
                ],
                dest: 'public/css/wow-libs.css'
            }
        },
        less: {
            development: {
                options: {
                    paths: ["./css"]
                },
                files: {
                    "public/css/bundle.css": [
                        "public/css/wow-libs.css",
                        "less/style.less",
                        "less/game.less"
                    ],
                    "public/css/admin.bundle.css": [
                        "less/admin.less"
                    ]
                }
            }
            /*
        production: {
          options: {
            paths: ["./css"],
            cleancss: true
          },
          files: {
            "public/css/bundle.min.css": [
              "public/css/wow-libs.css",
              "less/style.less",
              "less/game.less"
              ]
          }
        }
        */
        },
        execute: {
            target: {
                src: ['runserver.js']
            }
        },
        compress: {
            main: {
                options: {
                    // TODO how to get this filename by appending version number from package.json?
                    archive: 'dist/wow-0.9.0.zip'
                },
                files: [{
                    src: ['assets/**', 'css/**', 'fonts/**', 'js/**', 'lib/**', 'locales/**', 'media/**', 'pages/**', 'public/**', 'routes/**', 'templates/**', 'views/**']
                }, {
                    src: ['run.bat', 'run7.bat', 'run.js', 'server.js', 'package.json', 'main.js']
                }, {
                    src: ['bin/win32/**']
                }, {
                    src: ['addons/dist/**']
                }, {
                    src: ['node_modules/**',
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
                        '!tools/**'
                    ]
                }]
            }
        },
        jsbeautifier: {
            files: [
                "js/**/*.js",
                "pages/**/*.js",
                "!js/vendor/**/*.js",
                "Gruntfile.js"
            ],
            options: {}
        },
        docker: {
            options: {
                // These options are applied to all tasks
                ignoreHidden: true,
                sidebarState: true,
                lineNums: true
            },
            main: {
                // Specify `src` and `dest` directly on the task object
                src: [
                    'lib/**/*.js',
                    'js/game/**/*.js',
                    'js/rulegame/**/*.js',
                    'js/admin/**/*.js',
                    'js/util/**/*.js',
                    'js/widgets/**/*.js',
                    'js/*.js',
                    'client.js'
                ],
                options: {
                    outDir: 'docs',
                    exclude: [
                        'node_modules/**',
                        // TODO exclude not working
                        'vendor/**'
                    ],
                    extras: ["fileSearch"]
                }
            }
        },

        clean: {
            docs: ['docs']
        },
        downloadfile: {
            files: [{
                url: 'http://nodejs.org/dist/v0.10.25/node.exe',
                dest: 'bin/win32'
            }, {
                url: 'http://nodejs.org/dist/v0.10.25/x64/node.exe',
                dest: 'bin/win64'
            }]
        },
    })
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-downloadfile');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-docker');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['concat', 'browserify', 'less']);
    grunt.registerTask('makedoc', ['clean:docs', 'jsbeautifier', 'docker']);
}
