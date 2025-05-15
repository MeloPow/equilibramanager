// src/renderer/components/ModalDetalhesConsulta.tsx

import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { Consulta } from '../../types/Consulta';

interface Props {
   consulta: Consulta | null;
   open: boolean;
   onClose: () => void;
}

const ModalDetalhesConsulta: React.FC<Props> = ({ consulta, open, onClose }) => {
   if (!consulta) return null;

   return (
      <Modal open={open} onClose={onClose}>
         <Box sx={{ p: 4, bgcolor: '#fff', maxWidth: 600, mx: 'auto', mt: 10, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" fontWeight="bold">Detalhes da Consulta</Typography>
            <Typography><strong>Status:</strong> {consulta.status}</Typography>
            <Typography><strong>Tipo:</strong> {consulta.tipo}</Typography>
            <Typography><strong>Valor:</strong> R$ {consulta.valor?.toFixed(2)}</Typography>
            <Typography><strong>Foi paga?</strong> {consulta.foi_paga ? 'Sim' : 'Não'}</Typography>
            <Typography><strong>Forma de Pagamento:</strong> {consulta.forma_pagamento}</Typography>
            <Typography><strong>Data de Pagamento:</strong> {consulta.data_pagamento}</Typography>
            <Typography><strong>Motivo Cancelamento:</strong> {consulta.motivo_cancelamento}</Typography>
            <Typography><strong>Observações:</strong> {consulta.observacoes}</Typography>
         </Box>
      </Modal>
   );
};

export default ModalDetalhesConsulta;
