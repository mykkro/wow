module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            demo: {
                bundleOptions: {
                    debug: true
                },
                src: 'js/src/main.js',
                dest: 'js/output.js'
            }
        }
    })
    grunt.loadNpmTasks('grunt-browserify');
}
