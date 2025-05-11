// src/api/interacoes.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Certifique-se que esta é a porta correta do seu backend

/**
 * Busca todas as interações da API.
 * @returns {Promise<Array>} Uma promessa que resolve com a lista de interações.
 */
export const getInteracoes = async () => {
    try {
        const response = await axios.get(`${API_URL}/interacoes`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar interações:', error);
        throw error; // Rejeita o erro para ser tratado nos componentes
    }
};

/**
 * Cria uma nova interação na API.
 * @param {object} interacaoData Os dados da nova interação (id_associado, tipo_interacao, data_interacao, descricao).
 * @returns {Promise<object>} Uma promessa que resolve com a resposta da API.
 */
export const createInteracao = async (interacaoData) => {
    try {
        const response = await axios.post(`${API_URL}/interacoes`, interacaoData);
        return response.data; // Pode retornar o ID da nova interação
    } catch (error) {
        console.error('Erro ao criar interação:', error);
        throw error;
    }
};

// Como não há endpoints de detalhe, atualização ou exclusão individual para Interações,
// não precisamos de funções getInteracaoById, updateInteracao ou deleteInteracao aqui.
