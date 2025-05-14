// src/pages/Agenda/calendario.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { Box, Typography, Button, Paper, Tooltip, Stack } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import { format, addDays, subDays, startOfDay, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Colors } from '../../styles/Colors';
import background from '../../../assets/images/background3.png';
import imagii from '../../../assets/images/background2.png';
import { Consulta } from '../../../types/Consulta';
import { listarTodasConsultas } from '../../services/consultaService';

const horarios = Array.from({ length: 14 }, (_, i) => `${i + 6}:00`);

export default function Calendario() {
   const navigate = useNavigate();
   const [startDate, setStartDate] = useState<Date>(startOfDay(new Date()));
   const [celulaSelecionada, setCelulaSelecionada] = useState<string | null>(null);
   const [consultas, setConsultas] = useState<Consulta[]>([]);

   const diasMostrados = useMemo(
      () => Array.from({ length: 7 }, (_, i) => addDays(startDate, i)),
      [startDate]
   );

   const mapaConsultas = useMemo(() => {
      console.log('[MAP] recalculando mapaConsultas');
      const mapa: { [key: string]: Consulta[] } = {};
      consultas.forEach(consulta => {
         const data = new Date(consulta.data_hora);
         const dia = format(data, 'yyyy-MM-dd');
         const hora = `${String(data.getHours()).padStart(2, '0')}:00`;
         const chave = `${hora}-${dia}`;
         console.log('[MAP]', chave, consulta.paciente_nome); // novo log
         if (!mapa[chave]) mapa[chave] = [];
         mapa[chave].push(consulta);
      });
      return mapa;
   }, [consultas]);

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

   const redirecionarParaNovaConsulta = (data: Date) => {
      // Mantém a data local SEM conversão para UTC
      const iso = format(data, "yyyy-MM-dd'T'HH:mm");
      navigate(`/consulta/nova?dataHora=${encodeURIComponent(iso)}`);
   };

   useEffect(() => {
      listarTodasConsultas()
         .then(consultas => {
            console.log('[LOAD ALL] consultas recebidas:', consultas);
            setConsultas(consultas);
         })
         .catch(console.error);
   }, []);

   return (
      <div className="paciente-background" style={{ backgroundImage: `url(${background})` }}>
         <Box sx={{ p: 6 }}>
            <Box sx={{
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
               mb: 5,
            }}
            >
               <Button onClick={handleAnterior} sx={{ backgroundColor: Colors.azulelegante, color: Colors.brancocinza, top: 35, left: 1070 }}>
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
               <Button onClick={handleProximo} sx={{ backgroundColor: Colors.azulelegante, color: Colors.brancocinza, top: 35, right: 1070 }}>
                  Próximo <ArrowForwardIosIcon fontSize="small" />
               </Button>
            </Box>

            <Box sx={{
               overflowX: 'auto',
               borderRadius: '10px',
            }}>
               <Box sx={{
                  minWidth: 1000,
                  border: '3px solid black',
                  width: '2700px',
                  maxWidth: '2700px',
                  height: '1186px',
                  maxHeight: '1186px',

               }}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '165px repeat(7, 1fr)' }}>
                     <Box sx={{
                        backgroundColor: Colors.roxobom,
                        color: 'white',
                        p: 1,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        borderLeft: '2px solid #96963e',
                        borderTop: '2px solid #96963e',
                        borderRight: '2px solid #96963e',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 1,
                        width: '165px',
                        maxWidth: '165px',
                        height: '60px',
                        maxHheight: '60px',
                     }}>
                        <AccessTimeIcon fontSize="small" /> Hora
                     </Box>
                     {diasMostrados.map((dia, index) => (
                        //Box dos dias
                        <Box key={index} sx={{
                           background: Colors.roxobom,
                           color: isToday(dia) ? 'Window' : 'white',
                           p: 1,
                           fontWeight: 'bold',
                           textAlign: 'center',
                           border: isToday(dia) ? '5px solid green' : '2px solid #96963e',
                        }}>
                           {isToday(dia)
                              ? `Hoje, ${format(dia, 'EEE - dd/MM/yyyy', { locale: ptBR })}`
                              : format(dia, 'EEE - dd/MM/yyyy', { locale: ptBR })}
                        </Box>
                     ))}
                  </Box>

                  {horarios.map((hora, rowIndex) => {
                     return (
                        <Box key={rowIndex} sx={{ display: 'grid', gridTemplateColumns: '165px repeat(7, 1fr)' }}>
                           <Box sx={{
                              p: 1,
                              textAlign: 'center',
                              display: 'flex',
                              border: '2px solid #96963e',
                              justifyContent: 'center',
                              alignItems: 'center',
                              gap: 1,
                              color: 'snow',
                              backgroundColor: Colors.roxobom,
                              width: '165px',
                              maxWidth: '165px',
                              height: '80px',
                              maxHeight: '80px',
                           }}>
                              <AccessTimeIcon fontSize="small" /> {hora}
                           </Box>
                           {diasMostrados.map((dia, colIndex) => {
                              const horaFormatada = `${String(Number(hora.split(':')[0])).padStart(2, '0')}:00`;
                              const dataFormatada = format(dia, 'yyyy-MM-dd');
                              const chave = `${horaFormatada}-${dataFormatada}`;
                              const consultasNaCelula = mapaConsultas[chave] || [];
                              const estaVazio = consultasNaCelula.length === 0;
                              const dataCompleta = new Date(`${dataFormatada}T${horaFormatada}`);

                              console.log('[RENDER] chave:', chave, '→ consultasNaCelula.length:', consultasNaCelula.length);

                              return (
                                 <Box
                                    key={colIndex}
                                    onClick={() => setCelulaSelecionada(chave)}
                                    sx={{
                                       width: '100%',
                                       height: 80,
                                       border: '2px solid #96963e',
                                       backgroundImage: `url(${imagii})`,
                                       backgroundColor: celulaSelecionada === chave ? '#d0d0ff' : 'transparent',
                                       display: 'flex',
                                       justifyContent: 'center',
                                       alignItems: 'center',
                                       overflow: 'hidden',
                                       padding: 0,
                                       position: 'relative'
                                    }}
                                 >
                                    {consultasNaCelula.map(consulta => (
                                       <Paper
                                          key={consulta.id}
                                          sx={{
                                             width: '90%',
                                             height: '90%',
                                             padding: '4px',
                                             textAlign: 'center',
                                             display: 'flex',
                                             flexDirection: 'column',
                                             justifyContent: 'center',
                                             alignItems: 'center',
                                             borderRadius: 1,
                                             boxShadow: 3,
                                             overflow: 'hidden',
                                             whiteSpace: 'nowrap',
                                             textOverflow: 'ellipsis',
                                             backgroundColor:
                                                consulta.status === 'realizada'
                                                   ? '#4CAF50'
                                                   : consulta.status === 'cancelada'
                                                      ? '#F44336'
                                                      : '#FFC107',
                                          }}
                                       >
                                          <Tooltip title={consulta.paciente_nome}>
                                             <Typography
                                                sx={{
                                                   fontSize: 18,
                                                   fontWeight: 'bold',
                                                   color: 'black',
                                                   whiteSpace: 'nowrap',
                                                   overflow: 'hidden',
                                                   textOverflow: 'ellipsis',

                                                }}
                                             >
                                                {consulta.paciente_nome}
                                             </Typography>
                                          </Tooltip>
                                          <Typography
                                             sx={{
                                                fontSize: 15,
                                                color: 'black',
                                                fontStyle: 'italic',
                                                textTransform: 'capitalize',
                                             }}
                                          >
                                             {consulta.status}
                                          </Typography>
                                       </Paper>
                                    ))}
                                    {estaVazio && (
                                       <Stack direction="row" spacing={1} alignItems="center" sx={{ cursor: "pointer" }} onClick={(e) => {
                                          e.stopPropagation();
                                          redirecionarParaNovaConsulta(dataCompleta);
                                       }}>
                                          <AddCircleOutlineIcon sx={{ fontSize: 28, color: Colors.verdeforte, opacity: 0.6 }} />
                                          <Typography variant="body1" color="textPrimary">
                                             Nova Consulta
                                          </Typography>
                                       </Stack>
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
