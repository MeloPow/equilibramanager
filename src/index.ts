// src/index.ts
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { initializeDatabase } from './db/database';
import {
  criarPaciente,
  listarPacientes,
  buscarPacientePorId,
  atualizarPaciente,
  deletarPaciente,
} from './db/paciente';

// Declarações do Webpack
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
let dbPath: string;

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      nodeIntegration: false,
    },
    icon: path.join(__dirname, 'assets', 'images', 'logo.png'),
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
};

app.whenReady().then(() => {
  dbPath = path.join(app.getPath('userData'), 'equilibra.db');
  initializeDatabase(dbPath);
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Handlers do banco de dados
ipcMain.handle('criarPaciente', async (_event, paciente) => {
  return criarPaciente(paciente);
});

ipcMain.handle('listarPacientes', async () => {
  return listarPacientes();
});

ipcMain.handle('buscarPacientePorId', async (_event, id) =>
  buscarPacientePorId(id)
);
ipcMain.handle('atualizarPaciente', async (_event, paciente) =>
  atualizarPaciente(paciente)
);
ipcMain.handle('deletarPaciente', async (_event, id) => deletarPaciente(id));
