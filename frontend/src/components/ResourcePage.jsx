import { useState, useEffect, useCallback, useContext } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const ResourcePage = ({ title, endpoint, fields, isAdminOnly = false }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const fetchItems = useCallback(async () => {
    try {
      const res = await api.get(endpoint);
      setItems(res.data);
    } catch (err) {
      setError('Falha ao buscar dados');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchItems();
  }, [fetchItems]);

  const handleOpenModal = (item = null) => {
    setCurrentItem(item);
    if (item) {
      setFormData(item);
    } else {
      const emptyForm = {};
      fields.forEach(f => emptyForm[f.name] = '');
      setFormData(emptyForm);
    }
    setError('');
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (currentItem && currentItem._id) {
        await api.put(`${endpoint}/${currentItem._id}`, formData);
      } else if (currentItem && currentItem.id) {
        await api.put(`${endpoint}/${currentItem.id}`, formData);
      } else {
        await api.post(endpoint, formData);
      }
      setModalOpen(false);
      fetchItems();
    } catch (err) {
      setError(err.response?.data?.message || 'Falha ao salvar');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este item?')) return;
    try {
      await api.delete(`${endpoint}/${id}`);
      fetchItems();
    } catch (err) {
      setError('Falha ao excluir');
      console.error(err);
    }
  };

  if (isAdminOnly && user.role !== 'admin') {
    return <div className="p-4 text-red-500 bg-red-50 rounded-lg">Acesso Negado. Apenas administradores.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium"
        >
          <Plus className="w-5 h-5 mr-2" /> Adicionar
        </button>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg font-medium">{error}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Carregando...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Nenhum item encontrado.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {fields.map(f => (
                    <th key={f.name} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {f.label}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item._id || item.id} className="hover:bg-gray-50 transition-colors">
                    {fields.map(f => (
                      <td key={f.name} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {f.type === 'password' ? '********' : item[f.name]}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleOpenModal(item)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(item._id || item.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">{currentItem ? 'Editar' : 'Adicionar'} {title}</h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {fields.map(f => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                  {f.type === 'select' ? (
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      value={formData[f.name] || ''}
                      onChange={e => setFormData({ ...formData, [f.name]: e.target.value })}
                      required={f.required && !currentItem}
                    >
                      <option value="">Selecione...</option>
                      {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      type={f.type || 'text'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      value={formData[f.name] || ''}
                      onChange={e => setFormData({ ...formData, [f.name]: e.target.value })}
                      required={f.required && !(currentItem && f.type === 'password')}
                    />
                  )}
                </div>
              ))}
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors font-medium">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcePage;
