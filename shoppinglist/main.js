const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;


// Listen for the app to be ready
app.on('ready', function() {
    // Create New Window
    mainWindow = new BrowserWindow({});
    // Load HTML file
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Quit app when closed
    mainWindow.on('closed', function() {
        app.quit();
    });
    
    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert Menu
    Menu.setApplicationMenu(mainMenu);
});

// Handle createAddWindow
function createAddWindow() {
    // Create New Window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Shooping List Item'
    });
    // Load HTML file
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Garbage Collection Handle
    addWindow.on('close', function() {
        addWindow = NULL;
    });
}

// Create Menu template
const mainMenuTemplate = [
    {
        label: 'File', 
        submenu: [
            {
                label: 'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : // add shortcuts
                'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

// If Mac, add empty object to menu
if(process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

// add dev tools items if not in production
if(process.env.NODE_ENV != 'production') {
    mainMenuTemplate.push({
        label: 'Dev Tools',
        submenu:[
            {
                label: 'Toggle Dev Tools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}