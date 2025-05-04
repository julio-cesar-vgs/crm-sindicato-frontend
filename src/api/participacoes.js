// src/api/participacao.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Certifique-se que esta é a porta correta do seu backend

export const getParticipacoes = async () => {
    try {
        const response = await axios.get(`${API_URL}/participacoes`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar participações:', error);
        throw error;
    }
};

export const createParticipacao = async (participacaoData) => {
    try {
        const response = await axios.post(`${API_URL}/participacoes`, participacaoData);
        return response.data; // Pode retornar o ID da nova participação
    } catch (error) {
        console.error('Erro ao criar participação:', error);
        throw error;
    }
};

// Como não há endpoints de detalhe, atualização ou exclusão individual,
// não precisamos de funções getParticipacaoById, updateParticipacao ou deleteParticipacao aqui.