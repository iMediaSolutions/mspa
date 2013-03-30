'use strict';

module.exports = function(grunt) {

  //Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
          'Gruntfile.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    coffee: {
        options: {
            bare: true
        },

        index: {
            files: {
                'app/js/controllers/index.js' : [
                    'coffeescript/controllers/*.coffee'
                ]
            }
        },

        rubyHaml: {
            glob_to_multiple: {
                expand: true,
                cwd: 'haml/',
                src: ['*.haml'],
                dest: 'app/',
                ext: '.html'
            }
        },
        glob_to_multiple: {
            expand: true,
            cwd: 'coffee/',
            src: ['*.coffee','controllers/*.coffee','models/*.coffee','views/*.coffee'],
            dest: 'app/js/',
            ext: '.js'
        }
    },

    sass: {
        glob_to_multiple: {
            expand: true,
            cwd: 'sass/',
            src: ['*.scss'],
            dest: 'app/css/',
            ext: '.css'
        }
    },

    rubyHaml: {

        glob_to_multiple: {
            expand: true,
            cwd: 'haml/',
            src: ['*.haml'],
            dest: 'app/templates',
            ext: '.html',
        },
        options: {
            templatize: false
        }

    },

    nodeunit: {
        tests: ['app/js/controllers/*.js']
    },

    //Watch
    watch: {
      coffeesrc: {
          files: ['coffee/**/*.coffee'],
          tasks: ['coffee','rubyHaml']
      },
      haml: {
          files: ['haml/**/*.haml'],
          tasks: ['rubyHaml']
      },
      sass: {
          files: ['sass/**/*.scss'],
          tasks: ['sass']
      }
    }
  });

  grunt.loadTasks('grunt-tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-internal');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-ruby-haml');

  grunt.registerTask('test', [
    'coffee',
    'sass',
    'jshint',
    'rubyHaml'
  ]);
  grunt.registerTask('default', ['test']);

};

