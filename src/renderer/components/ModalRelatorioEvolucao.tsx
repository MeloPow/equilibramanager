// src/renderer/components/ModalRelatorioEvolucao.tsx

import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { RelatorioEvolucao } from '../../types/RelatorioEvolucao';
import { useNavigate } from 'react-router-dom';

interface Props {
   relatorio: RelatorioEvolucao | null;
   open: boolean;
   onClose: () => void;
   onExcluir: (id: number) => void;
   numeroConsulta?: number;
   nomePaciente?: string;
   dataHoraConsulta?: string;
}

const ModalRelatorioEvolucao: React.FC<Props> = ({
   relatorio,
   open,
   onClose,
   onExcluir,
   numeroConsulta,
   nomePaciente,
   dataHoraConsulta
}) => {
   const navigate = useNavigate();
   if (!relatorio) return null;

   const data = dataHoraConsulta ? new Date(dataHoraConsulta) : null;
   const dataFormatada = data ? data.toLocaleDateString('pt-BR') : '';
   const horaFormatada = data ? data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '';

   return (
      <Modal open={open} onClose={onClose}>
         <Box sx={{ p: 4, bgcolor: '#fff', maxWidth: 600, mx: 'auto', mt: 10, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" fontWeight="bold">Relatório de Evolução</Typography>
            {numeroConsulta && nomePaciente && data && (
               <Typography sx={{ fontStyle: 'italic', color: 'gray' }}>
                  Consulta nº {numeroConsulta} de {nomePaciente} — Realizada em {dataFormatada} às {horaFormatada}
               </Typography>
            )}

            <Typography><strong>Resumo:</strong> {relatorio.resumo}</Typography>
            <Typography><strong>Evolução:</strong> {relatorio.evolucao}</Typography>
            <Typography><strong>Plano:</strong> {relatorio.plano}</Typography>

            <Button variant="contained" color="primary" onClick={() => window.print()}>
               📄 Gerar PDF
            </Button>
            <Button variant="outlined" onClick={() => navigate(`/Relatorio/evolucao?consultaId=${relatorio.consulta_id}`)}>
               ✏️ Editar Relatório
            </Button>
            <Button
               variant="contained"
               color="error"
               onClick={() => {
                  if (confirm('Deseja excluir o relatório?')) {
                     onExcluir(relatorio.id);
                  }
               }}
            >
               ❌ Excluir Relatório
            </Button>
         </Box>
      </Modal>
   );
};

export default ModalRelatorioEvolucao;
