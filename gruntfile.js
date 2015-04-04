module.exports = function(grunt) {

  // load tasks
  require('load-grunt-tasks')(grunt);

  // measures the time each task takes
  require('time-grunt')(grunt);

  // load grunt config
  require('load-grunt-config')(grunt);
};
