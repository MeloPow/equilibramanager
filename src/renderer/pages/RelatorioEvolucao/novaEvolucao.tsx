// src/renderer/pages/Relatorio/novaEvolucao.tsx
import React, { useEffect, useState } from 'react';
import {
   Box, TextField, Typography, Button, CircularProgress
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RelatorioEvolucao } from '../../../types/RelatorioEvolucao';
import { criarRelatorioEvolucao, listarRelatoriosEvolucaoPorConsulta, atualizarRelatorioEvolucao } from '../../services/relatorioEvolucaoService';
import { listarTodasConsultas } from '../../services/consultaService';
import FormularioAdd from '../../components/forListaConsulta/FormularioCard';
import BotaoVoltar from '../../components/VoltarGlobal';
import background from '../../../assets/images/background3.png';

export default function NovaEvolucao() {
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();

   const [relatorio, setRelatorio] = useState<RelatorioEvolucao | null>(null);
   const [carregando, setCarregando] = useState(true);
   const [resumo, setResumo] = useState('');
   const [evolucao, setEvolucao] = useState('');
   const [plano, setPlano] = useState('');

   const consultaId = Number(searchParams.get('consultaId'));

   useEffect(() => {
      const carregarRelatorioExistente = async () => {
         try {
            const existentes = await listarRelatoriosEvolucaoPorConsulta(consultaId);
            if (existentes.length > 0) {
               const existente = existentes[0];
               setRelatorio(existente);
               setResumo(existente.resumo);
               setEvolucao(existente.evolucao);
               setPlano(existente.plano);
            } else {
               const consultas = await listarTodasConsultas();
               const consulta = consultas.find(c => c.id === consultaId);
               if (consulta) {
                  setRelatorio({
                     consulta_id: consulta.id!,
                     paciente_id: consulta.paciente,
                     data_sessao: consulta.data_hora,
                     resumo: '',
                     evolucao: '',
                     plano: ''
                  });
               }
            }
         } catch (e) {
            alert('Erro ao carregar relatório');
            console.error(e);
         } finally {
            setCarregando(false);
         }
      };

      carregarRelatorioExistente();
   }, [consultaId]);

   const handleSalvar = async () => {
      if (!relatorio) return;
      const dados: RelatorioEvolucao = {
         ...relatorio,
         resumo,
         evolucao,
         plano,
      };

      try {
         if (relatorio.id) {
            await atualizarRelatorioEvolucao(dados);
            alert('Relatório atualizado com sucesso!');
         } else {
            await criarRelatorioEvolucao(dados);
            alert('Relatório criado com sucesso!');
         }
         navigate(-1);
      } catch (e) {
         console.error(e);
         alert('Erro ao salvar relatório');
      }
   };

   if (carregando) {
      return <Box sx={{ mt: 8, textAlign: 'center' }}><CircularProgress /></Box>;
   }

   return (
      <div className="paciente-background" style={{ backgroundImage: `url(${background})`, padding: '40px' }}>
         <BotaoVoltar drawerOpen={false} />
         <FormularioAdd width={800}>
            <Typography variant="h5" fontWeight="bold">Relatório de Evolução</Typography>

            <TextField
               label="Resumo da Sessão"
               value={resumo}
               onChange={(e) => setResumo(e.target.value)}
               fullWidth
               multiline
               rows={3}
               sx={{ mb: 2 }}
            />
            <TextField
               label="Evolução e Observações"
               value={evolucao}
               onChange={(e) => setEvolucao(e.target.value)}
               fullWidth
               multiline
               rows={4}
               sx={{ mb: 2 }}
            />
            <TextField
               label="Plano para Próxima Sessão"
               value={plano}
               onChange={(e) => setPlano(e.target.value)}
               fullWidth
               multiline
               rows={3}
               sx={{ mb: 2 }}
            />

            <Button
               onClick={handleSalvar}
               variant="contained"
               color="primary"
               fullWidth
               sx={{ mt: 2, py: 1.5, fontWeight: 'bold' }}
            >
               {relatorio?.id ? 'Salvar Alterações' : 'Criar Relatório'}
            </Button>
         </FormularioAdd>
      </div>
   );
}
