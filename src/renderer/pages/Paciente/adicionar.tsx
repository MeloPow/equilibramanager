// src/pages/Paciente/adicionar.tsx
import React, { useState } from 'react';
import {
    Button,
    MenuItem,
    TextField,
    Select,
    InputLabel,
    FormControl,
    Snackbar,
    Alert,
} from '@mui/material';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { salvarPaciente } from '../../services/pacienteService';
import './PacienteModule.css';
import { Colors } from '../../styles/Colors';
import background from '../../../assets/images/background3.png'
import FormularioAdd from "../../components/FormularioCard"
import BotaoVoltar from '../../components/VoltarGlobal'
import DataOtimizada from '../../components/XPDateField';
import CPFotimizado from '../../components/XPCPFField';
import TelefoneOtimizado from '../../components/XPPhoneField'

export default function AdicionarPaciente() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [sexo, setSexo] = useState<'Masculino' | 'Feminino' | 'Outro'>('Masculino');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    const [profissao, setProfissao] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');
    const [observacoes, setObservacoes] = useState('');

    const [religiao, setReligiao] = useState('');
    const [escolaridade, setEscolaridade] = useState('');
    const [tipoAtendimento, setTipoAtendimento] = useState<'particular' | 'convenio' | 'servico_social'>('particular');

    const [status, setStatus] = useState<'ativo' | 'pausado' | 'finalizado'>('ativo');
    type ContextType = { drawerOpen: boolean };
    const { drawerOpen } = useOutletContext<ContextType>();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const converterDataParaFormatoISO = (data: string) => {
        const [dia, mes, ano] = data.split('/');
        if (!dia || !mes || !ano) return null;
        return `${ano}-${mes}-${dia}`;
    };

    const handleSalvar = async () => {
        if (!nome || !telefone || !cpf || !dataNascimento || !sexo) {
            setSnackbarMessage('Preencha todos os campos obrigatórios');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        const dataFormatada = converterDataParaFormatoISO(dataNascimento);
        if (!dataFormatada) {
            setSnackbarMessage('Formato de data inválido');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        const novoPaciente = {
            nome_completo: nome,
            telefone,
            cpf,
            data_nascimento: dataFormatada,
            sexo,
            email: email || undefined,
            endereco: endereco || undefined,
            profissao: profissao || undefined,
            estado_civil: estadoCivil || undefined,
            observacoes: observacoes || undefined,
            religiao: religiao || undefined,
            escolaridade: escolaridade || undefined,
            tipo_atendimento: tipoAtendimento,
            status,
        };

        try {
            console.log(novoPaciente);
            await salvarPaciente(novoPaciente);
            setSnackbarMessage('Paciente cadastrado com sucesso');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setTimeout(() => navigate('/paciente'), 1500);
        } catch (error) {
            console.error('Erro ao cadastrar paciente:', error);
            setSnackbarMessage('Erro ao cadastrar paciente');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };
    return (
        <div
            className="paciente-background"
            style={{ backgroundImage: `url(${background})`, padding: '40px' }}
        >
            <BotaoVoltar drawerOpen={drawerOpen} />
            <FormularioAdd>
                <TextField placeholder="Nome completo *" value={nome} onChange={(e) => setNome(e.target.value)} fullWidth sx={{ mb: 2 }} />

                <DataOtimizada
                    placeholder="Data de nascimento (DD/MM/AAAA) *"
                    value={dataNascimento}
                    onChange={setDataNascimento}
                    fullWidth
                    sx={{ mb: 2 }}
                />


                <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel id="sexo-label" shrink>Sexo *</InputLabel>
                    <Select
                        labelId="sexo-label"
                        id="sexo"
                        value={sexo}
                        onChange={(e) => setSexo(e.target.value as 'Masculino' | 'Feminino' | 'Outro')}
                        label="Sexo *"
                    >
                        <MenuItem value="Masculino">Masculino</MenuItem>
                        <MenuItem value="Feminino">Feminino</MenuItem>
                        <MenuItem value="Outro">Outro</MenuItem>
                    </Select>
                </FormControl>

                <CPFotimizado
                    placeholder="CPF *"
                    value={cpf}
                    onChange={setCpf}
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <TelefoneOtimizado
                    placeholder="Telefone *"
                    value={telefone}
                    onChange={setTelefone}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel id="tipo-atendimento-label" shrink>Tipo de Atendimento *</InputLabel>
                    <Select
                        labelId="tipo-atendimento-label"
                        id="tipoAtendimento"
                        value={tipoAtendimento}
                        onChange={(e) => setTipoAtendimento(e.target.value as 'particular' | 'convenio' | 'servico_social')}
                        label="Tipo de Atendimento *"
                    >
                        <MenuItem value="particular">Particular</MenuItem>
                        <MenuItem value="convenio">Convênio</MenuItem>
                        <MenuItem value="servico_social">Serviço Social</MenuItem>
                    </Select>
                </FormControl>

                <TextField placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth sx={{ mb: 2 }} />
                <TextField placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} fullWidth sx={{ mb: 2 }} />
                <TextField placeholder="Profissão" value={profissao} onChange={(e) => setProfissao(e.target.value)} fullWidth sx={{ mb: 2 }} />
                <TextField placeholder="Religião" value={religiao} onChange={(e) => setReligiao(e.target.value)} fullWidth sx={{ mb: 2 }} />
                <TextField placeholder="Escolaridade" value={escolaridade} onChange={(e) => setEscolaridade(e.target.value)} fullWidth sx={{ mb: 2 }} />
                <TextField placeholder="Estado civil" value={estadoCivil} onChange={(e) => setEstadoCivil(e.target.value)} fullWidth sx={{ mb: 2 }} />
                <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel id="status-label" shrink>Status</InputLabel>
                    <Select
                        labelId="status-label"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as 'ativo' | 'pausado' | 'finalizado')}
                        label="Status"
                    >
                        <MenuItem value="ativo">Ativo</MenuItem>
                        <MenuItem value="pausado">Pausado</MenuItem>
                        <MenuItem value="finalizado">Finalizado</MenuItem>
                    </Select>
                </FormControl>
                <TextField placeholder="Observações" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} fullWidth multiline rows={3} sx={{ mb: 2 }} />

                <Button
                    onClick={handleSalvar}
                    fullWidth
                    sx={{
                        backgroundColor: Colors.azulelegante,
                        color: Colors.brancocinza,
                        padding: '14px',
                        fontSize: '1.1rem',
                        borderRadius: '6px',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        '&:hover': {
                            backgroundColor: Colors.azulmarin,
                        },
                    }}
                >
                    Salvar
                </Button>
            </FormularioAdd>

            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}
/* return (
     <div
         className="paciente-background"
         style={{ backgroundImage: `url(${background})` }}
     >
         <Box
             className="options-box"
             sx={{ width: '100%', maxWidth: 800, backgroundColor: '#ebeae490' }}
         >
             <Typography variant="h4" gutterBottom sx={{
                 backgroundColor: Colors.roxobom,
                 width: '100%',
                 padding: '12px',
                 borderRadius: '12px',
                 color: 'Window'
             }}>
                 Adicionar Paciente
             </Typography>

             <TextField label="Nome completo *" value={nome} onChange={(e) => setNome(e.target.value)} fullWidth />
             <TextField label="Data de nascimento (DD/MM/AAAA) *" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} fullWidth />

             <FormControl fullWidth>
                 <InputLabel id="sexo-label" sx={{ fontSize: '1.2rem' }}>Sexo *</InputLabel>
                 <Select
                     labelId="sexo-label"
                     id="sexo"
                     value={sexo}
                     onChange={(e) => setSexo(e.target.value as 'M' | 'F' | 'O')}
                     label="Sexo *"
                 >
                     <MenuItem value="M">Masculino</MenuItem>
                     <MenuItem value="F">Feminino</MenuItem>
                     <MenuItem value="O">Outro</MenuItem>
                 </Select>
             </FormControl>

             <FormControl fullWidth>
                 <InputLabel id="status-label" sx={{ fontSize: '1.2rem' }}>Status</InputLabel>
                 <Select
                     labelId="status-label"
                     id="status"
                     value={status}
                     onChange={(e) => setStatus(e.target.value as 'ativo' | 'pausado' | 'finalizado')}
                     label="Status"
                 >
                     <MenuItem value="ativo">Ativo</MenuItem>
                     <MenuItem value="pausado">Pausado</MenuItem>
                     <MenuItem value="finalizado">Finalizado</MenuItem>
                 </Select>
             </FormControl>

             <TextField label="CPF *" value={cpf} onChange={(e) => setCpf(e.target.value)} fullWidth />
             <TextField label="Telefone *" value={telefone} onChange={(e) => setTelefone(e.target.value)} fullWidth />
             <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
             <TextField label="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} fullWidth />
             <TextField label="Profissão" value={profissao} onChange={(e) => setProfissao(e.target.value)} fullWidth />
             <TextField label="Estado civil" value={estadoCivil} onChange={(e) => setEstadoCivil(e.target.value)} fullWidth />
             <TextField label="Observações" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} fullWidth multiline rows={4} />
             <Button variant="contained" color="primary" style={{ paddingInline: 300, paddingBlock: 20 }} onClick={handleSalvar}>Salvar</Button>
         </Box>
         <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar}>
             <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                 {snackbarMessage}
             </Alert>
         </Snackbar>
     </div>
 );*/
