// src/renderer/pages/Relatorio/index.tsx
import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormularioAdd from '../../components/forListaConsulta/FormularioCard';

const RelatorioIndex: React.FC = () => {
   const navigate = useNavigate();

   return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
         <FormularioAdd width={700}>
            <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
               Relatórios Psicológicos
            </Typography>

            <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }}>
               Escolha o tipo de relatório que deseja criar ou visualizar.
            </Typography>

            <Stack spacing={2}>
               <Button variant="contained" onClick={() => navigate('/relatorio/evolucao')}>
                  Criar Relatório de Evolução
               </Button>

               {/* Futuras opções */}
               <Button variant="outlined" disabled>
                  Criar Relatório Institucional (em breve)
               </Button>
               <Button variant="outlined" disabled>
                  Criar Laudo Psicológico (em breve)
               </Button>
            </Stack>
         </FormularioAdd>
      </Box>
   );
};

export default RelatorioIndex;
