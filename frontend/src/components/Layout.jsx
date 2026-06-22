import { useContext } from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Users, Car, Bike, ShoppingBag } from 'lucide-react';

const Layout = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600">FullstackApp</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link to="/" className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
            <LayoutDashboard className="w-5 h-5 mr-3" /> Painel
          </Link>
          {user.role === 'admin' && (
            <Link to="/users" className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
              <Users className="w-5 h-5 mr-3" /> Usuários
            </Link>
          )}
          <Link to="/cars" className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
            <Car className="w-5 h-5 mr-3" /> Carros
          </Link>
          <Link to="/motorcycles" className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
            <Bike className="w-5 h-5 mr-3" /> Motos
          </Link>
          <Link to="/clothing" className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
            <ShoppingBag className="w-5 h-5 mr-3" /> Marcas de Roupa
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
