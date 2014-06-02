module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            index: {
                src: ['./src/main.js'],
                dest: 'public/main.browserified.js',
                options: {
                    alias: ['./src/main.js:pagescript'],
                    transform: ['brfs']
                }
            }
        },
        less: {
            style: {
                options: {
                },
                files: {
                    "public/style.compiled.css": [
                        "src/style.less"
                    ]
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            scrapbookjs: {
                src: [
                    "vendor/jquery.xmlns.js",
                    "vendor/jquery.json-2.4.js",
                    "vendor/jquery.transform2d.js",
                    "vendor/jquery.grab.js",
                    "vendor/jquery.zoomooz.js",
                    "vendor/jquery.fullscreen.js",
                    "vendor/jquery.qtip.js",
                    "vendor/scale.raphael.js",
                    "vendor/turn.js",
                    "vendor/jQuery.tubeplayer.js",
                    "vendor/jquery.cookie.js",
                    "vendor/jquery.transit.js",
                    "vendor/jsrender.js"
                    //'src/js/common.js',
                    //'src/js/jq.js',
                    //'src/js/media.js'
                ],
                dest: 'public/scrapbook.libs.js'
            },
            appjs: {
                src: [
                    "public/scrapbook.libs.js",
                    //"public/mykkro-viewer.js",
                    "public/main.browserified.js"
                ],
                dest: 'public/main.bundle.js'
            },
            appcss: {
                options: { separator: "\n" },
                src: [
                    "public/style.compiled.css",
                    "src/css/styles.css",
                    "src/css/viewer.css"
                ],
                dest: 'public/style.bundle.css'
            }
        }        
    })
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    grunt.registerTask('default', ['browserify', 'less', 'concat']);
}
