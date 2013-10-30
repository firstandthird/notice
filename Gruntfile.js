module.exports = function(grunt) {

  require('load-grunt-config')(grunt, {
    config: {
      info: grunt.file.readJSON('bower.json'),
      name: 'notice'
    }
  });

  grunt.registerTask('script-dist', ['concat:dist', 'uglify:dist']);
  grunt.registerTask('script-full', ['concat:full', 'uglify:full']);
  grunt.registerTask('scripts', ['jshint', 'bower', 'script-dist', 'clean:bower', /*'mocha'*/, 'bytesize', 'notify:generic']);
  grunt.registerTask('default', ['scripts']);
  grunt.registerTask('dev', ['default', 'connect:server', 'notify:watch', 'watch']);
};
