module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            basic: {
                src: [
                    '../../js/util/JsonUtils.js',
                ],
                dest: 'output/public/js/craft.bundle.js',
                options: {
                    alias: [
                        '../../js/util/JsonUtils.js:JsonUtils'
                    ],
                    transform: ['brfs']
                }            
            }
        }
    })
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['browserify']);
}
