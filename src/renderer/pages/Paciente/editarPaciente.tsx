import React, { useEffect, useState } from 'react';
import {
    Button, TextField, Typography, Snackbar, Alert, Box,
    Select,
    MenuItem,
    InputLabel,
    FormControl
} from '@mui/material';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import { buscarPacientePorId, atualizarPaciente } from '../../services/pacienteService';
import { Paciente } from '../../../types/Paciente';
import './PacienteModule.css';
import background from '../../../assets/images/background3.png';
import FormularioBox from '../../components/FormularioGlobal';
import CPFotimizado from '../../components/forNewEditPaciente/XPCPFField';
import TelefoneOtimizado from '../../components/forNewEditPaciente/XPPhoneField';
import DataOtimizada from '../../components/forNewEditPaciente/XPDateField';
import BotaoVoltar from '../../components/VoltarGlobal';
import { formatarDataParaBr, converterDataParaISO } from '../../utils/formatarData';

export default function EditarPaciente() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = Number(searchParams.get('id'));

    const [paciente, setPaciente] = useState<Paciente | null>(null);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState(false);

    useEffect(() => {
        const carregarPaciente = async () => {
            try {
                const data = await buscarPacientePorId(id);
                data.data_nascimento = formatarDataParaBr(data.data_nascimento);
                setPaciente(data);
            } catch (error) {
                setErro('Erro ao carregar paciente');
            }
        };
        carregarPaciente();
    }, [id]);

    const handleAtualizar = async () => {
        try {
            if (paciente) {
                const pacienteAtualizado = {
                    ...paciente,
                    data_nascimento: converterDataParaISO(paciente.data_nascimento)
                };
                await atualizarPaciente(pacienteAtualizado);
                setSucesso(true);
                setTimeout(() => navigate('/paciente/listarpacientes?reload=' + Date.now()), 1500);
            }
        } catch {
            setErro('Erro ao atualizar paciente');
        }
    };

    const handleChange = (e: React.ChangeEvent<any>) => {
        if (paciente) {
            setPaciente({ ...paciente, [e.target.name || e.target.id]: e.target.value });
        }
    };

    type ContextType = { drawerOpen: boolean };
    const { drawerOpen } = useOutletContext<ContextType>();

    return (
        <div
            className="paciente-background"
            style={{ backgroundImage: `url(${background})`, padding: '40px' }}
        >
            <BotaoVoltar drawerOpen={drawerOpen} />
            {paciente && (
                <FormularioBox>
                    <TextField
                        name="nome_completo"
                        label="Nome completo"
                        value={paciente.nome_completo}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />

                    <DataOtimizada
                        placeholder="Data de nascimento (DD/MM/AAAA) *"
                        value={paciente.data_nascimento}
                        onChange={(val) => setPaciente({ ...paciente, data_nascimento: val })}
                        fullWidth
                        sx={{ mb: 2 }}
                    />

                    <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                        <InputLabel id="sexo-label" shrink>Sexo *</InputLabel>
                        <Select
                            labelId="sexo-label"
                            id="sexo"
                            value={paciente.sexo}
                            onChange={(e) => setPaciente({ ...paciente, sexo: e.target.value as 'Masculino' | 'Feminino' | 'Outro' })}
                            label="Sexo *"
                        >
                            <MenuItem value="Masculino">Masculino</MenuItem>
                            <MenuItem value="Feminino">Feminino</MenuItem>
                            <MenuItem value="Outro">Outro</MenuItem>
                        </Select>
                    </FormControl>

                    <CPFotimizado
                        label="CPF"
                        value={paciente.cpf}
                        onChange={(val) => setPaciente({ ...paciente, cpf: val })}
                        fullWidth
                        sx={{ mb: 2 }}
                    />

                    <TelefoneOtimizado
                        label="Telefone"
                        value={paciente.telefone}
                        onChange={(val) => setPaciente({ ...paciente, telefone: val })}
                        fullWidth
                        sx={{ mb: 2 }}
                    />

                    <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                        <InputLabel id="tipo-atendimento-label" shrink>Tipo de Atendimento</InputLabel>
                        <Select
                            labelId="tipo-atendimento-label"
                            id="tipo_atendimento"
                            value={paciente.tipo_atendimento}
                            onChange={(e) => setPaciente({ ...paciente, tipo_atendimento: e.target.value as Paciente['tipo_atendimento'] })}
                            label="Tipo de Atendimento"
                        >
                            <MenuItem value="particular">Particular</MenuItem>
                            <MenuItem value="convenio">Convênio</MenuItem>
                            <MenuItem value="servico_social">Serviço Social</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField name="email" label="Email" value={paciente.email || ''} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
                    <TextField name="endereco" label="Endereço" value={paciente.endereco || ''} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
                    <TextField name="profissao" label="Profissão" value={paciente.profissao || ''} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
                    <TextField name="estado_civil" label="Estado Civil" value={paciente.estado_civil || ''} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
                    <TextField name="religiao" label="Religião" value={paciente.religiao || ''} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
                    <TextField name="escolaridade" label="Escolaridade" value={paciente.escolaridade || ''} onChange={handleChange} fullWidth sx={{ mb: 2 }} />

                    <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                        <InputLabel id="status-label" shrink>Status</InputLabel>
                        <Select
                            labelId="status-label"
                            id="status"
                            value={paciente.status}
                            onChange={(e) => setPaciente({ ...paciente, status: e.target.value as Paciente['status'] })}
                            label="Status"
                        >
                            <MenuItem value="ativo">Ativo</MenuItem>
                            <MenuItem value="pausado">Pausado</MenuItem>
                            <MenuItem value="finalizado">Finalizado</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        name="observacoes"
                        label="Observações"
                        value={paciente.observacoes || ''}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={3}
                        sx={{ mb: 2 }}
                    />

                    <Button
                        onClick={handleAtualizar}
                        fullWidth
                        sx={{
                            backgroundColor: '#38c6e5',
                            color: 'white',
                            padding: '14px',
                            fontSize: '1.1rem',
                            borderRadius: '6px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#2bb2d0',
                            },
                        }}
                    >
                        💾 Salvar Alterações
                    </Button>

                </FormularioBox>
            )}
            <Snackbar open={!!erro} autoHideDuration={3000} onClose={() => setErro('')}>
                <Alert severity="error">{erro}</Alert>
            </Snackbar>

            <Snackbar open={sucesso} autoHideDuration={3000} onClose={() => setSucesso(false)}>
                <Alert severity="success">Paciente atualizado com sucesso!</Alert>
            </Snackbar>
        </div>
    );
}
