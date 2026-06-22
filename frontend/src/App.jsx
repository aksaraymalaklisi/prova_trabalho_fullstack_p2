import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ResourcePage from './components/ResourcePage';

const UsersPage = () => (
  <ResourcePage 
    title="Usuários" 
    endpoint="/users" 
    isAdminOnly={true}
    fields={[
      { name: 'name', label: 'Nome', required: true },
      { name: 'email', label: 'E-mail', type: 'email', required: true },
      { name: 'password', label: 'Senha (se criando)', type: 'password', required: true },
      { name: 'role', label: 'Perfil', type: 'select', options: ['admin', 'user'], required: true }
    ]} 
  />
);

const CarsPage = () => (
  <ResourcePage 
    title="Carros" 
    endpoint="/cars" 
    fields={[
      { name: 'brand', label: 'Marca', required: true },
      { name: 'model', label: 'Modelo', required: true },
      { name: 'year', label: 'Ano', type: 'number', required: true },
      { name: 'color', label: 'Cor' },
      { name: 'price', label: 'Preço', type: 'number', required: true }
    ]} 
  />
);

const MotorcyclesPage = () => (
  <ResourcePage 
    title="Motos" 
    endpoint="/motorcycles" 
    fields={[
      { name: 'brand', label: 'Marca', required: true },
      { name: 'model', label: 'Modelo', required: true },
      { name: 'year', label: 'Ano', type: 'number', required: true },
      { name: 'cc', label: 'Cilindrada', type: 'number', required: true },
      { name: 'price', label: 'Preço', type: 'number', required: true }
    ]} 
  />
);

const ClothingBrandsPage = () => (
  <ResourcePage 
    title="Marcas de Roupa" 
    endpoint="/clothing-brands" 
    fields={[
      { name: 'name', label: 'Nome da Marca', required: true },
      { name: 'country', label: 'País', required: true },
      { name: 'foundedYear', label: 'Ano de Fundação', type: 'number' },
      { name: 'website', label: 'Site' }
    ]} 
  />
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="cars" element={<CarsPage />} />
            <Route path="motorcycles" element={<MotorcyclesPage />} />
            <Route path="clothing" element={<ClothingBrandsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
