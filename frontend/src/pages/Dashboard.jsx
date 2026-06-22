import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Painel</h1>
      
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Bem-vindo de volta, {user?.name}!</h2>
        <p className="text-gray-600 mb-6">
          Esta é a central do seu aplicativo Fullstack. Pelo menu lateral, você pode gerenciar os diversos recursos.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
            <h3 className="font-bold text-indigo-800 mb-2">Nível de Acesso</h3>
            <p className="text-sm text-indigo-600">Seu perfil atual é <span className="font-semibold capitalize">{user?.role}</span>. Isso determina quais ações você pode realizar.</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
            <h3 className="font-bold text-emerald-800 mb-2">Conexão com a API</h3>
            <p className="text-sm text-emerald-600">Conectado com sucesso aos serviços de backend Node.js/Express.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
