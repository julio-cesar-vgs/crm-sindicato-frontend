import React, { useEffect, useState } from 'react';
import { listInteracoes } from '../../api/interacoes';

function InteracoesList() {
  const [interacoes, setInteracoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInteracoes = async () => {
      try {
        const data = await listInteracoes();
        setInteracoes(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInteracoes();
  }, []);

  if (loading) {
    return <div>Carregando interações...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro ao carregar as interações: {error.message}</div>;
  }

  return (
    <div>
      <h2>Lista de Interações</h2>
      {interacoes.length === 0 ? (
        <p>Nenhuma interação encontrada.</p>
      ) : (
        <ul>
          {interacoes.map(interacao => (
            <li key={interacao.id_interacao}>
              ID Associado: {interacao.id_associado}, Tipo: {interacao.tipo_interacao}, Data: {interacao.data_interacao}, Descrição: {interacao.descricao}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InteracoesList;