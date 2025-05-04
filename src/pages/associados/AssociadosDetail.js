// src/pages/associados/AssociadosDetail.js
import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {associados} from '../../api';

function AssociadosDetail() {
    const {id} = useParams();
    const [assoc, setAssoc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        associados.getAssociadoById(id)
            .then(data => {
                setAssoc(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="text-center py-10">Carregando...</p>;
    if (error) return <p className="text-red-500 text-center py-10">Erro: {error.message}</p>;
    if (!assoc) return <p className="text-center py-10 text-gray-600">Associado não encontrado.</p>;

    const campos = [['ID', assoc.id_associado], ['Razão Social', assoc.razao_social], ['CNPJ', assoc.cnpj], ['Contato', assoc.contato], ['Ramo de Atuação', assoc.ramo_atuacao], ['Cidade', assoc.cidade], ['Estado', assoc.estado], ['Data de Associação', assoc.data_associacao], ['Status Contribuição', assoc.status_contribuicao]];

    return (<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Detalhes do Associado</h2>
            <div className="space-y-3">
                {campos.map(([label, val]) => (<p key={label} className="text-gray-700">
                        <span className="font-medium inline-block w-36 text-gray-800">{label}:</span>
                        <span>{val}</span>
                    </p>))}
            </div>
            <div className="mt-6 flex justify-center space-x-4">
                <Link to={`/associados/edit/${assoc.id_associado}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md">
                    Editar
                </Link>
                <Link to="/associados"
                      className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md">
                    Voltar
                </Link>
            </div>
        </div>);
}

export default AssociadosDetail;