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
    },
    cssjoin: {
      join :{
        files: {
          'assets/themes/the-minimum/css/all.css': ['assets/themes/the-minimum/css/style.css']
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        src: ['assets/themes/the-minimum/css/all.css'],
        ext: '.min.css'
      }
    },
    // uglify: {
    //   options: {
    //     // the banner is inserted at the top of the output
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
    //   },
    //   dist: {
    //     files: {
    //       'assets/themes/the-minimum/css/all.min.css': ['assets/themes/the-minimum/css/all.css']
    //     }
    //   }
    // }
  });
  
  // Tasks
  grunt.loadNpmTasks('grunt-contrib-watch');

  // JS tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  // CSS tasks
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-cssjoin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['less', 'cssjoin', 'cssmin']);
};