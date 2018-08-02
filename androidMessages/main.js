const electron = require('electron');
const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700
    });

    mainWindow.setTitle('Android Messages');
    mainWindow.loadURL('https://messages.android.com/');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});