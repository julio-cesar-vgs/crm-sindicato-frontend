// src/pages/Interacoes/InteracoesList.js
import React, { useEffect, useState } from 'react';
import { interacoes } from '../../api';
import { Link } from 'react-router-dom';

function InteracoesList() {
    const [listaInteracoes, setListaInteracoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInteracoes = async () => {
            try {
                const data = await interacoes.getInteracoes();
                setListaInteracoes(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchInteracoes();
    }, []);

    if (loading) {
        return (
            <p className="text-center py-10 text-gray-600">
                Carregando interações...
            </p>
        );
    }

    if (error) {
        return (
            <p className="text-red-500 text-center py-10">
                Ocorreu um erro ao carregar as interações: {error.message || 'Erro desconhecido'}
            </p>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Lista de Interações</h2>
                <Link
                    to="/interacoes/new"
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
                >
                    Nova Interação
                </Link>
            </div>

            {listaInteracoes.length === 0 ? (
                <p className="text-center text-gray-600">Nenhuma interação encontrada.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            {['ID Interação', 'ID Associado', 'Tipo de Interação', 'Data', 'Descrição'].map((coluna) => (
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
                        {listaInteracoes.map(
                            ({ id_interacao, id_associado, tipo_interacao, data_interacao, descricao }) => (
                                <tr key={id_interacao} className="even:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {id_interacao}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {id_associado}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {tipo_interacao}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {data_interacao
                                            ? new Date(data_interacao).toLocaleDateString()
                                            : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {descricao || 'N/A'}
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

export default InteracoesList;
