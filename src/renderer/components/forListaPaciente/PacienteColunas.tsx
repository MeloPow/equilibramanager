// src/renderer/components/PacienteComps/ColunasPacientes.ts

import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Avatar, Typography, Chip, Button } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import { Paciente } from '../../../types/Paciente';
import { Theme } from '@mui/material/styles';

export function gerarColunas(
  theme: Theme,
  calcularIdade: (data: string) => number,
  abrirModal: (paciente: Paciente) => void
): GridColDef[] {
  return [
    {
      field: 'nome_completo',
      headerName: 'Nome Completo',
      flex: 2.0,
      sortable: false,
      resizable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            {params.row.nome_completo.charAt(0)}
          </Avatar>
          <Typography fontWeight={500} fontSize="1.2rem" fontFamily={'Montserrat'}>
            {params.row.nome_completo}
          </Typography>
        </Box>
      )
    },
    {
      field: 'idade',
      headerName: 'Idade',
      flex: 0.6,
      sortable: false,
      resizable: false,
      disableColumnMenu: false,
      renderCell: (params) => (
        <Typography fontSize="1.1rem" fontFamily={'Now'}>
          {calcularIdade(params.row.data_nascimento)} anos
        </Typography>
      )
    },
    {
      field: 'sexo',
      headerName: 'Sexo',
      flex: 0.6,
      sortable: false,
      resizable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const valor = params.value;
        const cores: Record<string, string> = {
          Masculino: '#1976d2',
          Feminino: '#d81b60',
          Outro: '#9c27b0'
        };
        return (
          <Chip
            label={valor}
            sx={{ backgroundColor: cores[valor] || '#aaa', color: '#fff', fontWeight: 500, mb: 10 }}
          />
        );
      }
    },
    {
      field: 'telefone',
      headerName: 'Telefone',
      flex: 1,
      sortable: false,
      resizable: false,
      disableColumnMenu: true
    },
    {
      field: 'tipo_atendimento',
      headerName: 'Atendimento',
      flex: 1.0,
      sortable: false,
      resizable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const tipo = params.value;
        const cores: Record<string, string> = {
          particular: '#4caf50',
          convenio: '#2196f3',
          servico_social: '#ff9800'
        };
        return (
          <Chip
            label={tipo.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
            sx={{
              backgroundColor: cores[tipo] || '#ccc',
              color: '#fff',
              fontWeight: 500,
              mb: 10
            }}
          />
        );
      }
    },
    {
      field: 'acoes',
      headerName: '',
      sortable: false,
      resizable: false,
      filterable: false,
      disableColumnMenu: true,
      flex: 0.9,
      align: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="outlined"
          startIcon={<BuildIcon />}
          onClick={() => abrirModal(params.row)}
          sx={{
            fontWeight: 600,
            borderRadius: 3,
            color: theme.palette.primary.dark,
            borderColor: theme.palette.primary.light,
            width: '180px',
            mb: 10
          }}
        >
          Ações
        </Button>
      )
    }
  ];
}
