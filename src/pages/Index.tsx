
import React, { useState, useContext } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SectionContent from '@/components/sections/SectionContent';
import { AuthContext } from '@/App';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { userRole } = useContext(AuthContext);

  // Handler para mudança de seção
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <MainLayout onChangeSection={handleSectionChange}>
      <SectionContent activeSection={activeSection} userRole={userRole} />
    </MainLayout>
  );
};

export default Index;
