import { Sessao } from '../../types/Sessao';

export async function criarSessao(sessao: Sessao): Promise<Sessao> {
  return await window.api.criarSessao(sessao);
}

export async function listarSessoesPorPaciente(
  pacienteId: number
): Promise<Sessao[]> {
  return await window.api.listarSessoesPorPaciente(pacienteId);
}

export async function listarTodasSessoes(): Promise<Sessao[]> {
  return await window.api.listarTodasSessoes();
}

export async function atualizarSessao(sessao: Sessao): Promise<void> {
  return await window.api.atualizarSessao(sessao);
}

export async function deletarSessao(id: number): Promise<void> {
  return await window.api.deletarSessao(id);
}
