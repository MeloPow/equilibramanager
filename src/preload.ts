// === preload.ts ===
import { contextBridge, ipcRenderer } from 'electron';
import { Paciente } from './types/Paciente';

contextBridge.exposeInMainWorld('api', {
  criarPaciente: (paciente: Paciente) =>
    ipcRenderer.invoke('criarPaciente', paciente),
  listarPacientes: (): Promise<Paciente[]> =>
    ipcRenderer.invoke('listarPacientes'),
  buscarPacientePorId: (id: number) =>
    ipcRenderer.invoke('buscarPacientePorId', id),
  atualizarPaciente: (paciente: Paciente) =>
    ipcRenderer.invoke('atualizarPaciente', paciente),
  deletarPaciente: (id: number) => ipcRenderer.invoke('deletarPaciente', id),
});
