module.exports = {
  css: {
    files: [
      {
        expand: true,
        cwd: 'vendor/bower/bourbon/app/assets/stylesheets',
        src: '**',
        dest: 'sass/vendor/bourbon/'
      },
      {
        expand: true,
        cwd: 'vendor/bower/rainbow/themes/',
        src: '**',
        dest: 'asset/vendor/rainbow/theme/'
      },
      {
        expand: true,
        cwd: 'vendor/bower/normalize-scss',
        src: '*.scss',
        dest: 'sass/vendor/'
      }
    ]
  },
  js: {
    files: [
      {
        expand: true,
        cwd: 'vendor/bower/rainbow/js/',
        src: 'rainbow.min.js',
        dest: 'asset/vendor/'
      },
      {
        expand: true,
        cwd: 'vendor/bower/rainbow/js/language/',
        src: '**',
        dest: 'asset/vendor/rainbow/language/'
      },
    ]
  }
};
