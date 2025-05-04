// src/pages/Eventos/EventosList.js
import React, {useEffect, useState} from 'react';
import {eventos} from '../../api';
import {Link} from 'react-router-dom';

function EventosList() {
    const [listaEventos, setListaEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const data = await eventos.getEventos();
                setListaEventos(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEventos();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este evento?')) {
            try {
                await eventos.deleteEvento(id);
                setListaEventos((prev) => prev.filter((e) => e.id_evento !== id));
            } catch (err) {
                console.error('Erro ao deletar evento:', err);
                alert('Ocorreu um erro ao deletar o evento.');
            }
        }
    };

    if (loading) {
        return (<p className="text-center py-10 text-gray-600">
                Carregando eventos...
            </p>);
    }

    if (error) {
        return (<p className="text-red-500 text-center py-10">
                Ocorreu um erro ao carregar os eventos: {error.message}
            </p>);
    }

    return (<div className="max-w-4xl mx-auto mt-10 p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Lista de Eventos</h2>
                <Link
                    to="/eventos/new"
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
                >
                    Novo Evento
                </Link>
            </div>

            {listaEventos.length === 0 ? (<p className="text-center text-gray-600">Nenhum evento encontrado.</p>) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            {['ID', 'Nome do Evento', 'Data', 'Local', 'Ações'].map((col) => (<th
                                    key={col}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {col}
                                </th>))}
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {listaEventos.map((evento) => (<tr key={evento.id_evento} className="even:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {evento.id_evento}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {evento.nome_evento}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {evento.data_evento ? new Date(evento.data_evento).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {evento.local_evento}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Link
                                        to={`/eventos/${evento.id_evento}`}
                                        className="text-blue-500 hover:underline mr-2"
                                    >
                                        Ver
                                    </Link>
                                    <Link
                                        to={`/eventos/edit/${evento.id_evento}`}
                                        className="text-yellow-500 hover:underline mr-2"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(evento.id_evento)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>)}
        </div>);
}

export default EventosList;
