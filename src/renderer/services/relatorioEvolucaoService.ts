// src/renderer/services/relatorioEvolucaoService.ts
import { RelatorioEvolucao } from '../../types/RelatorioEvolucao';

export async function criarRelatorioEvolucao(
  relatorio: RelatorioEvolucao
): Promise<RelatorioEvolucao> {
  return await window.api.criarRelatorioEvolucao(relatorio);
}

export async function listarRelatoriosEvolucaoPorConsulta(
  consultaId: number
): Promise<RelatorioEvolucao[]> {
  return await window.api.listarRelatoriosEvolucaoPorConsulta(consultaId);
}

export async function listarRelatoriosEvolucaoPorPaciente(
  pacienteId: number
): Promise<RelatorioEvolucao[]> {
  return await window.api.listarRelatoriosEvolucaoPorPaciente(pacienteId);
}

export async function atualizarRelatorioEvolucao(
  relatorio: RelatorioEvolucao
): Promise<void> {
  return await window.api.atualizarRelatorioEvolucao(relatorio);
}

export async function deletarRelatorioEvolucao(id: number): Promise<void> {
  return await window.api.deletarRelatorioEvolucao(id);
}
