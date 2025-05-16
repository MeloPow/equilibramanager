import { getDb } from './database';
import { Paciente } from '../types/Paciente';

export function criarPaciente(paciente: Paciente) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO pacientes (
      nome_completo, data_nascimento, sexo, cpf, telefone, tipo_atendimento, 
      email, endereco, profissao, estado_civil, religiao, escolaridade, status, observacoes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(
    paciente.nome_completo,
    paciente.data_nascimento,
    paciente.sexo,
    paciente.cpf,
    paciente.telefone,
    paciente.tipo_atendimento,
    paciente.email,
    paciente.endereco,
    paciente.profissao,
    paciente.estado_civil,
    paciente.religiao,
    paciente.escolaridade,
    paciente.status || 'ativo',
    paciente.observacoes
  );
  return info.lastInsertRowid;
}

export function listarPacientes() {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM pacientes ORDER BY nome_completo ASC');
  return stmt.all();
}

export function buscarPacientePorId(id: number): Paciente | undefined {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM pacientes WHERE id = ?');
  return stmt.get(id) as Paciente | undefined;
}

export function atualizarPaciente(paciente: Paciente) {
  const db = getDb();
  const stmt = db.prepare(`
    UPDATE pacientes SET
      nome_completo = ?,
      data_nascimento = ?,
      sexo = ?,
      cpf = ?,
      telefone = ?,
      tipo_atendimento = ?,
      email = ?,
      endereco = ?,
      profissao = ?,
      estado_civil = ?,
      religiao = ?,
      escolaridade = ?,
      status = ?,
      observacoes = ?
    WHERE id = ?
  `);

  stmt.run(
    paciente.nome_completo,
    paciente.data_nascimento,
    paciente.sexo,
    paciente.cpf,
    paciente.telefone,
    paciente.tipo_atendimento,
    paciente.email,
    paciente.endereco,
    paciente.profissao,
    paciente.estado_civil,
    paciente.religiao,
    paciente.escolaridade,
    paciente.status,
    paciente.observacoes,
    paciente.id // ✅ Agora sim, no lugar certo
  );
}

export function deletarPaciente(id: number) {
  const db = getDb();
  const stmt = db.prepare('DELETE FROM pacientes WHERE id = ?');
  stmt.run(id);
}
