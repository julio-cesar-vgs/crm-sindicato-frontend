const API_URL = 'http://localhost:5000'; 
const INTERACOES_API_BASE_URL = `${API_URL}/interacoes`;

export const listInteracoes = async () => {
    try {
        const response = await fetch(INTERACOES_API_BASE_URL);
        if (!response.ok) {
            throw new Error('Erro ao buscar interações');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro na chamada da API (listInteracoes):', error);
        throw error;
    }
};

export const createInteracao = async (interacaoData) => {
    try {
        const response = await fetch(INTERACOES_API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(interacaoData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.description || 'Erro ao criar interação');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro na chamada da API (createInteracao):', error);
        throw error;
    }
};