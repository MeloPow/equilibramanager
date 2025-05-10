// src/db/sessao.ts
import { getDb } from './database';
import { Sessao } from '../types/Sessao';

export function criarSessao(sessao: Sessao): Sessao {
  const db = getDb();
  const stmt = db.prepare(
    `INSERT INTO sessoes (paciente_id, data_hora, status, observacoes)
     VALUES (?, ?, ?, ?)`
  );
  const result = stmt.run(
    sessao.paciente,
    sessao.data_hora,
    sessao.status,
    sessao.observacoes ?? null
  );
  console.log('Sessão criada:', { id: result.lastInsertRowid, ...sessao });
  return { ...sessao, id: Number(result.lastInsertRowid) };
}

export function listarSessoesPorPaciente(pacienteId: number): Sessao[] {
  const db = getDb();
  const stmt = db.prepare(
    `SELECT s.id, s.paciente_id AS paciente, s.data_hora, s.status, s.observacoes, p.nome_completo AS paciente_nome
     FROM sessoes s
     JOIN pacientes p ON s.paciente_id = p.id
     WHERE s.paciente_id = ?
     ORDER BY s.data_hora DESC`
  );
  return stmt.all(pacienteId) as Sessao[];
}

export function listarTodasSessoes(): Sessao[] {
  const db = getDb();
  const stmt = db.prepare(
    `SELECT s.id, s.paciente_id AS paciente, s.data_hora, s.status, s.observacoes, p.nome_completo AS paciente_nome
     FROM sessoes s
     JOIN pacientes p ON s.paciente_id = p.id
     ORDER BY s.data_hora DESC`
  );
  return stmt.all() as Sessao[];
}

export function atualizarSessao(sessao: Sessao): void {
  const db = getDb();
  const stmt = db.prepare(
    `UPDATE sessoes
     SET data_hora = ?, status = ?, observacoes = ?
     WHERE id = ?`
  );
  stmt.run(sessao.data_hora, sessao.status, sessao.observacoes, sessao.id);
}

export function deletarSessao(id: number): void {
  const db = getDb();
  const stmt = db.prepare(`DELETE FROM sessoes WHERE id = ?`);
  stmt.run(id);
}
