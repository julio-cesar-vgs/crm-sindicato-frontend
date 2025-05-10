import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInteracao } from '../../api/interacoes';
import '../../styles/layout.css';
import './interacoes.css';

const InteracoesForm = () => {
  const [interacao, setInteracao] = useState({
    id_associado: '',
    tipo_interacao: '',
    data_interacao: '',
    descricao: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInteracao({ ...interacao, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createInteracao(interacao);
      navigate('/interacoes');
    } catch (error) {
      console.error('Erro ao criar interação:', error);
      alert('Erro ao criar interação.');
    }
  };

  const handleCancel = () => {
    navigate('/interacoes');
  };

  return (
    <div className="form-container">
      <h2>Nova Interação</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id_associado">ID do Associado:</label>
          <input
            type="number"
            id="id_associado"
            name="id_associado"
            value={interacao.id_associado}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tipo_interacao">Tipo de Interação:</label>
          <input
            type="text"
            id="tipo_interacao"
            name="tipo_interacao"
            value={interacao.tipo_interacao}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="data_interacao">Data da Interação:</label>
          <input
            type="date"
            id="data_interacao"
            name="data_interacao"
            value={interacao.data_interacao}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            value={interacao.descricao}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">Salvar</button>
          <button type="button" className="btn-secondary" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default InteracoesForm;