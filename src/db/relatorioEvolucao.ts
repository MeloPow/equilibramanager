// src/db/relatorio_evolucao.ts
import { getDb } from './database';
import { RelatorioEvolucao } from '../types/RelatorioEvolucao';

export function criarRelatorioEvolucao(
  relatorio: RelatorioEvolucao
): RelatorioEvolucao {
  const db = getDb();
  const stmt = db.prepare(
    `INSERT INTO relatorios_evolucao (
      consulta_id, paciente_id, data_sessao, resumo, evolucao, plano
    ) VALUES (?, ?, ?, ?, ?, ?)`
  );
  const result = stmt.run(
    relatorio.consulta_id,
    relatorio.paciente_id,
    relatorio.data_sessao,
    relatorio.resumo,
    relatorio.evolucao,
    relatorio.plano
  );
  return { ...relatorio, id: Number(result.lastInsertRowid) };
}

export function listarRelatoriosPorConsulta(
  consultaId: number
): RelatorioEvolucao[] {
  const db = getDb();
  const stmt = db.prepare(
    `SELECT * FROM relatorios_evolucao WHERE consulta_id = ?`
  );
  return stmt.all(consultaId) as RelatorioEvolucao[];
}

export function listarRelatoriosPorPaciente(
  pacienteId: number
): RelatorioEvolucao[] {
  const db = getDb();
  const stmt = db.prepare(
    `SELECT * FROM relatorios_evolucao WHERE paciente_id = ? ORDER BY data_sessao DESC`
  );
  return stmt.all(pacienteId) as RelatorioEvolucao[];
}

export function atualizarRelatorioEvolucao(relatorio: RelatorioEvolucao): void {
  const db = getDb();
  const stmt = db.prepare(
    `UPDATE relatorios_evolucao SET
      resumo = ?, evolucao = ?, plano = ?
     WHERE id = ?`
  );
  stmt.run(relatorio.resumo, relatorio.evolucao, relatorio.plano, relatorio.id);
}

export function deletarRelatorioEvolucao(id: number): void {
  const db = getDb();
  const stmt = db.prepare(`DELETE FROM relatorios_evolucao WHERE id = ?`);
  stmt.run(id);
}
