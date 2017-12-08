# debootstrap

Like `lerna bootstrap` but in reverse.

## Why?

When creating docker images and electron apps it's not useful to have some modules hoisted and others as symlinks.  This module dereferences symlinks, removes duplicates, flattens the dependency tree and re-recreates .bin folder links.

## How?

```
$ debootstrap
```
