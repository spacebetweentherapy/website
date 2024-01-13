const path = require('path')
 
module.exports = {
  output: 'export',
  distDir: 'dist',

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}