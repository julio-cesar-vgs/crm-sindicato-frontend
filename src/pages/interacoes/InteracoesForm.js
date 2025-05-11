import React, { useState } from 'react';
import { createInteracao } from '../../api/interacoes';
import './interacoes.css';

const InteracoesForm = ({ onInteracaoCreated }) => {
  const [interacaoData, setInteracaoData] = useState({
    id_associado: '',
    tipo_interacao: '',
    data_interacao: '',
    descricao: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInteracaoData({
      ...interacaoData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createInteracao(interacaoData);
      alert('Interação criada com sucesso!');
      setInteracaoData({
        id_associado: '',
        tipo_interacao: '',
        data_interacao: '',
        descricao: ''
      });
      if (onInteracaoCreated) {
        onInteracaoCreated();
      }
    } catch (error) {
      console.error('Erro ao criar interação:', error);
      alert('Erro ao criar interação.');
    }
  };

  return (
    <div className="interacoes-form-container">
      <h2>Criar Nova Interação</h2>
      <form onSubmit={handleSubmit} className="interacoes-form">
        <div className="form-group">
          <label htmlFor="id_associado">ID do Associado:</label>
          <input
            type="number"
            id="id_associado"
            name="id_associado"
            value={interacaoData.id_associado}
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
            value={interacaoData.tipo_interacao}
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
            value={interacaoData.data_interacao}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            value={interacaoData.descricao}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Criar Interação</button>
      </form>
    </div>
  );
};

export default InteracoesForm;