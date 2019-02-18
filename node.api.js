// node.api.js

export default pluginOptions => ({
  webpack: config => {
    config.resolve.extensions.push('.ts', '.tsx')

    // hooks dont work with uglifyjs https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/374
    if (config.optimization.minimizer) config.optimization.minimizer.shift()
    // console.log('----------------------------------------------')

    return config
  },
})
