// src/pages/Paciente/listar.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
    Box,
    Container,
    TextField,
    Typography,
    Paper,
    Collapse,
    Button,
    Snackbar,
    Alert,
    Modal,
} from '@mui/material';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import './PacienteModule.css';
import { Colors } from '../../styles/Colors';
import { Paciente } from '../../../types/Paciente';
import background from '../../../assets/images/background3.png';
import BotaoVoltar from '../../components/VoltarGlobal';

export default function ListarPacientes() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const statusFiltro = searchParams.get('status') || 'ativo';

    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [busca, setBusca] = useState('');
    const [expandido, setExpandido] = useState<number | null>(null);
    const [erro, setErro] = useState('');
    const [detalhesPaciente, setDetalhesPaciente] = useState<Paciente | null>(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarMais, setMostrarMais] = useState(false);

    useEffect(() => {
        const buscarPacientes = async () => {
            try {
                const lista = await window.api.listarPacientes();
                setPacientes(lista);
            } catch (err) {
                console.error('Erro ao buscar pacientes:', err);
                setErro('Erro ao carregar pacientes');
            }
        };
        buscarPacientes();
    }, []);

    const pacientesFiltrados = useMemo(
        () => pacientes.filter((p) => p.status === statusFiltro && p.nome_completo.toLowerCase().includes(busca.toLowerCase())),
        [pacientes, statusFiltro, busca]
    );

    const toggleExpandir = (id: number) => {
        setExpandido(expandido === id ? null : id);
    };

    type ContextType = { drawerOpen: boolean };
    const { drawerOpen } = useOutletContext<ContextType>();

    return (
        <div className="paciente-background" style={{ backgroundImage: `url(${background})` }}>
            <BotaoVoltar drawerOpen={drawerOpen} />
            <Container maxWidth="md">
                <Box className="options-box" sx={{ mt: 4, backgroundColor: '#ebeae470' }}>
                    <Typography variant="h4" gutterBottom sx={{
                        backgroundColor: Colors.roxobom,
                        width: '100%',
                        padding: '12px',
                        borderRadius: '12px',
                        color: 'white',
                        fontFamily: 'Segoe UI, sans-serif',
                        fontWeight: 600,
                        textAlign: 'center',
                        letterSpacing: 1,
                    }}>
                        Lista de pacientes {statusFiltro}s
                    </Typography>

                    <TextField
                        fullWidth
                        label="Buscar paciente por nome"
                        variant="outlined"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        sx={{
                            mb: 2,
                            input: { color: Colors.cinzaescuro },
                            label: { color: Colors.cinzaescuro },
                            borderColor: '#555',
                        }}
                    />

                    {pacientesFiltrados.map((item) => (
                        <Paper key={item.id} elevation={3} className="paciente-card">
                            <Box onClick={() => toggleExpandir(item.id)} sx={{ cursor: 'pointer' }}>
                                <Typography sx={{
                                    color: Colors.roxobom,
                                    fontSize: '1.8rem',
                                    fontWeight: 700,
                                    fontFamily: 'Montserrat, sans-serif'
                                }}>
                                    {item.nome_completo}
                                </Typography>
                                <Typography sx={{ fontSize: '1.2rem', color: '#333' }}>
                                    📞 {item.telefone}
                                </Typography>
                            </Box>
                            <Collapse in={expandido === item.id}>
                                <Box sx={{ mt: 2 }} className="options-box">
                                    <button className="option-button" onClick={() => {
                                        setDetalhesPaciente(item);
                                        setMostrarModal(true);
                                    }}>🔍 Exibir dados completos</button>

                                    <button className="option-button" onClick={() => navigate(`/Paciente/editar?id=${item.id}`)}>
                                        ✏️ Editar
                                    </button>

                                    <button className="option-button" onClick={() => navigate(`/Paciente/sessoes?id=${item.id}`)}>
                                        📆 Sessões
                                    </button>

                                    <button className="option-button" onClick={() => navigate(`/Anamnese?id=${item.id}`)}>
                                        📄 Anamnese
                                    </button>

                                    <button className="option-button" onClick={() => navigate(`/Financeiro?id=${item.id}`)}>
                                        💳 Financeiro
                                    </button>

                                    <button className="option-button" onClick={() => navigate(`/Relatorios?id=${item.id}`)}>
                                        📊 Relatórios
                                    </button>

                                    <button
                                        className="option-button"
                                        style={{ backgroundColor: '#c62828' }}
                                        onClick={async () => {
                                            if (confirm('Tem certeza que deseja apagar o paciente?')) {
                                                await window.api.deletarPaciente(item.id);
                                                setPacientes(pacientes.filter(p => p.id !== item.id));
                                            }
                                        }}
                                    >
                                        ❌ Apagar
                                    </button>
                                </Box>
                            </Collapse>
                        </Paper>
                    ))}
                </Box>
            </Container>

            <Snackbar open={!!erro} autoHideDuration={4000} onClose={() => setErro('')}>
                <Alert onClose={() => setErro('')} severity="error" sx={{ width: '100%' }}>
                    {erro}
                </Alert>
            </Snackbar>

            <Modal
                open={mostrarModal}
                onClose={() => setMostrarModal(false)}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box
                    sx={{
                        backgroundColor: 'white',
                        padding: 4,
                        borderRadius: 2,
                        maxWidth: 600,
                        width: '90%',
                        maxHeight: '80vh',
                        overflowY: 'auto'
                    }}
                >
                    {detalhesPaciente && (
                        <>
                            <Typography variant="h5" gutterBottom>Dados do Paciente</Typography>
                            <Typography><strong>Nome:</strong> {detalhesPaciente.nome_completo}</Typography>
                            <Typography><strong>CPF:</strong> {detalhesPaciente.cpf}</Typography>
                            <Typography><strong>Telefone:</strong> {detalhesPaciente.telefone}</Typography>
                            <Typography><strong>Email:</strong> {detalhesPaciente.email || '-'}</Typography>
                            <Typography><strong>Endereço:</strong> {detalhesPaciente.endereco || '-'}</Typography>
                            <Typography><strong>Profissão:</strong> {detalhesPaciente.profissao || '-'}</Typography>
                            <Typography><strong>Estado civil:</strong> {detalhesPaciente.estado_civil || '-'}</Typography>
                            <Typography><strong>Status:</strong> {detalhesPaciente.status}</Typography>
                            <Typography>
                                <strong>Observações:</strong>{' '}
                                <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                    {mostrarMais
                                        ? detalhesPaciente.observacoes
                                        : (detalhesPaciente.observacoes || '').slice(0, 300) + (detalhesPaciente.observacoes && detalhesPaciente.observacoes.length > 300 ? '...' : '')}
                                </span>
                            </Typography>

                            {detalhesPaciente.observacoes && detalhesPaciente.observacoes.length > 300 && (
                                <Button onClick={() => setMostrarMais(!mostrarMais)} sx={{ mt: 1 }}>
                                    {mostrarMais ? 'Mostrar menos' : 'Ler mais'}
                                </Button>
                            )}
                        </>
                    )}
                </Box>
            </Modal>
        </div>
    );
}
