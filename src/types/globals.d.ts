import { Paciente } from './Paciente';
import { Sessao } from './Sessao';

interface API {
  // Paciente
  criarPaciente(paciente: Paciente): Promise<number>;
  listarPacientes(): Promise<Paciente[]>;
  buscarPacientePorId(id: number): Promise<Paciente>;
  atualizarPaciente(paciente: Paciente): Promise<void>;
  deletarPaciente(id: number): Promise<void>;

  // Sessão
  criarSessao(sessao: Sessao): Promise<Sessao>;
  listarSessoesPorPaciente(id: number): Promise<Sessao[]>;
  listarTodasSessoes(): Promise<Sessao[]>;
  atualizarSessao(sessao: Sessao): Promise<void>;
  deletarSessao(id: number): Promise<void>;
}

declare global {
  interface Window {
    api: API;
  }
}

export {}; // mantém escopo de módulo
