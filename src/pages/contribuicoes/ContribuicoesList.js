// src/pages/Contribuicoes/ContribuicoesList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { contribuicoes } from '../../api';

function ContribuicoesList() {
    const [listaContribuicoes, setListaContribuicoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContribuicoes = async () => {
            try {
                const data = await contribuicoes.getContribuicoes();
                setListaContribuicoes(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchContribuicoes();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta contribuição?')) {
            try {
                await contribuicoes.deleteContribuicao(id);
                setListaContribuicoes((prev) =>
                    prev.filter((c) => c.id_contribuicao !== id)
                );
            } catch (err) {
                console.error('Erro ao deletar contribuição:', err);
                alert('Ocorreu um erro ao deletar a contribuição.');
            }
        }
    };

    if (loading) {
        return (
            <p className="text-center py-10 text-gray-600">
                Carregando contribuições...
            </p>
        );
    }

    if (error) {
        return (
            <p className="text-red-500 text-center py-10">
                Ocorreu um erro ao carregar as contribuições: {error.message || 'Erro desconhecido'}
            </p>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Lista de Contribuições
                </h2>
                <Link
                    to="/contribuicoes/new"
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
                >
                    Nova Contribuição
                </Link>
            </div>

            {listaContribuicoes.length === 0 ? (
                <p className="text-center text-gray-600">
                    Nenhuma contribuição encontrada.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            {[
                                'ID Contribuição',
                                'ID Associado',
                                'Valor',
                                'Data Pagamento',
                                'Status Pagamento',
                                'Ações',
                            ].map((coluna) => (
                                <th
                                    key={coluna}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {coluna}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {listaContribuicoes.map(
                            ({
                                 id_contribuicao,
                                 id_associado,
                                 valor,
                                 data_pagamento,
                                 status_pagamento,
                             }) => (
                                <tr key={id_contribuicao} className="even:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {id_contribuicao}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {id_associado}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {valor.toLocaleString('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {data_pagamento
                                            ? new Date(data_pagamento).toLocaleDateString()
                                            : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {status_pagamento || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link
                                            to={`/contribuicoes/${id_contribuicao}`}
                                            className="text-blue-500 hover:underline mr-2"
                                        >
                                            Ver
                                        </Link>
                                        <Link
                                            to={`/contribuicoes/edit/${id_contribuicao}`}
                                            className="text-yellow-500 hover:underline mr-2"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(id_contribuicao)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            )
                        )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ContribuicoesList;
