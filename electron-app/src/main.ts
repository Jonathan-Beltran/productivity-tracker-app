
console.log("Electron main process starting");
import  { createDatabase } from '../../backend/dist/database';
import { ipcMain } from 'electron'
import { getGoals } from '../../backend/src/database/index'
const { app, BrowserWindow } = require('electron');
/*debugging stuff */
/*end debugging stuff */

function createWindow(){
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL('http://localhost:3000');
    win.webContents.once('did-finish-load', () => {
        win.webContents.openDevTools();
    });
}
app.on('ready', () => {
    createDatabase();
    createWindow();
    console.log("App is ready");
});
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});
app.on('activate',() =>{
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow();
    }
});

ipcMain.handle('get-data', async() => {
    const data = await getGoals()
    return data
})