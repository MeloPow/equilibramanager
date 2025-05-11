// src/renderer/pages/Consulta/listarConsultas.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { Consulta } from '../../../types/Consulta';
import { listarTodasConsultas, deletarConsulta } from '../../services/consultaService';
import { useNavigate } from 'react-router-dom';
import background from '../../../assets/images/background3.png';
import { Colors } from '../../styles/Colors';
import Tooltip from '@mui/material/Tooltip';

export default function ListarConsultas() {
   const [consultas, setConsultas] = useState<Consulta[]>([]);
   const navigate = useNavigate();

   const carregarConsultas = async () => {
      try {
         const resultado = await listarTodasConsultas();
         setConsultas(resultado);
      } catch (error) {
         alert('Erro ao carregar consultas');
         console.error(error);
      }
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

   useEffect(() => {
      carregarConsultas();
   }, []);

   return (
      <div className="paciente-background" style={{ backgroundImage: `url(${background})` }}>
         <Box sx={{ p: 20 }}>
            <Button variant="outlined" onClick={() => navigate('/Agenda')}>↩ Voltar para agenda</Button>

            <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>📚 Consultas cadastradas</Typography>

            {consultas.length === 0 && <Typography>Nenhuma consulta encontrada.</Typography>}

            {consultas.map(consulta => (
               <Paper key={consulta.id} sx={{ p: 2, m: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                     <Tooltip title={consulta.paciente_nome}>
                        <Typography
                           sx={{
                              fontSize: 18,
                              fontWeight: 'bold',
                              color: Colors.roxobom,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxWidth: '300px', // ou defina '300px' se quiser fixo
                              cursor: 'pointer',
                           }}
                        >
                           {consulta.paciente_nome}
                        </Typography>
                     </Tooltip>
                     <Typography variant="body2">🕒 {new Date(consulta.data_hora).toLocaleString('pt-BR')}</Typography>
                     <Typography variant="body2">📌 Status: {consulta.status}</Typography>
                  </Box>
                  <Button variant="contained" color="error" onClick={() => handleExcluir(consulta.id)}>Excluir</Button>
               </Paper>
            ))}
         </Box>
      </div>
   );
}
