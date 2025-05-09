import { Paciente } from './Paciente';

interface PacienteAPI {
  criarPaciente(paciente: Paciente): Promise<number>;
  listarPacientes(): Promise<Paciente[]>;
  buscarPacientePorId(id: number): Promise<Paciente>;
  atualizarPaciente(paciente: Paciente): Promise<void>;
  deletarPaciente(id: number): Promise<void>;
}

declare global {
  interface Window {
    api: PacienteAPI;
  }
}

export {}; // mantém escopo de módulo
