// src/api/contribuicoes.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Certifique-se que esta é a porta correta do seu backend

/**
 * Busca todas as contribuições da API.
 * @returns {Promise<Array>} Uma promessa que resolve com a lista de contribuições.
 */
export const getContribuicoes = async () => {
  try {
    const response = await axios.get(`${API_URL}/contribuicoes`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar contribuições:', error);
    throw error; // Rejeita o erro para ser tratado nos componentes
  }
};

/**
 * Busca os detalhes de uma contribuição específica por ID.
 * @param {string|number} id O ID da contribuição.
 * @returns {Promise<object>} Uma promessa que resolve com os dados da contribuição.
 */
export const getContribuicaoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/contribuicoes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar contribuição com ID ${id}:`, error);
    throw error;
  }
};

/**
 * Cria uma nova contribuição na API.
 * @param {object} contribuicaoData Os dados da nova contribuição (id_associado, valor, data_pagamento, status_pagamento).
 * @returns {Promise<object>} Uma promessa que resolve com a resposta da API.
 */
export const createContribuicao = async (contribuicaoData) => {
  try {
    const response = await axios.post(`${API_URL}/contribuicoes`, contribuicaoData);
    return response.data; // Pode retornar o ID da nova contribuição
  } catch (error) {
    console.error('Erro ao criar contribuição:', error);
    throw error;
  }
};

/**
 * Atualiza uma contribuição existente na API.
 * @param {string|number} id O ID da contribuição a ser atualizada.
 * @param {object} contribuicaoData Os dados atualizados da contribuição.
 * @returns {Promise<object>} Uma promessa que resolve com a resposta da API.
 */
export const updateContribuicao = async (id, contribuicaoData) => {
  try {
    const response = await axios.put(`${API_URL}/contribuicoes/${id}`, contribuicaoData);
    return response.data; // Pode retornar uma mensagem de sucesso
  } catch (error) {
    console.error(`Erro ao atualizar contribuição com ID ${id}:`, error);
    throw error;
  }
};

/**
 * Deleta uma contribuição existente na API.
 * @param {string|number} id O ID da contribuição a ser deletada.
 * @returns {Promise<object>} Uma promessa que resolve com a resposta da API.
 */
export const deleteContribuicao = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/contribuicoes/${id}`);
    return response.data; // Pode retornar uma mensagem de sucesso
  } catch (error) {
    console.error(`Erro ao deletar contribuição com ID ${id}:`, error);
    throw error;
  }
};
