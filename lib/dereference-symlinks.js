const fs = require('fs-extra')
const path = require('path')

const dereferenceDir = (options) => {
  return new Promise((resolve, reject) => {
    if (!options.path) {
      return reject(new Error('Please specify a directory'))
    }

    const modules = path.join(options.path, 'node_modules')
    const backup = `${modules}.backup`
    const dotDirs = []

    fs.copy(modules, backup, {
      dereference: true,
      filter: (filePath) => {
        if (path.basename(filePath).startsWith('.')) {
          console.info('storing', filePath)
          dotDirs.push(filePath)
          return false
        }

        return true
      }
    })
      .then(() => Promise.all(
        dotDirs
          .map(dotDir => {
            console.info('copying', dotDir, 'to', dotDir.replace(modules, backup))

            return fs.copy(dotDir, dotDir.replace(modules, backup))
          })
      ))
      .then(() => fs.remove(modules))
      .then(() => fs.move(backup, modules))
      .then(resolve)
      .catch(reject)
  })
}

module.exports = dereferenceDir
