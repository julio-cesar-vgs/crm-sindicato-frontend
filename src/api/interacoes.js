import axios from 'axios';

const API_URL = '/interacoes';

const listInteracoes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar interações:', error);
    throw error;
  }
};

const createInteracao = async (interacaoData) => {
  try {
    const response = await axios.post(API_URL, interacaoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar interação:', error);
    throw error;
  }
};

export {
  listInteracoes,
  createInteracao
};