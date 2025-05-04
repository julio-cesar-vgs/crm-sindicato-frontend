// src/pages/Eventos/EventosForm.js
import React, {useEffect, useState} from 'react';
import {eventos} from '../../api';
import {useNavigate, useParams} from 'react-router-dom';

// Remova a importação do CSS específico de eventos se você usará apenas Tailwind


function EventosForm() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome_evento: '', data_evento: '', local_evento: '', descricao: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchEvento = async () => {
                try {
                    const data = await eventos.getEventoById(id);
                    if (data.data_evento) {
                        data.data_evento = new Date(data.data_evento).toISOString().split('T')[0];
                    }
                    setFormData(data);
                } catch (err) {
                    setError(err);
                }
            };
            fetchEvento();
        }
    }, [id]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (id) {
                await eventos.updateEvento(id, formData);
                alert('Evento atualizado com sucesso!');
            } else {
                await eventos.createEvento(formData);
                alert('Evento criado com sucesso!');
            }
            navigate('/eventos');
        } catch (err) {
            setError(err);
            console.error('Erro ao salvar evento:', err);
            alert('Ocorreu um erro ao salvar o evento.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Tem certeza que deseja excluir este evento?')) {
            setLoading(true);
            setError(null);
            try {
                await eventos.deleteEvento(id);
                alert('Evento excluído com sucesso!');
                navigate('/eventos');
            } catch (err) {
                setError(err);
                console.error('Erro ao excluir evento:', err);
                alert('Ocorreu um erro ao excluir o evento.');
            } finally {
                setLoading(false);
            }
        }
    }


    if (error && !loading && !id) {
        return <p className="text-center text-red-500">Ocorreu um erro ao carregar o formulário: {error.message}</p>;
    }
    if (error && !loading && id && !formData.id_evento) {
        return <p className="text-center text-gray-600">Carregando dados do evento para edição...</p>; // Mensagem de carregamento similar
    }


    return (<div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"> {/* Container/Card similar */}
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">{id ? 'Editar Evento' : 'Novo Evento'}</h2> {/* Título similar */}
            {loading && !error &&
                <p className="text-center text-gray-600">Salvando...</p>} {/* Mensagem de salvamento similar */}
            {error && <p className="text-red-500 text-center">{error.message}</p>} {/* Mensagem de erro similar */}

            {(!loading || error) && ( // Só exibe o formulário se não estiver carregando ou se houver erro
                <form onSubmit={handleSubmit} className="space-y-4"> {/* Espaçamento entre os campos similar */}
                    <div>
                        <label htmlFor="nome_evento" className="block text-gray-700 font-medium mb-1">Nome do
                            Evento:</label> {/* Rótulo similar */}
                        <input
                            type="text"
                            id="nome_evento"
                            name="nome_evento"
                            value={formData.nome_evento}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Estilo de input similar
                        />
                    </div>
                    <div>
                        <label htmlFor="data_evento" className="block text-gray-700 font-medium mb-1">Data do
                            Evento:</label> {/* Rótulo similar */}
                        <input
                            type="date"
                            id="data_evento"
                            name="data_evento"
                            value={formData.data_evento}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Estilo de input similar
                        />
                    </div>
                    <div>
                        <label htmlFor="local_evento" className="block text-gray-700 font-medium mb-1">Local do
                            Evento:</label> {/* Rótulo similar */}
                        <input
                            type="text"
                            id="local_evento"
                            name="local_evento"
                            value={formData.local_evento}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Estilo de input similar
                        />
                    </div>
                    <div>
                        <label htmlFor="descricao"
                               className="block text-gray-700 font-medium mb-1">Descrição:</label> {/* Rótulo similar */}
                        <textarea
                            id="descricao"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Estilo de textarea similar
                        ></textarea>
                    </div>

                    <div
                        className="flex items-center space-x-4 pt-4"> {/* Espaçamento e alinhamento dos botões similar */}
                        <button type="submit" disabled={loading}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md disabled:opacity-50"> {/* Botão salvar similar */}
                            {loading ? (id ? 'Atualizando...' : 'Criando...') : 'Salvar'}
                        </button>
                        {id && ( // Botão de excluir aparece apenas na edição
                            <button type="button" onClick={handleDelete} disabled={loading}
                                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-md disabled:opacity-50"> {/* Botão excluir similar */}
                                {loading ? 'Excluindo...' : 'Excluir'}
                            </button>)}
                    </div>
                </form>)}
        </div>);
}

export default EventosForm;