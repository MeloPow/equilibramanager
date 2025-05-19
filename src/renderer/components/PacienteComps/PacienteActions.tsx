// src/renderer/components/PacienteActions.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Modal, Typography } from '@mui/material';
import { Paciente } from '../../../types/Paciente';
import PacienteModal from './PacienteModalDetalhes';

interface PacienteActionsProps {
   paciente: Paciente;
   onClose?: () => void;
}

export default function PacienteActions({ paciente, onClose }: PacienteActionsProps) {
   const navigate = useNavigate();
   const [modalAberto, setModalAberto] = useState(false);

   const navegar = (path: string) => {
      navigate(path);
      if (onClose) onClose();
   };

   const excluir = async () => {
      const confirmado = confirm(`Deseja excluir o paciente ${paciente.nome_completo}?`);
      if (confirmado) {
         await window.api.deletarPaciente(paciente.id);
         if (onClose) onClose();
         location.reload();
      }
   };

   return (
      <>
         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
            <Button variant="outlined" color="primary" onClick={() => setModalAberto(true)}>
               🔍 Exibir detalhes
            </Button>
            <Button variant="outlined" onClick={() => navegar(`/Paciente/editar?id=${paciente.id}`)}>
               ✏️ Editar
            </Button>
            <Button variant="outlined" onClick={() => navegar(`/Paciente/sessoes?id=${paciente.id}`)}>
               📆 Consultas
            </Button>
            <Button variant="outlined" onClick={() => navegar(`/Anamnese?id=${paciente.id}`)}>
               📄 Anamnese
            </Button>
            <Button variant="outlined" onClick={() => navegar(`/Financeiro?id=${paciente.id}`)}>
               💳 Financeiro
            </Button>
            <Button variant="outlined" onClick={() => navegar(`/Relatorios?id=${paciente.id}`)}>
               📊 Relatórios
            </Button>
            <Button variant="contained" color="error" onClick={excluir}>
               ❌ Apagar
            </Button>
         </Box>

         <PacienteModal
            open={modalAberto}
            onClose={() => setModalAberto(false)}
            paciente={paciente}
         />
      </>
   );
} 
