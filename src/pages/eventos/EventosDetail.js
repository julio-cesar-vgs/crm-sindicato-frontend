// src/pages/Eventos/EventosDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventos } from '../../api';
// Remova a importação do CSS específico de eventos se você usará apenas Tailwind


function EventosDetail() {
    const { id } = useParams();
    const [evento, setEvento] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const data = await eventos.getEventoById(id);
                setEvento(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchEvento();
    }, [id]);

    if (loading) {
        return <p className="text-center py-10 text-gray-600">Carregando evento...</p>; // Classes do AssociadosDetail
    }

    if (error) {
        return <p className="text-red-500 text-center py-10">Ocorreu um erro ao carregar o evento: {error.message}</p>; // Classes do AssociadosDetail
    }

    if (!evento) {
        return <p className="text-center py-10 text-gray-600">Evento não encontrado.</p>; // Classes do AssociadosDetail
    }

    const campos = [ // Definindo os campos a serem exibidos
        ['ID', evento.id_evento],
        ['Nome do Evento', evento.nome_evento],
        ['Data do Evento', evento.data_evento ? new Date(evento.data_evento).toLocaleDateString() : 'N/A'],
        ['Local do Evento', evento.local_evento],
        ['Descrição', evento.descricao],
    ];


    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"> {/* Container/Card similar */}
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Detalhes do Evento</h2> {/* Título similar */}
            <div className="space-y-3"> {/* Espaçamento vertical similar */}
                {campos.map(([label, val]) => (
                    <p key={label} className="text-gray-700"> {/* Parágrafo de detalhe similar */}
                        <span className="font-medium inline-block w-36 text-gray-800">{label}:</span> {/* Rótulo similar */}
                        <span>{val}</span> {/* Valor similar */}
                    </p>
                ))}
            </div>

            <div className="mt-6 flex justify-center space-x-4"> {/* Espaçamento e alinhamento dos botões similar */}
                <Link to={`/eventos/edit/${evento.id_evento}`} className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md"> {/* Botão editar similar */}
                    Editar
                </Link>
                <Link to="/eventos" className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md"> {/* Botão voltar similar */}
                    Voltar para a lista
                </Link>
            </div>
        </div>
    );
}

export default EventosDetail;