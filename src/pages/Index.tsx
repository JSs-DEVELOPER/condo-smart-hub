
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SectionContent from '@/components/sections/SectionContent';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userRole, setUserRole] = useState<'morador' | 'sindico' | 'subsindico' | 'conselheiro'>('sindico');

  // Handler para mudança de seção
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  // Simulação rápida para alternar entre funções de usuário
  const toggleUserRole = () => {
    if (userRole === 'sindico') {
      setUserRole('morador');
    } else {
      setUserRole('sindico');
    }
  };

  return (
    <MainLayout userName="João Silva" userRole={userRole}>
      {/* Botão para alternar entre perfis (apenas para demonstração) */}
      <div className="mb-6 flex justify-end">
        <button 
          onClick={toggleUserRole}
          className="text-xs bg-white border border-border px-3 py-1 rounded-md shadow-sm hover:bg-secondary transition-colors"
        >
          Alternar para: {userRole === 'sindico' ? 'Morador' : 'Síndico'}
        </button>
      </div>
      
      <SectionContent activeSection={activeSection} userRole={userRole} />
    </MainLayout>
  );
};

export default Index;
