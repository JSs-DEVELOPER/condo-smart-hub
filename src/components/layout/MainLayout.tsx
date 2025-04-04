
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
  userName?: string;
  userRole?: 'morador' | 'sindico' | 'subsindico' | 'conselheiro';
}

const MainLayout = ({ 
  children, 
  userName = "João Silva", 
  userRole = "sindico" 
}: MainLayoutProps) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Função para obter o título da seção atual
  const getSectionTitle = () => {
    switch (activeSection) {
      case 'dashboard':
        return 'Dashboard';
      case 'moradores':
        return 'Gerenciamento de Moradores';
      case 'reservas':
        return 'Reservas de Áreas Comuns';
      case 'comunicados':
        return 'Comunicados e Avisos';
      case 'financeiro':
        return 'Controle Financeiro';
      case 'ocorrencias':
        return 'Ocorrências e Solicitações';
      case 'relatorios':
        return 'Relatórios e Estatísticas';
      case 'configuracoes':
        return 'Configurações do Sistema';
      default:
        return 'Dashboard';
    }
  };

  // Obter iniciais do nome do usuário
  const getUserInitials = () => {
    if (!userName) return '';
    
    const nameParts = userName.split(' ');
    if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
    
    return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        activeSection={activeSection} 
        onChangeSection={setActiveSection} 
        userRole={userRole}
      />
      
      <main className={`flex-1 transition-all ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header 
          title={getSectionTitle()} 
          userName={userName}
          userInitials={getUserInitials()}
          userRole={userRole}
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <div className="p-6 overflow-y-auto h-[calc(100vh-4rem)]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
