const dedupeDependencies = require('./lib/dedupe-dependencies')
const dereferenceSymlinks = require('./lib/dereference-symlinks')
const linkBinScripts = require('./lib/link-bin-scripts')

const debootstrap = (options) => {
  return dereferenceSymlinks(options)
    .then(() => dereferenceSymlinks(options))
    .then(() => linkBinScripts(options))
}

module.exports = debootstrap
