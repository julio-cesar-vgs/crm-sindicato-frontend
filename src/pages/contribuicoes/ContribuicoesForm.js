import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/layout.css';
import {createContribuicao, getContribuicaoById, updateContribuicao} from "../../api/contribuicoes";

function ContribuicoesForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contribuicao, setContribuicao] = useState({
    id_associado: '',
    valor: '',
    data_pagamento: '',
    status_pagamento: '',
  });

  useEffect(() => {
    if (id) {
      const fetchContribuicao = async () => {
        try {
          const data = await getContribuicaoById(id);
          setContribuicao(data);
        } catch (error) {
          console.error('Error fetching contribuicao:', error);
        }
      };
      fetchContribuicao();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContribuicao((prevContribuicao) => ({
      ...prevContribuicao,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateContribuicao(id, contribuicao);
      } else {
        await createContribuicao(contribuicao);
      }
      navigate('/contribuicoes');
    } catch (error) {
      console.error('Error saving contribuicao:', error);
      alert('Erro ao salvar contribuição. Verifique os dados e tente novamente.');
    }
  };

  const handleCancel = () => {
    navigate('/contribuicoes');
  };

  return (
    <div className="page-container">
      <h1 className="page-title">{id ? 'Editar Contribuição' : 'Nova Contribuição'}</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>ID do Associado:</label>
          <input
            type="number"
            name="id_associado"
            value={contribuicao.id_associado}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Valor:</label>
          <input
            type="number"
            name="valor"
            value={contribuicao.valor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Data de Pagamento:</label>
          <input
            type="date"
            name="data_pagamento"
            value={contribuicao.data_pagamento}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Status de Pagamento:</label>
          <input
            type="text"
            name="status_pagamento"
            value={contribuicao.status_pagamento}
            onChange={handleChange}
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn-submit">Salvar</button>
          <button type="button" onClick={handleCancel} className="btn-cancel">Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default ContribuicoesForm;