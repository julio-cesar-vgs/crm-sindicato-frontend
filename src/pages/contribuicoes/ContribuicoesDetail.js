// src/pages/Contribuicoes/ContribuicoesDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { contribuicoes } from '../../api';
// Não precisamos de um arquivo CSS específico se usar apenas Tailwind


function ContribuicoesDetail() {
    const { id } = useParams(); // Pega o ID da URL
    const [contribuicao, setContribuicao] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContribuicao = async () => {
            try {
                const data = await contribuicoes.getContribuicaoById(id);
                setContribuicao(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchContribuicao();
    }, [id]); // Roda quando o ID na URL mudar

    if (loading) {
        return <p className="text-center py-10 text-gray-600">Carregando contribuição...</p>; // Classes Tailwind para mensagem de carregamento
    }

    if (error) {
        return <p className="text-red-500 text-center py-10">Ocorreu um erro ao carregar a contribuição: {error.message}</p>; // Classes Tailwind para mensagem de erro
    }

    if (!contribuicao) {
        return <p className="text-center py-10 text-gray-600">Contribuição não encontrada.</p>; // Classes Tailwind para mensagem de não encontrado
    }

    const campos = [ // Definindo os campos a serem exibidos
        ['ID Contribuição', contribuicao.id_contribuicao],
        ['ID Associado', contribuicao.id_associado],
        ['Valor', contribuicao.valor],
        ['Data Pagamento', contribuicao.data_pagamento ? new Date(contribuicao.data_pagamento).toLocaleDateString() : 'N/A'],
        ['Status Pagamento', contribuicao.status_pagamento || 'N/A'],
    ];


    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"> {/* Container/Card similar */}
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Detalhes da Contribuição</h2> {/* Título similar */}
            <div className="space-y-3"> {/* Espaçamento vertical similar */}
                {campos.map(([label, val]) => (
                    <p key={label} className="text-gray-700"> {/* Parágrafo de detalhe similar */}
                        <span className="font-medium inline-block w-40 text-gray-800">{label}:</span> {/* Rótulo similar, ajustado a largura se necessário */}
                        <span>{val}</span> {/* Valor similar */}
                    </p>
                ))}
            </div>

            <div className="mt-6 flex justify-center space-x-4"> {/* Espaçamento e alinhamento dos botões similar */}
                <Link to={`/contribuicoes/edit/${contribuicao.id_contribuicao}`} className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md"> {/* Botão editar similar */}
                    Editar
                </Link>
                <Link to="/contribuicoes" className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md"> {/* Botão voltar similar */}
                    Voltar para a lista
                </Link>
            </div>
        </div>
    );
}

export default ContribuicoesDetail;
