import { contextBridge, ipcRenderer } from 'electron';

// Expose Electron APIs to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    // Screenshot service APIs
    getScreenshotServiceStatus: () => ipcRenderer.invoke('screenshot-service-status'),
    restartScreenshotService: () => ipcRenderer.invoke('restart-screenshot-service'),
    
    // Goal APIs  
    getGoals: () => ipcRenderer.invoke('get-data'),
    
    // Utility
    isElectron: true
});

// Legacy support - expose require for compatibility
(window as any).require = require;
