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
                    "public/style.bundle.css": [
                        "src/style.less"
                    ]
                }
            }
        },
        concat: {
            options: {
              separator: ';',
            },
            dist: {
              src: [
                'public/main.browserified.js', 
                'vendor/audiosynth.js',
                'vendor/audiosynth.view.js'
              ],
              dest: 'public/main.bundle.js',
            }
          }
    })
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    grunt.registerTask('default', ['browserify', 'less', 'concat']);
}
