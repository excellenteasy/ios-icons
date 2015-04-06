#!/usr/bin/env node
'use strict'
var abbrev = require('abbrev')
var argv = require('yargs')
var icons = require('../')
var pkg = require('../package.json')

// help
argv.help('help')
argv.alias('h', 'help')

// register abbreviated aliases
var abbrevs = abbrev(['size', 'format', 'help', 'version'])
var aliases = Object.keys(abbrevs)
aliases.forEach(function (alias) {
  if (alias !== abbrevs[alias]) {
    argv.alias(alias, abbrevs[alias])
  }
})

// document options
argv.option('size', {
  description: 'number of pixels (width) or string identifiying the icon image'
})
argv.option('format', {
  description: 'format of the output to stdout (csv or json)'
})

// will show up in help
argv.usage('Usage: ios-icons [options]')

argv.example('$ ios-icons --size 180', 'icon-60@3x.png,180')
argv.example('$ ios-icons --size 180 --format json', '{"name":"icon-60@3x.png","width":180}')
argv.example('$ ios-icons --size 60@3x', 'icon-60@3x.png,180')

argv = argv.argv

function formatLog (icons, argv) {
  var format = (argv.format || 'csv').toLowerCase()
  if (format === 'json') {
    return JSON.stringify(icons)
  }
  if (!Array.isArray(icons)) {
    icons = [icons]
  }
  return icons.map(function (icon) {
    return icon.name + ',' + icon.width
  }).join('\n')
}

function cli () {
  if (argv.version) {
    return console.log(pkg.version)
  }

  var options = {
    size: argv.size
  }

  var output = icons(options)
  if (output) console.log(formatLog(output, argv))
}

cli()
