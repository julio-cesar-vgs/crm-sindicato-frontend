import React, { useState, useEffect } from 'react';
import { associados } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

function AssociadosForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        razao_social: '',
        cnpj: '',
        contato: '',
        ramo_atuacao: '',
        cidade: '',
        estado: '',
        data_associacao: '',
        status_contribuicao: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchAssociado = async () => {
                try {
                    const data = await associados.getAssociadoById(id);
                    setFormData(data);
                } catch (err) {
                    setError(err);
                }
            };
            fetchAssociado();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (id) {
                await associados.updateAssociado(id, formData);
                alert('Associado atualizado com sucesso!');
            } else {
                await associados.createAssociado(formData);
                alert('Associado criado com sucesso!');
            }
            navigate('/associados');
        } catch (err) {
            setError(err);
            console.error('Erro ao salvar associado:', err);
            alert('Ocorreu um erro ao salvar o associado.');
        } finally {
            setLoading(false);
        }
    };

    if (error && !loading) return <p className="text-red-500">Erro: {error.message}</p>;

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                {id ? 'Editar Associado' : 'Novo Associado'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {['razao_social','cnpj','contato','ramo_atuacao','cidade','estado'].map((field) => (
                    <div key={field}>
                        <label htmlFor={field} className="block text-gray-700 font-medium mb-1 capitalize">
                            {field.replace('_',' ')}:
                        </label>
                        <input
                            type="text"
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            disabled={loading}
                            required={field === 'razao_social' || field === 'cnpj'}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                ))}
                <div>
                    <label htmlFor="data_associacao" className="block text-gray-700 font-medium mb-1">
                        Data de Associação:
                    </label>
                    <input
                        type="date"
                        id="data_associacao"
                        name="data_associacao"
                        value={formData.data_associacao ? new Date(formData.data_associacao).toISOString().split('T')[0] : ''}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="status_contribuicao" className="block text-gray-700 font-medium mb-1">
                        Status de Contribuição:
                    </label>
                    <input
                        type="text"
                        id="status_contribuicao"
                        name="status_contribuicao"
                        value={formData.status_contribuicao}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center space-x-4 pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md disabled:opacity-50"
                    >
                        {loading ? 'Salvando...' : 'Salvar'}
                    </button>
                    {id && (
                        <button
                            type="button"
                            onClick={() => {
                                if (window.confirm('Tem certeza que deseja excluir este associado?')) {
                                    associados.deleteAssociado(id)
                                        .then(() => { alert('Associado excluído!'); navigate('/associados'); })
                                        .catch(err => { console.error(err); alert('Erro ao excluir.'); });
                                }
                            }}
                            disabled={loading}
                            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-md disabled:opacity-50"
                        >
                            Excluir
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default AssociadosForm;