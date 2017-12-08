const fs = require('fs-extra')
const path = require('path')

const dereferenceDir = (dir) => {
  return new Promise((resolve, reject) => {
    if (!dir) {
      return reject(new Error('Please specify a directory'))
    }

    const backup = `${dir}.backup`
    const dotDirs = []

    fs.copy(dir, backup, {
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
        dotDirs.map(dotDir => fs.copy(dotDir, dotDir.replace(dir, backup)))
      ))
      .then(() => fs.remove(dir))
      .then(() => fs.move(backup, dir))
      .then(resolve)
      .catch(reject)
  })
}

module.exports = dereferenceDir
