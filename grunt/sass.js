module.exports = {
  front: {
    files: [{
      expand: true,
      cwd: 'sass/',
      src: ['*.scss'],
      dest: 'asset/',
      ext: '.css'
    }],
    options: {
      // sourceMap: true,
      // imagePath: 'asset',
      // loadPath: 'sass',
      // sourceComments: 'normal',
      // outputStyle: 'nested'
    }
  }
};
