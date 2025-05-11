import { Consulta } from '../../types/Consulta';

export async function criarConsulta(consulta: Consulta): Promise<Consulta> {
  return await window.api.criarConsulta(consulta);
}

export async function listarConsultasPorPaciente(
  pacienteId: number
): Promise<Consulta[]> {
  return await window.api.listarConsultasPorPaciente(pacienteId);
}

export async function listarTodasConsultas(): Promise<Consulta[]> {
  return await window.api.listarTodasConsultas();
}

export async function atualizarConsulta(consulta: Consulta): Promise<void> {
  return await window.api.atualizarConsulta(consulta);
}

export async function deletarConsulta(id: number): Promise<void> {
  return await window.api.deletarConsulta(id);
}
