const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('$store', {
  get: (key) => {
    return ipcRenderer.sendSync('state', key)
  },
  set: (key, payload) => {
    return ipcRenderer.sendSync('state', key, payload)
  }
})
