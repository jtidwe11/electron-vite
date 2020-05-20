const { app } = require('electron')
const path = require('path')
const fs = require('fs')

class Store {
  constructor (defaults) {
    const userDataPath = app.getPath('userData')
    this.path = path.join(userDataPath, 'Settings')
    try {
      this.data = JSON.parse(fs.readFileSync(this.path))
    } catch (err) {
      this.data = defaults
    }
  }

  get (keyPath) {
    return keyPath.split('.').reduce((obj, key) => {
      return obj && obj[key]
    }, this.data)
  }

  set (keyPath, val) {
    let obj = this.data

    const keys = keyPath.split('.')
    while (keys.length > 1) {
      const key = keys.shift()
      obj = obj[key] = obj[key] || {}
    }
    obj[keys.shift()] = val

    if (!keyPath.startsWith('state')) {
      const jsonData = (({ state, ...o }) => o)(this.data)
      fs.writeFileSync(this.path, JSON.stringify(jsonData))
    }

    return this.data.state
  }
}

module.exports = Store
