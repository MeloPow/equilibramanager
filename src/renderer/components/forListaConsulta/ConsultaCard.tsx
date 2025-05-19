// src/renderer/components/ConsultaCard.tsx

import React from 'react';
import {
   Box, Paper, Typography, IconButton, Button, Collapse
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Consulta } from '../../../types/Consulta';

interface Props {
   consulta: Consulta;
   expandido: boolean;
   numeroConsulta: number;
   onToggleExpand: () => void;
   onAbrirModalConsulta: () => void;
   onEditar: () => void;
   onExcluir: () => void;
   onRelatorio: () => void;
}

const ConsultaCard: React.FC<Props> = ({
   consulta,
   expandido,
   numeroConsulta,
   onToggleExpand,
   onAbrirModalConsulta,
   onEditar,
   onExcluir,
   onRelatorio
}) => {
   const data = new Date(consulta.data_hora);
   const dataFormatada = data.toLocaleDateString('pt-BR');
   const horaFormatada = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

   const statusFormatado = consulta.status.charAt(0).toUpperCase() + consulta.status.slice(1);

   const titulo = () => {
      if (consulta.status.toLowerCase() === 'realizada') {
         return `🧑 ${consulta.paciente_nome} — Consulta nº ${numeroConsulta} — ${statusFormatado} em ${dataFormatada} às ${horaFormatada}`;
      } else if (consulta.status.toLowerCase() === 'agendada') {
         return `🧑 ${consulta.paciente_nome} — Consulta ${statusFormatado} para ${dataFormatada} às ${horaFormatada}`;
      } else {
         return `🧑 ${consulta.paciente_nome} — Consulta ${statusFormatado} de ${dataFormatada} às ${horaFormatada}`;
      }
   };

   return (
      <Paper sx={{ mb: 2, p: 2 }}>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}>
               {titulo()}
            </Typography>
            <IconButton onClick={onToggleExpand}>
               {expandido ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
         </Box>

         <Collapse in={expandido}>
            <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
               <Button size="small" onClick={onAbrirModalConsulta}>
                  👁️ Exibir detalhes
               </Button>
               <Button size="small" variant="outlined" onClick={onEditar}>
                  ✏️ Editar
               </Button>
               <Button size="small" variant="contained" color="error" onClick={onExcluir}>
                  ❌ Excluir
               </Button>
               <Button size="small" variant="outlined" onClick={onRelatorio}>
                  📄 Relatório de Evolução
               </Button>
            </Box>
         </Collapse>
      </Paper>
   );
};

export default ConsultaCard;