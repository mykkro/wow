module.exports = function (grunt) {
    grunt.initConfig({
      compress: {
          pexeso: {
              options: {
                  archive: './dist/pexeso.zip',
                  mode: 'zip'
              },
              files: [
                  { expand: true, cwd: 'games/pexeso', src: ['**'] }
              ]
          },
          fifteen: {
              options: {
                  archive: './dist/fifteen.zip',
                  mode: 'zip'
              },
              files: [
                  { expand: true, cwd: 'games/fifteen', src: ['**'] }
              ]
          },
          samplebook: {
              options: {
                  archive: './dist/samplebook.zip',
                  mode: 'zip'
              },
              files: [
                  { expand: true, cwd: 'books/samplebook', src: ['**'] }
              ]
          }
      }
    })

    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-generate');
}
