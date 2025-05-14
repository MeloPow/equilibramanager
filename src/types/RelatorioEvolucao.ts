export interface RelatorioEvolucao {
  id?: number;
  consulta_id: number; // Ligado à consulta realizada
  paciente_id: number; // Ligado ao paciente da consulta
  data_sessao: string; // ISO - puxado da consulta
  resumo: string; // Escrita pelo psicólogo
  evolucao: string; // Escrita pelo psicólogo
  plano: string; // Plano para próxima sessão
}
