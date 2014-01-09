module.exports = function (grunt) {
grunt.initConfig({
  nodewebkit: {
    options: {
        build_dir: '../webkitbuilds', // Where the build version of my node-webkit app is saved
        mac: false, 
        win: true, // We want to build it for win
        linux32: false, // We don't need linux32
        linux64: false, // We don't need linux64
		version: '0.8.4'
    },
    src: ['./**/*'] // Your node-wekit app
  },
})
	grunt.loadNpmTasks('grunt-node-webkit-builder');
}
