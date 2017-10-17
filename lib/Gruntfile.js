module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      js: {
          src: ['../javascripts/main.js'],
          dest: '../dist/app.js'
      }
    },
    sass: {
      dist: {
        files: {
          '../styles/main.css': '../sass/main.scss'
        }
      }
    },
    jshint: {
      options: {
        predef: [ "document", "console", "$" ],
        esnext: true,
        globalstrict: true,
        globals: {},
        browserify: true
      },
      files: ['../javascripts/**/*.js']
    },
    watch: {
      options: {
        livereload: true,
      },
      sass: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      },
      javascripts: {
        files: ['../javascripts/**/*.js'],
        tasks: ['jshint', 'browserify']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'browserify', 'sass', 'watch']);
};