// src/App.tsx
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Splash from './renderer/pages/Splash';
import Painel from './renderer/pages/Painel';
import Paciente from './renderer/pages/Paciente';
import Agenda from './renderer/pages/Agenda';
import MainLayout from './renderer/layouts/MainLayout';
import AdicionarPaciente from './renderer/pages/Paciente/adicionar';
import ListarPacientes from './renderer/pages/Paciente/listar';
import EditarPaciente from './renderer/pages/Paciente/editar';

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
                    <Route path="/agenda" element={<Agenda />} />
                    <Route path="/paciente/adicionar" element={<AdicionarPaciente />} />
                    <Route path="/paciente/listar" element={<ListarPacientes />} />
                    <Route path="/paciente/editar" element={<EditarPaciente />} />

                </Route>
            </Routes>
        </Router>
    );
}
