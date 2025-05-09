// === database.ts ===
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

  // Criação da tabela de pacientes
  const createTable = `
    CREATE TABLE IF NOT EXISTS pacientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome_completo TEXT NOT NULL,
      data_nascimento TEXT,
      sexo TEXT,
      cpf TEXT NOT NULL,
      telefone TEXT NOT NULL,
      email TEXT,
      endereco TEXT,
      profissao TEXT,
      estado_civil TEXT,
      observacoes TEXT,
      status TEXT NOT NULL DEFAULT 'ativo'
    )
  `;
  db.prepare(createTable).run();

  // Caso precise garantir existência da coluna 'status' após mudanças
  try {
    db.prepare(
      `ALTER TABLE pacientes ADD COLUMN status TEXT NOT NULL DEFAULT 'ativo'`
    ).run();
  } catch (e) {
    // ignora se já existir
  }

  dbInstance = db;
  return db;
}

export function getDb(): Database.Database {
  if (!dbInstance) {
    throw new Error('Banco de dados não inicializado!');
  }
  return dbInstance;
}
