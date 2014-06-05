module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            basic: {
                src: [
                    './js/widgetizer.js',
                    './js/i18n.js',
                    './js/pageinfo.js',
                    './js/dialogs.js',
                    './js/mygamepad.js',
                    './js/BasePage.js',
                    './js/Logger.js',
                    './js/eventtarget.js',
                    './js/virtualcontrol.js'
                ],
                dest: 'public/js/core.bundle.js',
                options: {
                    alias: [
                        './js/widgetizer.js:widgetizer',
                        './js/i18n.js:i18n',
                        './js/pageinfo.js:pageinfo',
                        './js/dialogs.js:dialogs',
                        './js/mygamepad.js:mygamepad',
                        './js/BasePage.js:BasePage',
                        './js/Logger.js:Logger',
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
            pg_uservideos: {
                src: ['./pages/uservideos/main.js'],
                dest: 'public/js/pages/uservideos.js',
                options: {
                    alias: ['./pages/uservideos/main.js:pagescript'],
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
            pg_searchvideos: {
                src: ['./pages/searchvideos/main.js'],
                dest: 'public/js/pages/searchvideos.js',
                options: {
                    alias: ['./pages/searchvideos/main.js:pagescript'],
                    transform: ['brfs']
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            appjsdev: {
                src: [
                    "js/vendor/underscore.js",
                    "js/vendor/jquery-2.1.0.js",
                    "js/vendor/jquery.history.js",
                    "js/vendor/jquery.svg.js",
                    "js/vendor/jquery.svgdom.js",
                    "js/vendor/jquery.zoomooz.js",
                    "js/vendor/jquery.ba-resize.js",
                    "js/vendor/d3.v3.js",
                    "js/vendor/svgjs/svg.js",
                    "js/vendor/svgjs/svg.easing.js",
                    "js/vendor/svgjs/svg.filter.js",
                    "js/vendor/soundmanager2.js",
                    "js/vendor/jquery.playable.js",
                    "js/vendor/jquery.youtubedrop.js",
                    "js/vendor/jquery.tmpl.js",
                    "js/vendor/jquery.event.drag-2.2.js",
                    "js/vendor/gamepad.js",
                    "js/vendor/mustache.js",
                    "js/vendor/alpaca.min.js",
                    "js/vendor/moment-with-langs.min.js",
                    "js/vendor/raphael-min.js",
                    "js/vendor/raphaelicious-1.0.js",
                    "js/vendor/yetii.js"
                ],
                dest: 'public/js/core.libs.js'
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
                    "js/vendor/jquery.tmpl.js",
                    "js/vendor/jquery.event.drag-2.2.js",
                    //"js/vendor/jquery.event.drop-2.2.js",
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
                dest: 'public/js/core.libs.min.js'
            },
            adminjs: {
                src: [
                    "tools/craft/js/jquery.ajaxfileupload.js",
                    "tools/craft/js/jquery.imagedrop.js",
                    "tools/craft/js/jquery.dropanything.js",
                    "tools/craft/js/UuidField.js",
                    "tools/craft/js/YouTubeField.js",
                    "tools/craft/js/pickeyboard.js"
                ],
                dest: 'public/js/admin.libs.js'
            },
            appcss: {
                src: [
                    "public/css/normalize.css",
                    "js/vendor/alpaca.min.css"
                ],
                dest: 'public/css/core.libs.css'
            },
            admincss: {
                src: [],
                dest: 'public/css/admin.libs.css'
            }
        },
        less: {
            development: {
                options: {
                    paths: ["./css"]
                },
                files: {
                    "public/css/core.bundle.css": [
                        "public/css/core.libs.css",
                        "less/style.less",
                        "less/game.less"
                    ],
                    "public/css/admin.bundle.css": [
                        "public/css/admin.libs.css",
                        "less/admin.less"
                    ]
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
                    // TODO how to get this filename by appending version number from package.json?
                    archive: 'dist/wow-0.9.2.zip'
                },
                files: [{
                    src: [
                        'addons/dist/**',
                        '!addons/dist/scrapbooks/**',
                        'bin/win32/node.exe',
                        'bin/win64/node.exe',
                        'entity/**',
                        'js/**',
                        'lib/**',
                        'locales/**',
                        'pages/**',
                        'public/**',
                        'plugins/**',
                        '!plugins/**/node_modules/**',
                        'tools/**',
                        '!tools/craft/**',
                        '!tools/tibor/**',
                        'routes/**',
                        'templates/**',
                        'views/**'
                    ]
                }, {
                    src: [
                        'run.bat',
                        'run7.bat',
                        'run.js',
                        'server.js',
                        'package.json',
                        'main.js',
                        'wow.js'
                    ]
                }, {
                    src: [
                        'node_modules/**',
                        '!node_modules/browserify/**',
                        '!node_modules/browserify-shim/**',
                        '!node_modules/grunt/**',
                        '!node_modules/brfs/**',
                        '!node_modules/grunt-browserify/**',
                        '!node_modules/grunt-contrib-compress/**',
                        '!node_modules/grunt-contrib-less/**',
                        '!node_modules/grunt-execute/**',
                        '!node_modules/grunt-contrib-clean/**',
                        '!node_modules/grunt-contrib-concat/**',
                        '!node_modules/grunt-contrib-copy/**',
                        '!node_modules/grunt-execute/**',
                        '!node_modules/grunt-docker/**',
                        '!node_modules/grunt-generate/**',
                        '!node_modules/grunt-jsbeautifier/**',
                        '!node_modules/grunt-downloadfile/**'
                    ]
                }]
            }
        },
        jsbeautifier: {
            files: [
                "js/**/*.js",
                "pages/**/*.js",
                "plugins/src/**/*.js",
                "plugins/scripts/**/*.js",
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
                url: 'http://nodejs.org/dist/v0.10.28/node.exe',
                dest: 'bin/win32'
            }, {
                url: 'http://nodejs.org/dist/v0.10.28/x64/node.exe',
                dest: 'bin/win64'
            }]
        },
    })
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
