const electron = require('electron');
const { app, BrowserWindow, Tray } = electron;
const path = require('path');

let mainWindow;
let tray;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        height: 500,
        width: 300,
        frame: false,
        resizable: false,
        show: false,
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`)

    const iconName = process.platform === "darwin" ? 'iconTemplate.png' : 'windows-icon.png' ;
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    tray = new Tray(iconPath);
    tray.on('click', (event, bounds) => {
        const { x, y } = bounds;
        const { height, width } = mainWindow.getBounds();
        if(mainWindow.isVisible()){
            mainWindow.hide();
        }else{
            mainWindow.setBounds({
                x: x - width/2,
                y: y,
                height: height,
                width: width,
            })
            mainWindow.show();
        }
    })
});