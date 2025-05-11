// src/pages/Interacoes/InteracoesForm.js
import React, { useState } from 'react';
import { interacoes } from '../../api'; // Importa as funções da API de interações
import { useNavigate } from 'react-router-dom';
// Não precisamos de um arquivo CSS específico se usar apenas Tailwind


function InteracoesForm() {
  const navigate = useNavigate(); // Para redirecionar após salvar
  const [formData, setFormData] = useState({
    id_associado: '',
    tipo_interacao: '',
    data_interacao: '', // Pode ser string no formato YYYY-MM-DD
    descricao: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Converte id_associado para número se o backend esperar assim
    setFormData({
      ...formData,
      [name]: (name === 'id_associado') ? parseInt(value, 10) || '' : value // Converte para número, ou string vazia se não for um número válido
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validação básica (opcional, mas recomendada)
    if (!formData.id_associado || !formData.tipo_interacao) {
      setError(new Error('ID do Associado e Tipo de Interação são obrigatórios.'));
      setLoading(false);
      return;
    }

    // Formata a data para o formato esperado pela API, se necessário
    const dataParaEnviar = {
      ...formData,
      // Se data_interacao for um campo de data, pode precisar de formatação
      // Ex: data_interacao: formData.data_interacao ? new Date(formData.data_interacao).toISOString() : null,
    };


    try {
      await interacoes.createInteracao(dataParaEnviar);
      alert('Interação criada com sucesso!');
      navigate('/interacoes'); // Redireciona para a lista após salvar
    } catch (err) {
      setError(err);
      console.error('Erro ao criar interação:', err);
      alert('Ocorreu um erro ao criar a interação.');
    } finally {
      setLoading(false);
    }
  };


  if (error && !loading) {
    return <p className="text-center text-red-500">Ocorreu um erro ao carregar o formulário: {error.message}</p>;
  }


  return (
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"> {/* Container/Card similar */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Nova Interação</h2> {/* Título similar */}
        {loading && !error && <p className="text-center text-gray-600">Criando...</p>} {/* Mensagem de criação similar */}
        {error && <p className="text-red-500 text-center">{error.message}</p>} {/* Mensagem de erro similar */}

        {(!loading || error) && ( // Só exibe o formulário se não estiver carregando ou se houver erro
            <form onSubmit={handleSubmit} className="space-y-4"> {/* Espaçamento entre os campos similar */}
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
                <label htmlFor="tipo_interacao" className="block text-gray-700 font-medium mb-1">Tipo de Interação:</label> {/* Rótulo similar */}
                <input
                    type="text"
                    id="tipo_interacao"
                    name="tipo_interacao"
                    value={formData.tipo_interacao}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" // Estilo de input similar
                />
              </div>
              <div>
                <label htmlFor="data_interacao" className="block text-gray-700 font-medium mb-1">Data da Interação (Opcional):</label> {/* Rótulo similar */}
                <input
                    type="date" // Usando type="date"
                    id="data_interacao"
                    name="data_interacao"
                    value={formData.data_interacao}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Estilo de input similar
                />
              </div>
              <div>
                <label htmlFor="descricao" className="block text-gray-700 font-medium mb-1">Descrição (Opcional):</label> {/* Rótulo similar */}
                <textarea
                    id="descricao"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Estilo de textarea similar
                ></textarea>
              </div>

              <div className="flex items-center pt-4"> {/* Alinhamento dos botões similar */}
                <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md disabled:opacity-50"> {/* Botão criar similar */}
                  {loading ? 'Criando...' : 'Criar Interação'}
                </button>
              </div>
            </form>
        )}
      </div>
  );
}

export default InteracoesForm;
