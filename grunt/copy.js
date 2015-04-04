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
        cwd: 'vendor/bower/normalize-scss',
        src: '*.scss',
        dest: 'sass/vendor/'
      }
    ]
  }
};
