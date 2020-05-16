
const { app, BrowserWindow } = require('electron')
const { createServer } = require('vite')
const path = require('path')
const PORT = 3000

function createWindow () {
  const mainWindow = new BrowserWindow({
    show: false,
    title: 'Electron Vite',
    icon: path.join(__dirname, 'public/logo.png')
  })

  mainWindow.setMenu(null)
  mainWindow.loadURL('http://localhost:' + PORT).catch(err => { console.log(err) })
  mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', () => { mainWindow.show() })

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
