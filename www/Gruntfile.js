module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
         dist: {
            options: {
               transform: [
                  ["babelify", {presets: ["es2015"]}]
               ]
            },
            files: {
               // if the source file has an extension of es6 then
               // we change the name of the source file accordingly.
               // The result file's extension is always .js
               './js/index.js': ['./client/main.js']
            }
         }
      },
    watch: {
      files: [ "client/**/*.js"],
      tasks: [ 'browserify' ]
    }
  })
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask("default", ["watch"])
  grunt.registerTask("build", ["browserify"])
}