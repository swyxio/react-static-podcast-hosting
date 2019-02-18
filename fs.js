const fs = require('fs')
// const ncp = require('ncp').ncp
// const config = require('../../gatsby-config')

// const BASE_PATH = config.siteMetadata.rootPath
const BASE_PATH = process.cwd()
// // From http://stackoverflow.com/questions/11293857/fastest-way-to-copy-file-in-node-js
// const copyFile = (sourcePath, targetPath) =>
//   new Promise((resolve, reject) => {
//     console.log(`copy ${BASE_PATH + sourcePath} to ${BASE_PATH + targetPath}`)
//     ncp(BASE_PATH + sourcePath, BASE_PATH + targetPath, err => {
//       if (err) {
//         console.log('oops, failed to copy dir')
//         reject()
//       }
//       resolve()
//     })
//   })

// const copyDir = (sourcePath, targetPath) =>
//   new Promise((resolve, reject) => {
//     console.log(`copy ${BASE_PATH + sourcePath} to ${BASE_PATH + targetPath}`)
//     ncp(BASE_PATH + sourcePath, BASE_PATH + targetPath, err => {
//       if (err) {
//         console.log('oops, failed to copy dir')
//         reject()
//       }
//       resolve()
//     })
//   })

const mkDir = path => {
  try {
    fs.mkdirSync(BASE_PATH + path)
  } catch (e) {
    //this is probably fine, it may fail if the file already exists
  }
}

const mkFile = (path, content) => {
  try {
    fs.writeFileSync(BASE_PATH + path, content)
  } catch (e) {
    //this is probably fine, it may fail if the file already exists
    console.log(e)
    console.log(
      `🔥 Failed to write a file to ${BASE_PATH +
        path}, something is probably wrong`,
    )
  }
}

module.exports = {
  // copyFile,
  mkFile,
  mkDir,
  // copyDir,
}
