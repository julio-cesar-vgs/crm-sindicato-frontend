import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listInteracoes } from '../../api/interacoes'; // Assuming you have this API function
import '../interacoes/interacoes.css'; // Assuming you have this CSS file

function InteracoesList() {
  const [interacoes, setInteracoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchInteracoes() {
      try {
        const data = await listInteracoes();
        setInteracoes(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    fetchInteracoes();
  }, []);

  if (loading) {
    return <p>Carregando interações...</p>;
  }

  if (error) {
    return <p>Erro ao carregar interações: {error.message}</p>;
  }

  return (
    <div className="container">
      <h1 className="title">Lista de Interações</h1>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID Interação</th>
              <th>ID Associado</th>
              <th>Tipo Interação</th>
              <th>Data Interação</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {interacoes.map(interacao => (
              <tr key={interacao.id_interacao}>
                <td>{interacao.id_interacao}</td>
                <td>{interacao.id_associado}</td>
                <td>{interacao.tipo_interacao}</td>
                <td>{interacao.data_interacao}</td>
                <td>{interacao.descricao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Link to create new interaction, adjust route as needed */}
      <Link to="/interacoes/new" className="button">Nova Interação</Link>
    </div>
  );
}

export default InteracoesList;