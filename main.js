const { app, BrowserWindow, ipcMain } = require('electron')
const { createServer } = require('vite')
const path = require('path')
const Store = require('./app/store.js')
const PORT = 3000

const store = new Store({
  bounds: { width: 1280, height: 720 },
  maximized: false
})

function createWindow () {
  const { width, height } = store.get('bounds')
  const mainWindow = new BrowserWindow({
    show: false,
    width: width,
    height: height,
    title: 'Electron Vite',
    icon: path.join(__dirname, 'public/logo.png'),
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'app/preload.js')
    }
  })

  require('./app/menu.js')
  mainWindow.loadURL('http://localhost:' + PORT).catch(err => { console.log(err) })
  mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', () => {
    store.get('maximized') ? mainWindow.maximize() : mainWindow.show()
  })

  mainWindow.on('close', () => {
    const { width, height } = mainWindow.getBounds()
    store.set('bounds', { width, height })
    store.set('maximized', mainWindow.isMaximized())
  })

  app.on('second-instance', () => {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  })
}

app.requestSingleInstanceLock()

app.whenReady()
  .then(createServer().listen(PORT))
  .then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (!BrowserWindow.getAllWindows().length) createWindow()
})

ipcMain.on('state', (e, ...args) => {
  const keyPath = ['state', args[0]].filter(Boolean).join('.')
  e.returnValue = args.length === 1
    ? store.get(keyPath)
    : store.set(keyPath, args[1])
})
