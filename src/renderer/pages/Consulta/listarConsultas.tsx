// src/renderer/pages/Consulta/listarConsultas.tsx

import React, { useEffect, useState } from 'react';
import {
   Box, Typography, Paper, Button, TextField, MenuItem,
   IconButton, Modal, Collapse
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Consulta } from '../../../types/Consulta';
import { listarTodasConsultas, deletarConsulta } from '../../services/consultaService';
import { listarPacientes } from '../../services/pacienteService';
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import background from '../../../assets/images/background3.png';
import imagii from '../../../assets/images/background2.png';
import { Colors } from '../../styles/Colors';
import BotaoVoltar from '../../components/VoltarGlobal';
import PacienteAutocomplete from '../../components/PacienteAutocomplete';
import { Paciente } from '../../../types/Paciente';
import { RelatorioEvolucao } from '../../../types/RelatorioEvolucao';

export default function ListarConsultas() {
   const [consultas, setConsultas] = useState<Consulta[]>([]);
   const [pacientes, setPacientes] = useState<Paciente[]>([]);
   const [filtroStatus, setFiltroStatus] = useState<string | null>(null);
   const [filtroPacienteId, setFiltroPacienteId] = useState<number | null>(null);
   const [filtroAno, setFiltroAno] = useState<string | null>(null);
   const [filtroMes, setFiltroMes] = useState<string | null>(null);
   const [expandirId, setExpandirId] = useState<number | null>(null);
   const [modalConsulta, setModalConsulta] = useState<Consulta | null>(null);
   const [modalRelatorio, setModalRelatorio] = useState<RelatorioEvolucao | null>(null);
   const contadorPorPaciente: Record<number, Consulta[]> = {};
   const [searchParams] = useSearchParams();
   const statusParam = searchParams.get('status');

   const navigate = useNavigate();
   type ContextType = { drawerOpen: boolean };
   const { drawerOpen } = useOutletContext<ContextType>();

   useEffect(() => {
      carregarConsultas();
      carregarPacientes();
   }, []);

   const carregarConsultas = async () => {
      try {
         const resultado = await listarTodasConsultas();
         setConsultas(resultado);
      } catch (error) {
         alert('Erro ao carregar consultas');
         console.error(error);
      }
   };

   const carregarPacientes = async () => {
      try {
         const lista = await listarPacientes();
         setPacientes(lista);
      } catch (error) {
         alert('Erro ao carregar pacientes');
         console.error(error);
      }
   };

   consultas.forEach((consulta) => {
      const id = consulta.paciente;
      if (!contadorPorPaciente[id]) contadorPorPaciente[id] = [];
      contadorPorPaciente[id].push(consulta);
   });

   Object.values(contadorPorPaciente).forEach(lista => {
      lista.sort((a, b) => new Date(a.data_hora).getTime() - new Date(b.data_hora).getTime());
   });

   const getNumeroConsulta = (consulta: Consulta): number => {
      const grupo = contadorPorPaciente[consulta.paciente];
      return grupo.findIndex(c => c.id === consulta.id) + 1;
   };

   const handleExcluir = async (id: number) => {
      if (!confirm('Deseja realmente excluir esta consulta?')) return;
      try {
         await deletarConsulta(id);
         carregarConsultas();
      } catch (error) {
         alert('Erro ao excluir consulta');
         console.error(error);
      }
   };

   const anosDisponiveis = Array.from(new Set(consultas.map(c => new Date(c.data_hora).getFullYear().toString())));
   const meses = [...Array(12).keys()].map(i => ({
      value: String(i + 1).padStart(2, '0'),
      label: new Date(2000, i).toLocaleString('pt-BR', { month: 'long' })
   }));

   const consultasFiltradas = consultas.filter((c) => {
      const data = new Date(c.data_hora);
      const ano = String(data.getFullYear());
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const condAno = filtroAno ? ano === filtroAno : false;
      const condPaciente = filtroPacienteId ? c.paciente === filtroPacienteId : true;
      const condMes = filtroMes ? mes === filtroMes : true;
      const condStatus = filtroStatus ? c.status === filtroStatus : true;
      return condAno && condPaciente && condMes && condStatus;
   });

   return (
      <div className="paciente-background" style={{ backgroundImage: `url(${background})` }}>
         <BotaoVoltar drawerOpen={drawerOpen} />
         <Box sx={{ p: 5, width: '900px', maxWidth: '900px', margin: '0 auto', backgroundImage: `url(${imagii})`, borderRadius: '10px', border: '4px groove #481d74' }}>
            <Typography variant="h4" gutterBottom sx={{ mt: 3, backgroundColor: Colors.roxobom, p: 2, color: Colors.branco, border: '2px solid pink', borderRadius: 4, fontFamily: 'serif' }}>
               📚 Consultas {statusParam ? `(${statusParam}(s))` : ''} {filtroAno ? `de ${filtroAno}` : ''}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
               <Box sx={{ flex: 1 }}>
                  <PacienteAutocomplete pacienteSelecionadoId={filtroPacienteId} onSelecionar={(paciente) => setFiltroPacienteId(paciente.id || null)} />
               </Box>
               <TextField select label="Ano" value={filtroAno || ''} onChange={(e) => setFiltroAno(e.target.value || null)} sx={{ width: 150 }}>
                  <MenuItem value="">Todos</MenuItem>
                  {anosDisponiveis.map((ano) => (
                     <MenuItem key={ano} value={ano}>{ano}</MenuItem>
                  ))}
               </TextField>
               <TextField select label="Mês" value={filtroMes || ''} onChange={(e) => setFiltroMes(e.target.value || null)} sx={{ width: 180 }}>
                  <MenuItem value="">Todos</MenuItem>
                  {meses.map((m) => (
                     <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>
                  ))}
               </TextField>
            </Box>

            {filtroAno && consultasFiltradas.map((consulta) => {
               const data = new Date(consulta.data_hora);
               const dataFormatada = data.toLocaleDateString('pt-BR');
               const horaFormatada = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

               return (
                  <Paper key={consulta.id} sx={{ mb: 2, p: 2 }}>
                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}>
                           🧑 {consulta.paciente_nome} — Consulta nº {getNumeroConsulta(consulta)} — 📅 {dataFormatada} às {horaFormatada}
                        </Typography>
                        <IconButton onClick={() => setExpandirId(expandirId === consulta.id ? null : consulta.id)}>
                           {expandirId === consulta.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                     </Box>

                     <Collapse in={expandirId === consulta.id}>
                        <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                           <Button size="small" onClick={() => setModalConsulta(consulta)}>
                              👁️ Exibir detalhes
                           </Button>
                           <Button size="small" variant="outlined" onClick={() => navigate(`/consulta/editarconsultas/${consulta.id}`)}>
                              ✏️ Editar
                           </Button>
                           <Button size="small" variant="contained" color="error" onClick={() => handleExcluir(consulta.id)}>
                              ❌ Excluir
                           </Button>
                           <Button size="small" variant="outlined" onClick={async () => {
                              console.log('Buscando relatório para consulta', consulta.id);
                              const rels = await window.api.listarRelatoriosEvolucaoPorConsulta(consulta.id);
                              console.log('Relatórios encontrados:', rels);
                              if (rels.length) {
                                 setModalRelatorio(rels[0]);
                              } else {
                                 navigate(`/relatorio/evolucao?consultaId=${consulta.id}`);
                              }
                           }}>
                              📄 Relatório de Evolução
                           </Button>
                        </Box>
                     </Collapse>
                  </Paper>
               );
            })}

            <Modal open={!!modalConsulta} onClose={() => setModalConsulta(null)}>
               <Box sx={{ p: 4, bgcolor: '#fff', maxWidth: 600, mx: 'auto', mt: 10, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {modalConsulta && (
                     <>
                        <Typography variant="h6" fontWeight="bold">Detalhes da Consulta</Typography>
                        <Typography><strong>Status:</strong> {modalConsulta.status}</Typography>
                        <Typography><strong>Tipo:</strong> {modalConsulta.tipo}</Typography>
                        <Typography><strong>Valor:</strong> R$ {modalConsulta.valor?.toFixed(2)}</Typography>
                        <Typography><strong>Foi paga?</strong> {modalConsulta.foi_paga ? 'Sim' : 'Não'}</Typography>
                        <Typography><strong>Forma de Pagamento:</strong> {modalConsulta.forma_pagamento}</Typography>
                        <Typography><strong>Data de Pagamento:</strong> {modalConsulta.data_pagamento}</Typography>
                        <Typography><strong>Motivo Cancelamento:</strong> {modalConsulta.motivo_cancelamento}</Typography>
                        <Typography><strong>Observações:</strong> {modalConsulta.observacoes}</Typography>
                     </>
                  )}
               </Box>
            </Modal>

            <Modal open={!!modalRelatorio} onClose={() => setModalRelatorio(null)}>
               <Box sx={{ p: 4, bgcolor: '#fff', maxWidth: 600, mx: 'auto', mt: 10, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography variant="h6" fontWeight="bold">Relatório de Evolução</Typography>
                  <Typography><strong>Resumo:</strong> {modalRelatorio?.resumo}</Typography>
                  <Typography><strong>Evolução:</strong> {modalRelatorio?.evolucao}</Typography>
                  <Typography><strong>Plano:</strong> {modalRelatorio?.plano}</Typography>

                  <Button variant="contained" color="primary" onClick={() => window.print()}>
                     📄 Gerar PDF
                  </Button>
                  <Button variant="outlined" onClick={() => navigate(`/Relatorio/evolucao?consultaId=${modalRelatorio?.consulta_id}`)}>
                     ✏️ Editar Relatório
                  </Button>
                  <Button variant="contained" color="error" onClick={async () => {
                     if (!confirm('Deseja excluir o relatório?')) return;
                     await window.api.deletarRelatorioEvolucao(modalRelatorio!.id!);
                     setModalRelatorio(null);
                     alert('Relatório excluído.');
                  }}>
                     ❌ Excluir Relatório
                  </Button>
               </Box>
            </Modal>

         </Box>
      </div>
   );
}
