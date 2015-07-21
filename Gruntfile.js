module.exports = function (grunt) {
  'use strict';

  var config = {
    app: 'app',
    dist: 'dist'
  };

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    config: config,
    chromeManifest: {
      dist: {
        options: {
          buildnumber: true,
          indentSize: 2,
          background: {
            target: 'scripts/background.js'
          }
        },
        src: '<%= config.app %>',
        dest: '<%= config.dist %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      }
    },
    compress: {
      dist: {
        options: {
          archive: function () {
            var manifest = grunt.file.readJSON('app/manifest.json');

            return 'package/Pinboard Pro-' + manifest.version + '.zip';
          }
        },
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['**'],
          dest: ''
        }]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729
      },
      chrome: {
        options: {
          base: [
            '<%= config.app %>'
          ]
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.{webp,gif}',
            '{,*/}*.html',
            'styles/{,*/}*.css',
            'styles/fonts/{,*/}*.*',
            'fonts/{,*/}*.*'
          ]
        }]
      }
    },
    eslint: {
      target: ['<%= config.app %>/scripts/{,*/}*.js']
    },
    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeEmptyElements: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>',
          src: '*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },
    watch: {
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/*.html',
          '<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif}',
          '<%= config.app %>/manifest.json',
          '<%= config.app %>/_locales/{,*/}*.json'
        ]
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: [
        '<%= config.app %>/popup.html',
        '<%= config.app %>/options.html'
      ]
    },
    usemin: {
      options: {
        assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    }
  });

  grunt.registerTask('debug', function () {
    grunt.task.run([
      'connect:chrome',
      'watch'
    ]);
  });

  grunt.registerTask('lint', [
    'eslint'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'chromeManifest:dist',
    'useminPrepare',
    'imagemin',
    'cssmin',
    'concat',
    'uglify',
    'copy',
    'usemin',
    'compress'
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);
};
