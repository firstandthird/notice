module.exports = function(grunt) {
  grunt.initConfig({
    info: grunt.file.readJSON('bower.json'),
    meta: {
      banner: '/*!\n'+
              ' * <%= info.name %> - <%= info.description %>\n'+
              ' * v<%= info.version %>\n'+
              ' * <%= info.homepage %>\n'+
              ' * copyright <%= info.copyright %> <%= grunt.template.today("yyyy") %>\n'+
              ' * <%= info.license %> License\n'+
              '*/\n'
    },
    jshint: {
      main: [
        'Gruntfile.js',
        'bower.json',
        'lib/**/*.js',
        'test/*.js'
      ]
    },
    bower: {
      main: {
        dest: 'dist/_bower.js',
        exclude: [
          'assert',
          'jquery'
        ]
      }
    },
    stylus: {
      flatten: {
        files: {
          'dist/notice.css': 'lib/*.styl'
        }
      }
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      css: {
        src: ['<banner>', 'dist/notice.css'],
        dest: 'dist/notice.css'
      },
      dist: {
        src: 'lib/notice.js',
        dest: 'dist/notice.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: 'dist/notice.js',
        dest: 'dist/notice.min.js'
      }
    },
    clean: {
      bower: [
        'dist/_bower.js'
      ],
      dist: [
        'dist'
      ]
    },
    watch: {
      scripts: {
        files: '<%= jshint.main %>',
        tasks: 'scripts',
        options: {
          livereload: true
        }
      },
      example: {
        files: [
          'example/*'
        ],
        options: {
          livereload: true
        }
      },
      grunt: {
        files: [
          'Gruntfile.js',
          'test/index.html'
        ],
        tasks: 'default'
      }
    },
    mocha: {
      all: {
        src: 'test/index.html',
        options: {
          run: true,
          growl: true
        }
      }
    },
    plato: {
      main: {
        files: {
          'reports': ['lib/*.js']
        }
      }
    },
    connect: {
      server:{
        options: {
          hostname: '*'
        }
      },
      plato: {
        port: 8000,
        base: 'reports',
        options: {
          keepalive: true
        }
      }
    },
    bytesize: {
      scripts: {
        src: [
          'dist/*'
        ]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-concat-bower');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-bytesize');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-plato');
  grunt.registerTask('scripts', ['jshint', 'bower', 'concat', 'uglify', 'clean:bower', 'bytesize']);
  grunt.registerTask('styles', ['stylus', 'concat:css']);
  grunt.registerTask('default', ['styles', 'scripts']);
  grunt.registerTask('dev', ['default', 'connect:server', 'watch']);
  grunt.registerTask('reports', ['plato', 'connect:plato']);
};
