// src/api/index.js
import * as associados from './associados';
import * as eventos from './eventos';
import * as participacoes from './participacoes';
import * as interacoes from './interacoes'; // Certifique-se que esta linha existe
import * as contribuicoes from './contribuicoes';

export {
    associados,
    eventos,
    participacoes,
    interacoes, // <-- Certifique-se que 'interacoes' está aqui
    contribuicoes,
};
