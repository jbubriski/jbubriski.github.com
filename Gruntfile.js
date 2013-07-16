module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        options: {
          paths: ["assets/themes/the-minimum/css"]
        },
        files: {
          "assets/themes/the-minimum/css/style.css": "assets/themes/the-minimum/css/style.less"
        }
      }
      //,
      // production: {
      //   options: {
      //     paths: ["assets/themes/the-minimum/css"],
      //     yuicompress: true
      //   },
      //   files: {
      //     "assets/themes/the-minimum/css/style.css": "assets/themes/the-minimum/css/style.less"
      //   }
      // }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['less']);
};