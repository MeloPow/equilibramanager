// src/db/consulta.ts
import { getDb } from './database';
import { Consulta } from '../types/Consulta';

export function criarConsulta(consulta: Consulta): Consulta {
  const db = getDb();
  const stmt = db.prepare(
    `INSERT INTO consultas (
      paciente_id, data_hora, status, observacoes, foi_paga, motivo_cancelamento,
      valor, tipo, atestado_anexo, forma_pagamento, data_pagamento
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const result = stmt.run(
    consulta.paciente,
    consulta.data_hora,
    consulta.status,
    consulta.observacoes ?? null,
    consulta.foi_paga ? 1 : 0,
    consulta.motivo_cancelamento ?? null,
    consulta.valor ?? null,
    consulta.tipo ?? null,
    consulta.atestado_anexo ?? null,
    consulta.forma_pagamento ?? null,
    consulta.data_pagamento ?? null
  );
  return { ...consulta, id: Number(result.lastInsertRowid) };
}

export function listarConsultasPorPaciente(pacienteId: number): Consulta[] {
  const db = getDb();
  const stmt = db.prepare(
    `SELECT s.id, s.paciente_id AS paciente, s.data_hora, s.status, s.observacoes,
            s.foi_paga, s.motivo_cancelamento, s.valor, s.tipo,
            s.atestado_anexo, s.forma_pagamento, s.data_pagamento,
            p.nome_completo AS paciente_nome
     FROM consultas s
     JOIN pacientes p ON s.paciente_id = p.id
     WHERE s.paciente_id = ?
     ORDER BY s.data_hora DESC`
  );
  return stmt.all(pacienteId) as Consulta[];
}

export function listarTodasConsultas(): Consulta[] {
  const db = getDb();
  const stmt = db.prepare(
    `SELECT s.id, s.paciente_id AS paciente, s.data_hora, s.status, s.observacoes,
            s.foi_paga, s.motivo_cancelamento, s.valor, s.tipo,
            s.atestado_anexo, s.forma_pagamento, s.data_pagamento,
            p.nome_completo AS paciente_nome
     FROM consultas s
     JOIN pacientes p ON s.paciente_id = p.id
     ORDER BY s.data_hora DESC`
  );
  return stmt.all() as Consulta[];
}

export function atualizarConsulta(consulta: Consulta): void {
  const db = getDb();
  const stmt = db.prepare(
    `UPDATE consultas
     SET data_hora = ?, status = ?, observacoes = ?, foi_paga = ?, motivo_cancelamento = ?,
         valor = ?, tipo = ?, atestado_anexo = ?, forma_pagamento = ?, data_pagamento = ?
     WHERE id = ?`
  );
  stmt.run(
    consulta.data_hora,
    consulta.status,
    consulta.observacoes ?? null,
    consulta.foi_paga ? 1 : 0,
    consulta.motivo_cancelamento ?? null,
    consulta.valor ?? null,
    consulta.tipo ?? null,
    consulta.atestado_anexo ?? null,
    consulta.forma_pagamento ?? null,
    consulta.data_pagamento ?? null,
    consulta.id
  );
}

export function deletarConsulta(id: number): void {
  const db = getDb();
  const stmt = db.prepare(`DELETE FROM consultas WHERE id = ?`);
  stmt.run(id);
}
