// src/api/index.js
import * as associados from './associados';
import * as eventos from './eventos';
import * as participacoes from './participacoes';
import * as interacoes from './interacoes';
import * as contribuicoes from './contribuicoes';

export {
    associados, eventos, // <-- Certifique-se que 'eventos' está aqui
    participacoes, interacoes, contribuicoes,
};