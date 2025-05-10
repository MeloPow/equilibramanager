// === preload.ts ===
import { contextBridge, ipcRenderer } from 'electron';
import { Paciente } from './types/Paciente';
import { Sessao } from './types/Sessao';

contextBridge.exposeInMainWorld('api', {
  //Paciente
  criarPaciente: (paciente: Paciente) =>
    ipcRenderer.invoke('criarPaciente', paciente),
  listarPacientes: (): Promise<Paciente[]> =>
    ipcRenderer.invoke('listarPacientes'),
  buscarPacientePorId: (id: number) =>
    ipcRenderer.invoke('buscarPacientePorId', id),
  atualizarPaciente: (paciente: Paciente) =>
    ipcRenderer.invoke('atualizarPaciente', paciente),
  deletarPaciente: (id: number) => ipcRenderer.invoke('deletarPaciente', id),

  // Sessão
  criarSessao: (sessao: Sessao) => ipcRenderer.invoke('criarSessao', sessao),
  listarSessoesPorPaciente: (id: number) =>
    ipcRenderer.invoke('listarSessoesPorPaciente', id),
  listarTodasSessoes: () => ipcRenderer.invoke('listarTodasSessoes'),
  atualizarSessao: (sessao: Sessao) =>
    ipcRenderer.invoke('atualizarSessao', sessao),
  deletarSessao: (id: number) => ipcRenderer.invoke('deletarSessao', id),
});
