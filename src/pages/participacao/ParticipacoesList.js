// src/pages/Participacoes/ParticipacoesList.js
import React, {useEffect, useState} from 'react';
import {participacoes} from '../../api';
import {Link} from 'react-router-dom';

function ParticipacoesList() {
    const [listaParticipacoes, setListaParticipacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParticipacoes = async () => {
            try {
                const data = await participacoes.getParticipacoes();
                setListaParticipacoes(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchParticipacoes();
    }, []);

    if (loading) {
        return (<p className="text-center py-10 text-gray-600">
                Carregando participações...
            </p>);
    }

    if (error) {
        return (<p className="text-red-500 text-center py-10">
                Ocorreu um erro ao carregar as participações: {error.message}
            </p>);
    }

    return (<div className="max-w-4xl mx-auto mt-10 p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Lista de Participações</h2>
                <Link
                    to="/participacoes/new"
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
                >
                    Nova Participação
                </Link>
            </div>

            {listaParticipacoes.length === 0 ? (
                <p className="text-center text-gray-600">Nenhuma participação encontrada.</p>) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            {['ID Participação', 'ID Evento', 'ID Associado', 'Feedback'].map((col) => (<th
                                    key={col}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {col}
                                </th>))}
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {listaParticipacoes.map((participacao) => (
                            <tr key={participacao.id_participacao} className="even:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {participacao.id_participacao}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {participacao.id_evento}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {participacao.id_associado}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {participacao.feedback || 'N/A'}
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>)}
        </div>);
}

export default ParticipacoesList;
