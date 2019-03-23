'use strict'
var test = require('tape')
var iosIcons = require('./')
var exec = require('child_process').exec

test('returns all icons in array', function (t) {
  t.plan(2)
  var icons = iosIcons()
  t.ok(Array.isArray(icons), 'returned an array')
  t.equal(icons.length, icons.length, icons.length + ' icons returned')
})

test('returns icon for size 60 as Number', function (t) {
  t.plan(2)
  var icon = iosIcons({ size: 60 })
  t.ok(icon.name === 'icon-60.png', 'icon name correct')
  t.ok(icon.width === 60, 'icon width correct')
})

test('returns icon for size 60 as String', function (t) {
  t.plan(2)
  var icon = iosIcons({ size: '60' })
  t.ok(icon.name === 'icon-60.png', 'icon name correct')
  t.ok(icon.width === 60, 'icon width correct')
})

test('returns icon for size 120', function (t) {
  t.plan(2)
  var icon = iosIcons({ size: 120 })
  t.ok(icon.name === 'icon-60@2x.png', 'icon name correct')
  t.ok(icon.width === 120, 'icon width correct')
})

test('returns icon for size 83.5', function (t) {
  t.plan(2)
  var icon = iosIcons({ size: 167 })
  t.ok(icon.name === 'icon-83.5@2x.png', 'icon name correct')
  t.ok(icon.width === 167, 'icon width correct')
})

test('returns icon for size 60@2x', function (t) {
  t.plan(2)
  var icon = iosIcons({ size: '60@2x' })
  t.ok(icon.name === 'icon-60@2x.png', 'icon name correct')
  t.ok(icon.width === 120, 'icon width correct')
})

test('returns icon for size 60@3x', function (t) {
  t.plan(2)
  var icon = iosIcons({ size: '60@3x' })
  t.ok(icon.name === 'icon-60@3x.png', 'icon name correct')
  t.ok(icon.width === 180, 'icon width correct')
})

test('returns icon for empty string with width 57', function (t) {
  t.plan(2)
  var icon = iosIcons({ size: '' })
  t.ok(icon.name === 'icon.png', 'icon name correct')
  t.ok(icon.width === 57, 'icon width correct')
})

test('returns icon for size 57 as Number', function (t) {
  t.plan(2)
  var icon = iosIcons({ size: 57 })
  t.ok(icon.name === 'icon.png', 'icon name correct')
  t.ok(icon.width === 57, 'icon width correct')
})

test('returns icon for size 57 as String', function (t) {
  t.plan(2)
  var icon = iosIcons({ size: '57' })
  t.ok(icon.name === 'icon.png', 'icon name correct')
  t.ok(icon.width === 57, 'icon width correct')
})

test('returns icon for @2x', function (t) {
  t.plan(2)
  var icon = iosIcons({ size: '@2x' })
  t.ok(icon.name === 'icon@2x.png', 'icon name correct')
  t.ok(icon.width === 114, 'icon width correct')
})

test('returns icon for size 114 as Number', function (t) {
  t.plan(2)
  var icon = iosIcons({ size: 114 })
  t.ok(icon.name === 'icon@2x.png', 'icon name correct')
  t.ok(icon.width === 114, 'icon width correct')
})

test('returns icon for size 114 as String', function (t) {
  t.plan(2)
  var icon = iosIcons({ size: '114' })
  t.ok(icon.name === 'icon@2x.png', 'icon name correct')
  t.ok(icon.width === 114, 'icon width correct')
})

test('returns null for size 123', function (t) {
  t.plan(1)
  var icon = iosIcons({ size: 123 })
  t.ok(icon === null)
})

test('returns icon for size 29 as small', function (t) {
  t.plan(2)
  var icon = iosIcons({ size: 29 })
  t.ok(icon.name === 'icon-small.png', 'icon name correct')
  t.ok(icon.width === 29, 'icon width correct')
})

test('returns icon for size 58 as small@2x', function (t) {
  t.plan(2)
  var icon = iosIcons({ size: 58 })
  t.ok(icon.name === 'icon-small@2x.png', 'icon name correct')
  t.ok(icon.width === 58, 'icon width correct')
})

test('returns icon for file name icon-small@2x.png', function (t) {
  t.plan(2)
  var icon = iosIcons({ size: 'icon-small@2x.png' })
  t.ok(icon.name === 'icon-small@2x.png', 'icon name correct')
  t.ok(icon.width === 58, 'icon width correct')
})

test('returns icon for file name icon-small@3x.png', function (t) {
  t.plan(2)
  var icon = iosIcons({ size: 'icon-small@3x.png' })
  t.ok(icon.name === 'icon-small@3x.png', 'icon name correct')
  t.ok(icon.width === 87, 'icon width correct')
})

test('returns icon for file name icon.png', function (t) {
  t.plan(2)
  var icon = iosIcons({ size: 'icon.png' })
  t.ok(icon.name === 'icon.png', 'icon name correct')
  t.ok(icon.width === 57, 'icon width correct')
})

test('cli returns all images as csv', function (t) {
  t.plan(1)
  var expected = [
    'icon-60@3x.png,180',
    'icon-60.png,60',
    'icon-60@2x.png,120',
    'icon-76.png,76',
    'icon-76@2x.png,152',
    'icon-83.5@2x.png,167',
    'icon-40.png,40',
    'icon-40@2x.png,80',
    'icon-40@3x.png,120',
    'icon.png,57',
    'icon@2x.png,114',
    'icon-72.png,72',
    'icon-72@2x.png,144',
    'icon-small.png,29',
    'icon-small@2x.png,58',
    'icon-small@3x.png,87',
    'icon-50.png,50',
    'icon-50@2x.png,100',
    'icon-1024.png,1024\n'
  ].join('\n')
  exec('./bin/ios-icons.js', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned expected output')
  })
})

test('cli returns image with specified size as csv', function (t) {
  t.plan(1)
  var expected = 'icon-60@3x.png,180\n'
  exec('./bin/ios-icons.js --size 180', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned expected output')
  })
})

test('cli returns image with specified size as csv with abbreviated flags', function (t) {
  t.plan(3)
  var expected = 'icon-60@3x.png,180\n'
  exec('./bin/ios-icons.js --siz 180', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned expected output')
  })
  exec('./bin/ios-icons.js --si 180', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned expected output')
  })
  exec('./bin/ios-icons.js --s 180', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned expected output')
  })
})

test('cli returns correct image for size "60@3x" as json', function (t) {
  t.plan(1)
  var expected = '{"name":"icon-60@3x.png","width":180}\n'
  exec('./bin/ios-icons.js --size 60@3x --format json', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned expected output')
  })
})

test('cli returns correct image for size "60@3x" as json w/ abbreviated flags', function (t) {
  t.plan(2)
  var expected = '{"name":"icon-60@3x.png","width":180}\n'
  exec('./bin/ios-icons.js --size 60@3x --forma json', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned expected output')
  })
  exec('./bin/ios-icons.js --size 60@3x --f json', function (error, stdout, stderr) {
    var err = error || stderr
    if (err) {
      return t.fail('calling cli produced an error: ' + err)
    }
    t.equal(stdout, expected, 'cli returned expected output')
  })
})
