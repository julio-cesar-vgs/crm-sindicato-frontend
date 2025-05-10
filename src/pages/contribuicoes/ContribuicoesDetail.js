import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getContribuicaoById } from '../../api/contribuicoes';
import '../../styles/layout.css';

function ContribuicoesDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contribuicao, setContribuicao] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContribuicao() {
      try {
        const data = await getContribuicaoById(id);
        setContribuicao(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    fetchContribuicao();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!contribuicao) {
    return <div>Contribuicao not found.</div>;
  }

  return (
    <div className="container">
      <h1>Detalhes da Contribuição</h1>
      <div className="detail-item">
        <strong>ID Contribuição:</strong> {contribuicao.id_contribuicao}
      </div>
      <div className="detail-item">
        <strong>ID Associado:</strong> {contribuicao.id_associado}
      </div>
      <div className="detail-item">
        <strong>Valor:</strong> {contribuicao.valor}
      </div>
      <div className="detail-item">
        <strong>Data de Pagamento:</strong> {contribuicao.data_pagamento}
      </div>
      <div className="detail-item">
        <strong>Status de Pagamento:</strong> {contribuicao.status_pagamento}
      </div>
      <button className="button" onClick={() => navigate('/contribuicoes')}>Voltar para a Lista</button>
    </div>
  );
}

export default ContribuicoesDetail;