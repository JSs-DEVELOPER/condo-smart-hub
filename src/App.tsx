
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { useState, useEffect, createContext } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import RecuperarSenha from "./pages/RecuperarSenha";
import Perfil from "./pages/Perfil";
import Reservas from "./pages/Reservas";

const queryClient = new QueryClient();

// Criando o contexto de autenticação
export const AuthContext = createContext<{
  isAuthenticated: boolean;
  userRole: 'morador' | 'sindico' | 'subsindico' | 'conselheiro';
  userInfo: any;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}>({
  isAuthenticated: false,
  userRole: 'morador',
  userInfo: null,
  login: () => false,
  logout: () => {},
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'morador' | 'sindico' | 'subsindico' | 'conselheiro'>('morador');
  const [userInfo, setUserInfo] = useState<any>(null);

  // Verificar se existe um usuário no localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('condoUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsAuthenticated(true);
      setUserRole(user.role);
      setUserInfo(user);
    }
  }, []);

  // Função para realizar login
  const login = (email: string, password: string) => {
    // Verificar usuários hardcoded
    if (email === 'admin@example.com' && password === 'password123') {
      const userData = {
        id: '1',
        name: 'Administrador',
        email: 'admin@example.com',
        role: 'sindico' as const,
        bloco: 'A',
        apartamento: '101',
      };
      setIsAuthenticated(true);
      setUserRole('sindico');
      setUserInfo(userData);
      localStorage.setItem('condoUser', JSON.stringify(userData));
      return true;
    } else if (email === 'morador@example.com' && password === 'password123') {
      const userData = {
        id: '2',
        name: 'João Morador',
        email: 'morador@example.com',
        role: 'morador' as const,
        bloco: 'B',
        apartamento: '202',
      };
      setIsAuthenticated(true);
      setUserRole('morador');
      setUserInfo(userData);
      localStorage.setItem('condoUser', JSON.stringify(userData));
      return true;
    }
    
    // Verificar usuários registrados no localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('condoUsers') || '[]');
    const foundUser = registeredUsers.find(
      (user: any) => user.email === email && user.password === password
    );
    
    if (foundUser) {
      const userData = {
        id: foundUser.id,
        name: foundUser.name || foundUser.nome,
        email: foundUser.email,
        role: foundUser.role,
        bloco: foundUser.bloco,
        apartamento: foundUser.apartamento,
      };
      
      setIsAuthenticated(true);
      setUserRole(foundUser.role);
      setUserInfo(userData);
      localStorage.setItem('condoUser', JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  // Função para realizar logout
  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('morador');
    setUserInfo(null);
    localStorage.removeItem('condoUser');
  };

  // Componente para proteger rotas
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    return <>{children}</>;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, userInfo, login, logout }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Rotas públicas */}
                <Route path="/login" element={
                  isAuthenticated ? <Navigate to="/" /> : <Login />
                } />
                <Route path="/registro" element={
                  isAuthenticated ? <Navigate to="/" /> : <Registro />
                } />
                <Route path="/recuperar-senha" element={
                  isAuthenticated ? <Navigate to="/" /> : <RecuperarSenha />
                } />
                
                {/* Rotas protegidas */}
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/perfil" 
                  element={
                    <ProtectedRoute>
                      <Perfil />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/reservas" 
                  element={
                    <ProtectedRoute>
                      <Reservas />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Rota de fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
};

export default App;
