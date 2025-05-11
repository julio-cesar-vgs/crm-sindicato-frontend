const API_URL = 'http://localhost:5000'; 
const CONTRIBUICOES_API_URL = `${API_URL}/contribuicoes`;

export const listContribuicoes = async () => {
  try {
    const response = await fetch(CONTRIBUICOES_API_URL);
    if (!response.ok) {
      throw new Error(`Error listing contribuicoes: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in listContribuicoes:", error);
    throw error;
  }
};

export const getContribuicaoById = async (id) => {
  try {
    const response = await fetch(`${CONTRIBUICOES_API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Error getting contribuicao by ID: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getContribuicaoById:", error);
    throw error;
  }
};

export const createContribuicao = async (contribuicaoData) => {
  try {
    const response = await fetch(CONTRIBUICOES_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contribuicaoData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error creating contribuicao: ${response.statusText} - ${errorData.description || 'Unknown error'}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in createContribuicao:", error);
    throw error;
  }
};

export const updateContribuicao = async (id, contribuicaoData) => {
  try {
    const response = await fetch(`${CONTRIBUICOES_API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contribuicaoData),
    });
    if (!response.ok) {
      throw new Error(`Error updating contribuicao: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in updateContribuicao:", error);
    throw error;
  }
};

export const deleteContribuicao = async (id) => {
  try {
    const response = await fetch(`${CONTRIBUICOES_API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error deleting contribuicao: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in deleteContribuicao:", error);
    throw error;
  }
};