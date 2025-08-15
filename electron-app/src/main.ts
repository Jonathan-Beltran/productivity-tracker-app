
console.log("Electron main process starting");
import  { createDatabase } from '../../backend/dist/database';
import { ipcMain } from 'electron'
import { getGoals } from '../../backend/src/database/index'
import { spawn, ChildProcess } from 'child_process'
import * as path from 'path'
import * as fs from 'fs'
const { app, BrowserWindow } = require('electron');

let screenshotProcess: ChildProcess | null = null;

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
    return win;
}

function startScreenshotService(){
    console.log("Starting screenshot service");
    const screenshotServicePath = path.join(__dirname, '../../../screenshot-service');
    const pythonScript = path.join(screenshotServicePath, 'capture_screenshot.py');
    const venvPython = path.join(screenshotServicePath, 'venv', 'bin', 'python');

    if (!fs.existsSync(venvPython)){
        console.error('Virtual environment not found');
        return;
    }
    screenshotProcess = spawn(venvPython, [pythonScript], {
        cwd: screenshotServicePath,
        stdio: ['ignore', 'pipe', 'pipe']
    });

    screenshotProcess.stdout?.on('data', (data) => {
        console.log(`Screenshot service: ${data.toString().trim()}`);
    });

    screenshotProcess.stderr?.on('data', (data) => {
        console.error(`Screenshot service error: ${data.toString().trim()}`);
    });
    screenshotProcess.on('close', (code) => {
        console.log(`Screenshot service exited with code ${code}`);
        screenshotProcess = null;
    });

    screenshotProcess.on('error', (error) => {
        console.error('Failed to start screenshot service', error);
    });
}

function stopScreenshotService(){
    if(screenshotProcess){
        console.log("Stopping screenshot service");
        screenshotProcess.kill('SIGTERM');
        screenshotProcess = null;
    }
}

app.on('ready', () => {
    createDatabase();
    createWindow();
    startScreenshotService();
    console.log("App is ready");
});

app.on('window-all-closed', () => {
    stopScreenshotService();
    app.quit();
});
app.on('activate',() =>{
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow();
    }
});
app.on('before-quit', () => {
    stopScreenshotService();
});

ipcMain.handle('get-data', async() => {
    const data = await getGoals()
    return data
})

ipcMain.handle('screenshot-service-status', () => {
    return {
        running: screenshotProcess !== null,
        pid: screenshotProcess?.pid || null
    };
});
