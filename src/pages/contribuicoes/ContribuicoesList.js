import React, { useEffect, useState } from 'react';
import { listContribuicoes } from '../api/contribuicoes';
import '../styles/layout.css'; // Assuming shared layout styles
import './contribuicoes.css'; // Specific styles for contribuicoes

function ContribuicoesList() {
    const [contribuicoes, setContribuicoes] = useState([]);

    useEffect(() => {
        fetchContribuicoes();
    }, []);

    const fetchContribuicoes = async () => {
        const data = await listContribuicoes();
        setContribuicoes(data);
    };

    return (
        <div className="list-container">
            <h2>Lista de Contribuições</h2>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID Associado</th>
                        <th>Valor</th>
                        <th>Data Pagamento</th>
                        <th>Status Pagamento</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {contribuicoes.map(contribuicao => (
                        <tr key={contribuicao.id_contribuicao}>
                            <td>{contribuicao.id_contribuicao}</td>
                            <td>{contribuicao.id_associado}</td>
                            <td>{contribuicao.valor}</td>
                            <td>{contribuicao.data_pagamento}</td>
                            <td>{contribuicao.status_pagamento}</td>
                            <td>
                                <button className="action-button view-button">Ver</button>
                                <button className="action-button edit-button">Editar</button>
                                <button className="action-button delete-button">Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ContribuicoesList;