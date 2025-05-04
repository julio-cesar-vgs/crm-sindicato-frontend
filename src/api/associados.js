// src/api/associados.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // A porta onde seu backend Flask está rodando

export const getAssociados = async () => {
  try {
    const response = await axios.get(`${API_URL}/associados`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar associados:', error);
    throw error; // Rejeitar o erro para que o componente que chamou possa tratá-lo
  }
};

export const getAssociadoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/associados/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar associado com ID ${id}:`, error);
    throw error;
  }
};

export const createAssociado = async (associadoData) => {
  try {
    const response = await axios.post(`${API_URL}/associados`, associadoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar associado:', error);
    throw error;
  }
};

export const updateAssociado = async (id, associadoData) => {
  try {
    const response = await axios.put(`${API_URL}/associados/${id}`, associadoData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar associado com ID ${id}:`, error);
    throw error;
  }
};

export const deleteAssociado = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/associados/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar associado com ID ${id}:`, error);
    throw error;
  }
};