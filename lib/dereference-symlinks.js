const fs = require('fs-extra')
const path = require('path')

const dereferenceDir = (options) => {
  return new Promise((resolve, reject) => {
    if (!options.path) {
      return reject(new Error('Please specify a directory'))
    }

    const backup = `${options.path}.backup`
    const dotDirs = []

    fs.copy(options.path, backup, {
      dereference: true,
      filter: (filePath) => {
        if (path.basename(filePath).substring(0, 1) === '.') {
          dotDirs.push(filePath)
          return false
        }

        return true
      }
    })
      .then(() => Promise.all(
        dotDirs
          .map(dotDir => fs.copy(dotDir, dotDir.replace(options.path, backup)))
      ))
      .then(() => fs.remove(options.path))
      .then(() => fs.move(backup, options.path))
      .then(resolve)
      .catch(reject)
  })
}

module.exports = dereferenceDir
