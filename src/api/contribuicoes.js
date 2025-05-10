import api from './index';

export const listContribuicoes = async () => {
  const response = await api.get('/contribuicoes');
  return response.data;
};

export const getContribuicaoById = async (id) => {
  const response = await api.get(`/contribuicoes/${id}`);
  return response.data;
};

export const createContribuicao = async (contribuicao) => {
  const response = await api.post('/contribuicoes', contribuicao);
  return response.data;
};

export const updateContribuicao = async (id, contribuicao) => {
  const response = await api.put(`/contribuicoes/${id}`, contribuicao);
  return response.data;
};

export const deleteContribuicao = async (id) => {
  const response = await api.delete(`/contribuicoes/${id}`);
  return response.data;
};