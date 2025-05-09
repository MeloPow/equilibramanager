// src/services/pacienteService.ts
import { Paciente } from '../../types/Paciente';

export async function salvarPaciente(paciente: Paciente) {
  if (!paciente.nome_completo || paciente.nome_completo.trim() === '') {
    throw new Error('Nome completo é obrigatório.');
  }

  try {
    const id = await window.api.criarPaciente(paciente);
    return id;
  } catch (error) {
    console.error('Erro ao salvar paciente:', error);
    throw error;
  }
}

export async function listarPacientes() {
  try {
    return await window.api.listarPacientes();
  } catch (error) {
    console.error('Erro ao listar pacientes:', error);
    throw error;
  }
}

export async function buscarPacientePorId(id: number) {
  return await window.api.buscarPacientePorId(id);
}

export async function atualizarPaciente(paciente: Paciente) {
  return await window.api.atualizarPaciente(paciente);
}

export async function deletarPaciente(id: number) {
  return await window.api.deletarPaciente(id);
}
