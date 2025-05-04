
// src/pages/associados/AssociadosList.js
import React, { useEffect, useState } from 'react';
import { associados } from '../../api';
import { Link } from 'react-router-dom';

function AssociadosList() {
    const [lista, setLista] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        associados.getAssociados()
            .then(data => { setLista(data); setLoading(false); })
            .catch(err => { setError(err); setLoading(false); });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Excluir este associado?')) {
            try {
                await associados.deleteAssociado(id);
                setLista(lista.filter(a => a.id_associado !== id));
            } catch {
                alert('Erro ao deletar.');
            }
        }
    };

    if (loading) return <p className="text-center py-10">Carregando...</p>;
    if (error) return <p className="text-red-500 text-center py-10">Erro: {error.message}</p>;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Lista de Associados</h2>
                <Link to="/associados/new" className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md">
                    Novo Associado
                </Link>
            </div>
            {lista.length === 0 ? (
                <p className="text-center text-gray-600">Nenhum associado encontrado.</p>
            ) : (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        {['ID','Razão Social','CNPJ','Ações'].map(col => (
                            <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {col}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {lista.map(ass => (
                        <tr key={ass.id_associado} className="even:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ass.id_associado}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ass.razao_social}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ass.cnpj}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Link to={`/associados/${ass.id_associado}`} className="text-blue-500 hover:underline mr-2">Ver</Link>
                                <Link to={`/associados/edit/${ass.id_associado}`} className="text-yellow-500 hover:underline mr-2">Editar</Link>
                                <button onClick={() => handleDelete(ass.id_associado)} className="text-red-500 hover:underline">Excluir</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AssociadosList;