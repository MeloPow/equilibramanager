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
import {
  criarConsulta,
  listarConsultasPorPaciente,
  listarTodasConsultas,
  atualizarConsulta,
  deletarConsulta,
} from './db/consulta';

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

// Handlers do banco de dados - Pacientes
ipcMain.handle('criarPaciente', async (_event, paciente) =>
  criarPaciente(paciente)
);
ipcMain.handle('listarPacientes', async () => listarPacientes());
ipcMain.handle('buscarPacientePorId', async (_event, id) =>
  buscarPacientePorId(id)
);
ipcMain.handle('atualizarPaciente', async (_event, paciente) =>
  atualizarPaciente(paciente)
);
ipcMain.handle('deletarPaciente', async (_event, id) => deletarPaciente(id));

// Handlers do banco de dados - Sessões
ipcMain.handle('criarConsulta', async (_event, consulta) =>
  criarConsulta(consulta)
);
ipcMain.handle('listarConsultasPorPaciente', async (_event, pacienteId) =>
  listarConsultasPorPaciente(pacienteId)
);
ipcMain.handle('listarTodasConsultas', () => {
  return listarTodasConsultas();
});
ipcMain.handle('atualizarConsulta', async (_event, consulta) =>
  atualizarConsulta(consulta)
);
ipcMain.handle('deletarConsulta', async (_event, id) => deletarConsulta(id));
