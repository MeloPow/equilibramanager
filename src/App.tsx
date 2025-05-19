// src/App.tsx
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Splash from './renderer/pages/Splash';
import Painel from './renderer/pages/Painel';
import Paciente from './renderer/pages/Paciente';
import MainLayout from './renderer/layouts/MainLayout';
import AdicionarPaciente from './renderer/pages/Paciente/novoPaciente';
import ListarPacientes from './renderer/pages/Paciente/listarPacientes';
import EditarPaciente from './renderer/pages/Paciente/editarPaciente';
import Calendario from './renderer/pages/Calendario';
import Consulta from './renderer/pages/Consulta';
import NovaConsulta from './renderer/pages/Consulta/novaConsulta';
import ListarConsultas from './renderer/pages/Consulta/listarConsultas';
import Relatorio from './renderer/pages/RelatorioEvolucao'
import NovaEvolucao from './renderer/pages/RelatorioEvolucao/novaEvolucao';
import EditarConsulta from './renderer/pages/Consulta/editarConsulta';

export default function App() {
    return (
        <Router>
            <Routes>
                {/* Splash isolado, sem layout */}
                <Route path="/" element={<Splash />} />

                {/* Rotas dentro do layout com Drawer */}
                <Route element={<MainLayout />}>
                    <Route path="/painel" element={<Painel />} />
                    <Route path="/paciente" element={<Paciente />} />
                    <Route path="/paciente/novopaciente" element={<AdicionarPaciente />} />
                    <Route path="/paciente/listarpacientes" element={<ListarPacientes />} />
                    <Route path="/paciente/editarpaciente" element={<EditarPaciente />} />
                    <Route path="/calendario" element={<Calendario />} />
                    <Route path="/consulta" element={<Consulta />} />
                    <Route path="/consulta/novaconsulta" element={<NovaConsulta />} />
                    <Route path="/consulta/listaconsultas" element={<ListarConsultas />} />
                    <Route path="/consulta/editarconsultas/:id" element={<EditarConsulta />} />
                    <Route path="/relatorio" element={<Relatorio />} />
                    <Route path="/relatorio/novaevolucao" element={<NovaEvolucao />} />

                </Route>
            </Routes>
        </Router>
    );
}
