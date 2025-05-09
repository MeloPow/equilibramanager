// src/pages/Agenda/calendario.tsx
import React, { useState, useMemo } from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { addDays, subDays, format, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Colors } from '../../styles/Colors';

interface Sessao {
   id: number;
   paciente: number;
   data_hora: string;
   status: string;
   observacoes?: string;
   paciente_nome: string;
}

const horarios = Array.from({ length: 14 }, (_, i) => `${i + 6}:00`);

export default function Calendario() {
   const [startDate, setStartDate] = useState<Date>(startOfDay(new Date()));
   const diasMostrados = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(startDate, i)), [startDate]);

   const eventos: Sessao[] = [
      {
         id: 1,
         paciente: 1,
         data_hora: new Date().setHours(9, 0, 0, 0).toString(),
         status: 'agendada',
         paciente_nome: 'João Silva'
      },
      {
         id: 2,
         paciente: 2,
         data_hora: addDays(new Date(), 1).setHours(10, 0, 0, 0).toString(),
         status: 'realizada',
         paciente_nome: 'Maria Souza'
      },
   ];

   const mapaSessoes = useMemo(() => {
      const mapa: { [key: string]: Sessao[] } = {};
      eventos.forEach(sessao => {
         const data = new Date(Number(sessao.data_hora));
         const dia = data.toDateString();
         const hora = `${data.getHours()}:00`;
         const chave = `${hora}-${dia}`;
         if (!mapa[chave]) mapa[chave] = [];
         mapa[chave].push(sessao);
      });
      return mapa;
   }, [eventos]);

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

   const rangeDiasTexto = `${format(diasMostrados[0], 'dd/MM')} ~ ${format(diasMostrados[6], 'dd/MM')}`;

   return (
      <Box sx={{ p: 2 }}>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Button onClick={handleAnterior}>← Anterior</Button>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: Colors.roxoclaro }}>{rangeDiasTexto}</Typography>
            <Button onClick={handleProximo}>Próximo →</Button>
         </Box>

         <Box sx={{ overflowX: 'auto', border: '1px solid #ccc' }}>
            <Box sx={{ minWidth: 1000 }}>
               <Grid container>
                  <Grid item xs={1} sx={{ backgroundColor: '#eee', borderRight: '1px solid #ccc' }}>
                     <Box sx={{ p: 1, fontWeight: 'bold', textAlign: 'center' }}>Hora</Box>
                  </Grid>
                  {diasMostrados.map((dia, index) => (
                     <Grid item xs key={index} sx={{ backgroundColor: '#eee', borderRight: '1px solid #ccc' }}>
                        <Box sx={{ p: 1, fontWeight: 'bold', textAlign: 'center' }}>{format(dia, 'EEE - dd/MM', ptBR)}</Box>
                     </Grid>
                  ))}
               </Grid>

               {horarios.map((hora, rowIndex) => (
                  <Grid container key={rowIndex}>
                     <Grid item xs={1} sx={{ borderTop: '1px solid #ccc', borderRight: '1px solid #ccc' }}>
                        <Box sx={{ p: 1, textAlign: 'center' }}>{hora}</Box>
                     </Grid>
                     {diasMostrados.map((dia, colIndex) => {
                        const chave = `${hora}-${dia.toDateString()}`;
                        const sessoesNaCelula = mapaSessoes[chave] || [];
                        return (
                           <Grid item xs key={colIndex} sx={{ borderTop: '1px solid #ccc', borderRight: '1px solid #ccc', height: 50 }}>
                              <Box sx={{ p: 0.5 }}>
                                 {sessoesNaCelula.map(sessao => (
                                    <Paper key={sessao.id} sx={{ backgroundColor: Colors.roxoclaro, color: Colors.branco, p: 0.5, mb: 0.5 }}>
                                       <Typography sx={{ fontSize: 11, fontWeight: 'bold' }}>{sessao.paciente_nome}</Typography>
                                       <Typography sx={{ fontSize: 10, fontStyle: 'italic' }}>{sessao.status}</Typography>
                                    </Paper>
                                 ))}
                              </Box>
                           </Grid>
                        );
                     })}
                  </Grid>
               ))}
            </Box>
         </Box>
      </Box>
   );
}