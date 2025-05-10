// src/pages/Agenda/calendario.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { format, addDays, subDays, startOfDay, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Colors } from '../../styles/Colors';
import background from '../../../assets/images/background3.png';
import imagii from '../../../assets/images/background2.png';
import BotaoVoltar from '../../components/VoltarGlobal';
import { Sessao } from '../../../types/Sessao';
import { listarSessoesPorPaciente, listarTodasSessoes } from '../../services/sessaoService';

const horarios = Array.from({ length: 14 }, (_, i) => `${i + 6}:00`);

export default function Calendario() {
   const navigate = useNavigate();
   const [startDate, setStartDate] = useState<Date>(startOfDay(new Date()));
   const [celulaSelecionada, setCelulaSelecionada] = useState<string | null>(null);
   const [sessoes, setSessoes] = useState<Sessao[]>([]);

   type ContextType = { drawerOpen: boolean };
   const { drawerOpen } = useOutletContext<ContextType>();

   const diasMostrados = useMemo(
      () => Array.from({ length: 7 }, (_, i) => addDays(startDate, i)),
      [startDate]
   );

   const mapaSessoes = useMemo(() => {
      console.log('[MAP] recalculando mapaSessoes');
      const mapa: { [key: string]: Sessao[] } = {};
      sessoes.forEach(sessao => {
         const data = new Date(sessao.data_hora);
         const dia = format(data, 'yyyy-MM-dd');
         const hora = `${String(data.getHours()).padStart(2, '0')}:00`;
         const chave = `${hora}-${dia}`;
         console.log('[MAP]', chave, sessao.paciente_nome); // novo log
         if (!mapa[chave]) mapa[chave] = [];
         mapa[chave].push(sessao);
      });
      return mapa;
   }, [sessoes]);

   const handleAnterior = () => {
      const novaData = subDays(startDate, 1);
      const umMesAtras = subDays(new Date(), 30);
      if (novaData >= umMesAtras) setStartDate(novaData);
   };

   const handleProximo = () => {
      const novaData = addDays(startDate, 1);
      const limite = addDays(new Date(), 15);
      if (novaData <= limite) setStartDate(novaData);
   };

   const rangeDiasTexto = `${format(diasMostrados[0], 'dd/MM')} ~ ${format(
      diasMostrados[6], 'dd/MM'
   )}`;

   const redirecionarParaNovaSessao = (data: Date) => {
      const iso = data.toISOString().slice(0, 16);
      navigate(`/sessao/nova?dataHora=${encodeURIComponent(iso)}`);
   };

   useEffect(() => {
      listarTodasSessoes()
         .then(sessoes => {
            console.log('[LOAD ALL] sessoes recebidas:', sessoes);
            setSessoes(sessoes);
         })
         .catch(console.error);
   }, []);

   return (
      <div className="paciente-background" style={{ backgroundImage: `url(${background})` }}>
         <BotaoVoltar drawerOpen={drawerOpen} />
         <Box sx={{ p: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
               <Button onClick={handleAnterior} sx={{ backgroundColor: Colors.azulelegante, color: Colors.brancocinza, top: 35 }}>
                  <ArrowBackIosNewIcon fontSize="small" />
                  Anterior
               </Button>
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: 1,
                     border: '2px solid',
                     borderColor: Colors.roxobom,
                     borderRadius: '12px', px: 2, py: 1
                  }}>
                  <CalendarTodayIcon sx={{ color: Colors.roxobom }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: Colors.roxobom }}>
                     {rangeDiasTexto}
                  </Typography>
               </Box>
               <Button onClick={handleProximo} sx={{ backgroundColor: Colors.azulelegante, color: Colors.brancocinza, top: 35 }}>
                  Próximo <ArrowForwardIosIcon fontSize="small" />
               </Button>
            </Box>

            <Box sx={{ overflowX: 'auto', borderRadius: '10px' }}>
               <Box sx={{ minWidth: 1000, border: '3px solid black' }}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)' }}>
                     <Box sx={{ backgroundColor: Colors.roxobom, color: 'white', p: 1, fontWeight: 'bold', textAlign: 'center', borderLeft: '2px solid #96963e', borderTop: '2px solid #96963e', borderRight: '2px solid #96963e', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                        <AccessTimeIcon fontSize="small" /> Hora
                     </Box>
                     {diasMostrados.map((dia, index) => (
                        <Box key={index} sx={{ background: Colors.roxobom, color: isToday(dia) ? 'Window' : 'white', p: 1, fontWeight: 'bold', textAlign: 'center', border: isToday(dia) ? '5px solid green' : '2px solid #96963e' }}>
                           {isToday(dia)
                              ? `Hoje, ${format(dia, 'EEE - dd/MM/yyyy', { locale: ptBR })}`
                              : format(dia, 'EEE - dd/MM/yyyy', { locale: ptBR })}
                        </Box>
                     ))}
                  </Box>

                  {horarios.map((hora, rowIndex) => {
                     return (
                        <Box key={rowIndex} sx={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)' }}>
                           <Box sx={{ p: 1, textAlign: 'center', display: 'flex', border: '2px solid #96963e', justifyContent: 'center', alignItems: 'center', gap: 1, color: 'snow', backgroundColor: Colors.roxobom }}>
                              <AccessTimeIcon fontSize="small" /> {hora}
                           </Box>
                           {diasMostrados.map((dia, colIndex) => {
                              const horaFormatada = `${String(Number(hora.split(':')[0])).padStart(2, '0')}:00`;
                              const dataFormatada = format(dia, 'yyyy-MM-dd');
                              const chave = `${horaFormatada}-${dataFormatada}`;
                              const sessoesNaCelula = mapaSessoes[chave] || [];
                              const estaVazio = sessoesNaCelula.length === 0;
                              const dataCompleta = new Date(`${dataFormatada}T${horaFormatada}`);

                              console.log('[RENDER] chave:', chave, '→ sessoesNaCelula.length:', sessoesNaCelula.length);

                              return (
                                 <Box
                                    key={colIndex}
                                    onClick={() => setCelulaSelecionada(chave)}
                                    sx={{
                                       height: 75,
                                       border: '2px solid #96963e',
                                       backgroundImage: `url(${imagii})`,
                                       backgroundColor: celulaSelecionada === chave ? '#d0d0ff' : 'transparent',
                                       display: 'flex',
                                       flexDirection: 'column',
                                       justifyContent: 'center',
                                       alignItems: 'center',
                                       p: 0.5,
                                       position: 'relative'
                                    }}
                                 >
                                    {sessoesNaCelula.map(sessao => (
                                       <Paper
                                          key={sessao.id}
                                          sx={{
                                             width: '90%',
                                             textAlign: 'center',
                                             p: 0.5,
                                             m: 'auto',
                                             maxHeight: 50,
                                             overflow: 'hidden',
                                             display: 'flex',
                                             flexDirection: 'column',
                                             justifyContent: 'center',
                                             alignItems: 'center',
                                             borderRadius: 1,
                                             boxShadow: 3,
                                             backgroundColor:
                                                sessao.status === 'realizada'
                                                   ? '#4CAF50' // verde
                                                   : sessao.status === 'cancelada'
                                                      ? '#F44336' // vermelho
                                                      : '#FFC107', // amarelo
                                          }}
                                       >
                                          <Typography
                                             sx={{
                                                fontSize: 13,
                                                fontWeight: 'bold',
                                                color: 'black',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',

                                             }}
                                          >
                                             {sessao.paciente_nome}
                                          </Typography>
                                          <Typography
                                             sx={{
                                                fontSize: 11,
                                                color: 'black',
                                                fontStyle: 'italic',
                                                textTransform: 'capitalize',
                                             }}
                                          >
                                             {sessao.status}
                                          </Typography>
                                       </Paper>
                                    ))}
                                    {estaVazio && (
                                       <AddCircleOutlineIcon
                                          sx={{ fontSize: 28, color: Colors.verdeforte, opacity: 0.6, cursor: 'pointer' }}
                                          onClick={(e) => {
                                             e.stopPropagation();
                                             redirecionarParaNovaSessao(dataCompleta);
                                          }}
                                       />
                                    )}
                                 </Box>
                              );
                           })}
                        </Box>
                     );
                  })}
               </Box>
            </Box>
         </Box>
      </div>
   );
}
