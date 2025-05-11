// src/pages/Contribuicoes/ContribuicoesForm.js
import React, { useState, useEffect } from 'react';
import { contribuicoes } from '../../api'; // Importa as funções da API de contribuições
import { useNavigate, useParams } from 'react-router-dom';
// Não precisamos de um arquivo CSS específico se usar apenas Tailwind


function ContribuicoesForm() {
  const { id } = useParams(); // Pega o ID da URL se for edição
  const navigate = useNavigate(); // Para redirecionar após salvar
  const [formData, setFormData] = useState({
    id_associado: '',
    valor: '',
    data_pagamento: '', // Pode ser string no formato YYYY-MM-DD
    status_pagamento: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) { // Se tiver ID na URL, é edição
      const fetchContribuicao = async () => {
        try {
          const data = await contribuicoes.getContribuicaoById(id);
          // Formata a data para o input type="date" (YYYY-MM-DD)
          if (data.data_pagamento) {
            data.data_pagamento = new Date(data.data_pagamento).toISOString().split('T')[0];
          }
          setFormData(data);
        } catch (err) {
          setError(err);
        }
      };
      fetchContribuicao();
    }
  }, [id]); // Roda quando o ID na URL mudar

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Converte id_associado e valor para número se o backend esperar assim
    setFormData({
      ...formData,
      [name]: (name === 'id_associado' || name === 'valor') ? parseFloat(value) || '' : value // Converte para número (float), ou string vazia se não for um número válido
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validação básica (opcional, mas recomendada)
    if (!formData.id_associado || !formData.valor) {
      setError(new Error('ID do Associado e Valor são obrigatórios.'));
      setLoading(false);
      return;
    }

    // Formata a data para o formato esperado pela API, se necessário
    const dataParaEnviar = {
      ...formData,
      // Se data_pagamento for um campo de data, pode precisar de formatação
      // Ex: data_pagamento: formData.data_pagamento ? new Date(formData.data_pagamento).toISOString() : null,
    };


    try {
      if (id) {
        await contribuicoes.updateContribuicao(id, dataParaEnviar);
        alert('Contribuição atualizada com sucesso!');
      } else {
        await contribuicoes.createContribuicao(dataParaEnviar);
        alert('Contribuição criada com sucesso!');
      }
      navigate('/contribuicoes'); // Redireciona para a lista após salvar
    } catch (err) {
      setError(err);
      console.error('Erro ao salvar contribuição:', err);
      alert('Ocorreu um erro ao salvar a contribuição.');
    } finally {
      setLoading(false);
    }
  };

  // Lógica para deletar - pode ser um botão separado ou dentro do formulário de edição
  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta contribuição?')) {
      setLoading(true);
      setError(null);
      try {
        await contribuicoes.deleteContribuicao(id);
        alert('Contribuição excluída com sucesso!');
        navigate('/contribuicoes'); // Redireciona para a lista após excluir
      } catch (err) {
        setError(err);
        console.error('Erro ao excluir contribuição:', err);
        alert('Ocorreu um erro ao excluir a contribuição.');
      } finally {
        setLoading(false);
      }
    }
  }


  if (error && !loading && !id) {
    return <p className="text-center text-red-500">Ocorreu um erro ao carregar o formulário: {error.message}</p>;
  }
  if (error && !loading && id && !formData.id_contribuicao) {
    return <p className="text-center text-gray-600">Carregando dados da contribuição para edição...</p>; // Mensagem de carregamento similar
  }


  return (
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"> {/* Container/Card similar */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">{id ? 'Editar Contribuição' : 'Nova Contribuição'}</h2> {/* Título similar */}
        {loading && !error && <p className="text-center text-gray-600">Salvando...</p>} {/* Mensagem de salvamento similar */}
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
                <label htmlFor="valor" className="block text-gray-700 font-medium mb-1">Valor:</label> {/* Rótulo similar */}
                <input
                    type="number" // Usando type="number"
                    step="0.01" // Permite valores decimais
                    id="valor"
                    name="valor"
                    value={formData.valor}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" // Estilo de input similar
                />
              </div>
              <div>
                <label htmlFor="data_pagamento" className="block text-gray-700 font-medium mb-1">Data de Pagamento (Opcional):</label> {/* Rótulo similar */}
                <input
                    type="date" // Usando type="date"
                    id="data_pagamento"
                    name="data_pagamento"
                    value={formData.data_pagamento}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Estilo de input similar
                />
              </div>
              <div>
                <label htmlFor="status_pagamento" className="block text-gray-700 font-medium mb-1">Status de Pagamento (Opcional):</label> {/* Rótulo similar */}
                <input
                    type="text"
                    id="status_pagamento"
                    name="status_pagamento"
                    value={formData.status_pagamento}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Estilo de input similar
                />
              </div>

              <div className="flex items-center space-x-4 pt-4"> {/* Espaçamento e alinhamento dos botões similar */}
                <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md disabled:opacity-50"> {/* Botão salvar similar */}
                  {loading ? (id ? 'Atualizando...' : 'Criando...') : 'Salvar'}
                </button>
                {id && ( // Botão de excluir aparece apenas na edição
                    <button type="button" onClick={handleDelete} disabled={loading} className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-md disabled:opacity-50"> {/* Botão excluir similar */}
                      {loading ? 'Excluindo...' : 'Excluir'}
                    </button>
                )}
              </div>
            </form>
        )}
      </div>
  );
}

export default ContribuicoesForm;
