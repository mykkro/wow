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
        }
      }
    })

    grunt.loadNpmTasks('grunt-zip');
}
