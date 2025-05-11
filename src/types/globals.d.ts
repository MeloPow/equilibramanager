import { Paciente } from './Paciente';
import { Consulta } from './Consulta';

interface API {
  // Paciente
  criarPaciente(paciente: Paciente): Promise<number>;
  listarPacientes(): Promise<Paciente[]>;
  buscarPacientePorId(id: number): Promise<Paciente>;
  atualizarPaciente(paciente: Paciente): Promise<void>;
  deletarPaciente(id: number): Promise<void>;

  // Sessão
  criarConsulta(consulta: Consulta): Promise<Consulta>;
  listarConsultasPorPaciente(id: number): Promise<Consulta[]>;
  listarTodasConsultas(): Promise<Consulta[]>;
  atualizarConsulta(consulta: Consulta): Promise<void>;
  deletarConsulta(id: number): Promise<void>;
}

declare global {
  interface Window {
    api: API;
  }
}

export {}; // mantém escopo de módulo
