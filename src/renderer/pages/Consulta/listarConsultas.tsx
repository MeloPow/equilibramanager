// src/renderer/pages/Consulta/listarConsultas.tsx
// Atualizado: usando os componentes ConsultaCard, ModalDetalhesConsulta e ModalRelatorioEvolucao

import React, { useEffect, useState } from 'react';
import {
   Box, Typography, TextField, MenuItem
} from '@mui/material';
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import { Consulta } from '../../../types/Consulta';
import { listarTodasConsultas, deletarConsulta } from '../../services/consultaService';
import { listarPacientes } from '../../services/pacienteService';
import { Paciente } from '../../../types/Paciente';
import { RelatorioEvolucao } from '../../../types/RelatorioEvolucao';
import background from '../../../assets/images/background3.png';
import imagii from '../../../assets/images/background2.png';
import { Colors } from '../../styles/Colors';
import BotaoVoltar from '../../components/VoltarGlobal';
import PacienteAutocomplete from '../../components/PacienteAutocomplete';
import ConsultaCard from '../../components/ConsultaCard';
import ModalDetalhesConsulta from '../../components/ListarConsultas/ModalDetalhesConsulta';
import ModalRelatorioEvolucao from '../../components/ModalRelatorioEvolucao';

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
      if (statusParam) setFiltroStatus(statusParam);
   }, [statusParam]);

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
      if (consulta.status?.toLowerCase() === 'realizada') {
         const id = consulta.paciente;
         if (!contadorPorPaciente[id]) contadorPorPaciente[id] = [];
         contadorPorPaciente[id].push(consulta);
      }
   });

   Object.values(contadorPorPaciente).forEach(lista => {
      lista.sort((a, b) => new Date(a.data_hora).getTime() - new Date(b.data_hora).getTime());
   });

   const getNumeroConsulta = (consulta: Consulta): number => {
      const grupo = contadorPorPaciente[consulta.paciente] || [];
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

            {filtroAno && consultasFiltradas.map((consulta) => (
               <ConsultaCard
                  key={consulta.id}
                  consulta={consulta}
                  expandido={expandirId === consulta.id}
                  numeroConsulta={getNumeroConsulta(consulta)}
                  onToggleExpand={() => setExpandirId(expandirId === consulta.id ? null : consulta.id)}
                  onAbrirModalConsulta={() => setModalConsulta(consulta)}
                  onEditar={async () => {
                     const rels = await window.api.listarRelatoriosEvolucaoPorConsulta(consulta.id);
                     if (rels.length) {
                        alert('Esta consulta já possui um relatório e não pode ser editada.');
                     } else {
                        navigate(`/consulta/editarconsultas/${consulta.id}`);
                     }
                  }}
                  onExcluir={async () => {
                     const rels = await window.api.listarRelatoriosEvolucaoPorConsulta(consulta.id);
                     if (rels.length) {
                        alert('Esta consulta possui um relatório vinculado e não pode ser excluída.');
                     } else {
                        handleExcluir(consulta.id);
                     }
                  }}
                  onRelatorio={async () => {
                     if (consulta.status.toLowerCase() !== 'realizada') {
                        alert('Só é possível preencher um relatório de evolução para consultas com status "realizada".');
                        return;
                     }
                     const rels = await window.api.listarRelatoriosEvolucaoPorConsulta(consulta.id);
                     if (rels.length) {
                        setModalRelatorio(rels[0]);
                     } else {
                        navigate(`/relatorio/evolucao?consultaId=${consulta.id}`);
                     }
                  }}
               />
            ))}

            <ModalDetalhesConsulta
               open={!!modalConsulta}
               consulta={modalConsulta}
               onClose={() => setModalConsulta(null)}
            />

            <ModalRelatorioEvolucao
               open={!!modalRelatorio}
               relatorio={modalRelatorio}
               onClose={() => setModalRelatorio(null)}
               onExcluir={async (id: number) => {
                  await window.api.deletarRelatorioEvolucao(id);
                  setModalRelatorio(null);
                  alert('Relatório excluído.');
                  carregarConsultas();
               }}
               numeroConsulta={modalRelatorio && consultas.find(c => c.id === modalRelatorio.consulta_id) ? getNumeroConsulta(consultas.find(c => c.id === modalRelatorio.consulta_id)!) : undefined}
               nomePaciente={modalRelatorio && consultas.find(c => c.id === modalRelatorio.consulta_id)?.paciente_nome}
               dataHoraConsulta={modalRelatorio && consultas.find(c => c.id === modalRelatorio.consulta_id)?.data_hora}
            />

         </Box>
      </div>
   );
}
