// === preload.ts ===
import { contextBridge, ipcRenderer } from 'electron';
import { Paciente } from './types/Paciente';
import { Consulta } from './types/Consulta';

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
  criarConsulta: (consulta: Consulta) =>
    ipcRenderer.invoke('criarConsulta', consulta),
  listarConsultasPorPaciente: (id: number) =>
    ipcRenderer.invoke('listarConsultasPorPaciente', id),
  listarTodasConsultas: () => ipcRenderer.invoke('listarTodasConsultas'),
  atualizarConsulta: (consulta: Consulta) =>
    ipcRenderer.invoke('atualizarConsulta', consulta),
  deletarConsulta: (id: number) => ipcRenderer.invoke('deletarConsulta', id),
});
