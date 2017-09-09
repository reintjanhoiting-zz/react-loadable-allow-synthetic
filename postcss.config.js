module.exports = ({ file, options, env }) => ({
    parser: false,
    plugins: {
      'autoprefixer': true,
      'cssnano': true
    }
  })