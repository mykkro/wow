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
        },
        jsonlint: {
          sample: {
            src: [ 'craft.json' ]
          }
        },
        copy: {
          main: {
            files: [
              {expand: true, cwd: 'files', src: 'Storage.js', dest: 'output/lib'},
              {expand: true, cwd: 'files', src: 'YouTubeUtil.js', dest: 'output/lib'},
              {expand: true, cwd: 'files', src: 'NodeDAO.js', dest: 'output/lib/dao'},
              {expand: true, cwd: 'files', src: 'NodeAPI.js', dest: 'output/lib/api'},
              {expand: true, cwd: 'files', src: 'IndexedNodeAPI.js', dest: 'output/lib/api'},
              {expand: true, cwd: 'files', src: 'assets/**', dest: 'output/public'},
              {expand: true, cwd: 'templates', src: 'preview.html', dest: 'output/templates/nodes'}
            ]
          }
        }                
    })
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['browserify', 'jsonlint', 'copy']);
}
