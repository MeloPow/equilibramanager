// src/pages/Painel.tsx
import React from 'react';
import './PainelModule.css';
import background from '../../../assets/images/background3.png';

export default function Painel() {
    return (
        <div className = "background" style={{ backgroundImage: `url(${background})` }}>
            <div className="container">
                <h1 className="title">Bem-vindo ao Equilibra Manager</h1>
                <p className="subtitle">Resumo da clínica e sessões.</p>
            </div>
        </div>
    );
}
