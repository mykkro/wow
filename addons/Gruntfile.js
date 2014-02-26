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
      }
    })

    grunt.loadNpmTasks('grunt-zip');
}
