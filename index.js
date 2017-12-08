const dedupeDependencies = require('./dedupe-dependencies')
const dereferenceSymlinks = require('./dereference-symlinks')
const linkBinScripts = require('./link-bin-scripts')

const debootstrap = (options) => {
  return dereferenceSymlinks(options)
    .then(() => dereferenceSymlinks(options))
    .then(() => linkBinScripts(options))
}

module.exports = debootstrap
