// src/pages/Participacoes/ParticipacoesForm.js
import React, { useState } from 'react';
import { participacoes } from '../../api'; // Importa as funções da API de participações
import { useNavigate } from 'react-router-dom';
// Remova a importação do CSS específico se usar apenas Tailwind


function ParticipacoesForm() {
    const navigate = useNavigate(); // Para redirecionar após salvar
    const [formData, setFormData] = useState({
        id_evento: '',
        id_associado: '',
        feedback: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Converte id_evento e id_associado para número se o backend esperar assim
        setFormData({
            ...formData,
            [name]: (name === 'id_evento' || name === 'id_associado') ? parseInt(value, 10) || '' : value // Converte para número, ou string vazia se não for um número válido
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validação básica (opcional, mas recomendada)
        if (!formData.id_evento || !formData.id_associado) {
            setError(new Error('ID do Evento e ID do Associado são obrigatórios.'));
            setLoading(false);
            return;
        }


        try {
            await participacoes.createParticipacao(formData);
            alert('Participação criada com sucesso!');
            navigate('/participacoes'); // Redireciona para a lista após salvar
        } catch (err) {
            setError(err);
            console.error('Erro ao criar participação:', err);
            alert('Ocorreu um erro ao criar a participação.');
        } finally {
            setLoading(false);
        }
    };


    if (error && !loading) {
        return <p className="text-center text-red-500">Ocorreu um erro ao carregar o formulário: {error.message}</p>;
    }


    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"> {/* Container/Card similar */}
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Nova Participação</h2> {/* Título similar */}
            {loading && !error && <p className="text-center text-gray-600">Criando...</p>} {/* Mensagem de criação similar */}
            {error && <p className="text-red-500 text-center">{error.message}</p>} {/* Mensagem de erro similar */}

            {(!loading || error) && ( // Só exibe o formulário se não estiver carregando ou se houver erro
                <form onSubmit={handleSubmit} className="space-y-4"> {/* Espaçamento entre os campos similar */}
                    <div>
                        <label htmlFor="id_evento" className="block text-gray-700 font-medium mb-1">ID do Evento:</label> {/* Rótulo similar */}
                        <input
                            type="number" // Usando type="number"
                            id="id_evento"
                            name="id_evento"
                            value={formData.id_evento}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Estilo de input similar
                        />
                    </div>
                    <div>
                        <label htmlFor="id_associado" className="block text-gray-700 font-medium mb-1">ID do Associado:</label> {/* Rótulo similar */}
                        <input
                            type="number" // Usando type="number"
                            id="id_associado"
                            name="id_associado"
                            value={formData.id_associado}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Estilo de input similar
                        />
                    </div>
                    <div>
                        <label htmlFor="feedback" className="block text-gray-700 font-medium mb-1">Feedback (Opcional):</label> {/* Rótulo similar */}
                        <textarea
                            id="feedback"
                            name="feedback"
                            value={formData.feedback}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Estilo de textarea similar
                        ></textarea>
                    </div>

                    <div className="flex items-center pt-4"> {/* Alinhamento dos botões similar */}
                        <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md disabled:opacity-50"> {/* Botão salvar similar */}
                            {loading ? 'Criando...' : 'Criar Participação'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default ParticipacoesForm;