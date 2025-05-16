// src/db/database.ts
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

let dbInstance: Database.Database | null = null;

export function initializeDatabase(dbPath: string) {
  if (!fs.existsSync(path.dirname(dbPath))) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  }

  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');

  // Criação separada das tabelas
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS pacientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome_completo TEXT NOT NULL,
      data_nascimento TEXT,
      sexo TEXT,
      cpf TEXT NOT NULL,
      telefone TEXT NOT NULL,
      tipo_atendimento TEXT DEFAULT 'particular',
      email TEXT,
      endereco TEXT,
      profissao TEXT,
      estado_civil TEXT,
      religiao TEXT,
      escolaridade TEXT,
      status TEXT NOT NULL DEFAULT 'ativo',
      observacoes TEXT
    )
  `
  ).run();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS consultas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      paciente_id INTEGER NOT NULL,
      data_hora TEXT NOT NULL,
      status TEXT NOT NULL,
      observacoes TEXT,
      foi_paga INTEGER NOT NULL DEFAULT 0,
      motivo_cancelamento TEXT,
      valor REAL,
      tipo TEXT,
      atestado_anexo TEXT,
      forma_pagamento TEXT,
      data_pagamento TEXT,
      FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
    )
  `
  ).run();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS relatorios_evolucao (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      consulta_id INTEGER NOT NULL,
      paciente_id INTEGER NOT NULL,
      data_sessao TEXT NOT NULL,
      resumo TEXT NOT NULL,
      evolucao TEXT NOT NULL,
      plano TEXT NOT NULL,
      FOREIGN KEY (consulta_id) REFERENCES consultas(id),
      FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
    )
  `
  ).run();

  // Tentativa de adicionar colunas em consultas (apenas se não existirem)
  /*
  const alterarConsultas = [
    'ALTER TABLE consultas ADD COLUMN foi_paga INTEGER NOT NULL DEFAULT 0',
    'ALTER TABLE consultas ADD COLUMN motivo_cancelamento TEXT',
    'ALTER TABLE consultas ADD COLUMN valor REAL',
    'ALTER TABLE consultas ADD COLUMN tipo TEXT',
    'ALTER TABLE consultas ADD COLUMN atestado_anexo TEXT',
    'ALTER TABLE consultas ADD COLUMN forma_pagamento TEXT',
    'ALTER TABLE consultas ADD COLUMN data_pagamento TEXT',
  ];

  for (const sql of alterarConsultas) {
    try {
      db.prepare(sql).run();
    } catch (e) {
      console.warn(`Erro ao tentar alterar tabela: ${sql} →`, e.message);
    }
  }*/

  dbInstance = db;
  return db;
}

export function getDb(): Database.Database {
  if (!dbInstance) {
    throw new Error('Banco de dados não inicializado!');
  }
  return dbInstance;
}
