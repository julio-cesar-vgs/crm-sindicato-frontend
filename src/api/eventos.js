// src/api/eventos.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Certifique-se que esta é a porta correta do seu backend

export const getEventos = async () => {
  try {
    const response = await axios.get(`${API_URL}/eventos`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    throw error; // Rejeita o erro para ser tratado nos componentes
  }
};

export const getEventoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/eventos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar evento com ID ${id}:`, error);
    throw error;
  }
};

export const createEvento = async (eventoData) => {
  try {
    const response = await axios.post(`${API_URL}/eventos`, eventoData);
    return response.data; // Pode retornar o ID do novo evento, dependendo do backend
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    throw error;
  }
};

export const updateEvento = async (id, eventoData) => {
  try {
    const response = await axios.put(`${API_URL}/eventos/${id}`, eventoData);
    return response.data; // Pode retornar uma mensagem de sucesso
  } catch (error) {
    console.error(`Erro ao atualizar evento com ID ${id}:`, error);
    throw error;
  }
};

export const deleteEvento = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/eventos/${id}`);
    return response.data; // Pode retornar uma mensagem de sucesso
  } catch (error) {
    console.error(`Erro ao deletar evento com ID ${id}:`, error);
    throw error;
  }
};