module.exports = {
  plugins: [
    require('postcss-import'),
    require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true
        },
        normalizeWhitespace: process.env.NODE_ENV === 'production'
      }]
    })
  ]
};
