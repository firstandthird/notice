module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.initConfig({
    info: '<json:package.json>',
    meta: {
      banner: '/*!\n'+
              ' * <%= info.name %> - <%= info.description %>\n'+
              ' * v<%= info.version %>\n'+
              ' * <%= info.url %>\n'+
              ' * copyright <%= info.company %> <%= grunt.template.today("yyyy") %>\n'+
              ' * <%= info.license %> License\n'+
              '*/'
    },
    lint: {
      all: 'lib/notice.js'
    },
    stylus: {
      flatten: {
        files: {
          'dist/*.css': 'lib/*.styl'
        }
      },
      compress: {
        options: {
          compress: true
        },
        files: {
          'dist/notice.min.css': 'lib/*.styl'
        }
      }
    },
    concat: {
      dist: {
        src: ['<banner>', 'lib/notice.js'],
        dest: 'dist/notice.js'
      },
      css: {
        src: ['<banner>', 'dist/notice.css'],
        dest: 'dist/notice.css'
      },
      cssmin: {
        src: ['<banner>', 'dist/notice.min.css'],
        dest: 'dist/notice.min.css'
      }
    },
    min: {
      dist: {
        src: ['<banner>', 'dist/notice.js'],
        dest: 'dist/notice.min.js'
      }
    },
    watch: {
      css: {
        files: 'lib/notice.styl',
        tasks: 'stylus'
      },
      js: {
        files: 'lib/notice.js',
        tasks: 'concat min' 
      }
    },
    server:{
      port: 8000,
      base: '.'
    }
  });
  grunt.registerTask('default', 'lint stylus concat min');
  grunt.registerTask('dev', 'server watch');
}
