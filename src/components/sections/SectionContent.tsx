
import React from 'react';
import Dashboard from './Dashboard';

interface SectionContentProps {
  activeSection: string;
  userRole: 'morador' | 'sindico' | 'subsindico' | 'conselheiro';
}

const SectionContent = ({ activeSection, userRole }: SectionContentProps) => {
  // Renderizar o conteúdo com base na seção ativa
  switch (activeSection) {
    case 'dashboard':
      return <Dashboard userRole={userRole} />;
    case 'moradores':
      return (
        <div className="animate-fade-in">
          <div className="condo-card mb-6">
            <h3 className="condo-section-title">Gerenciamento de Moradores</h3>
            <p className="text-muted-foreground">
              Gerencie todos os moradores do condomínio, adicione novos moradores, edite informações e controle acessos.
            </p>
          </div>
          
          <div className="condo-card">
            <h3 className="condo-section-title">Lista de Moradores</h3>
            <div className="rounded-md border">
              <div className="bg-muted px-4 py-2 grid grid-cols-12 gap-2 font-medium">
                <div className="col-span-4">Nome</div>
                <div className="col-span-2">Unidade</div>
                <div className="col-span-3">Contato</div>
                <div className="col-span-3">Status</div>
              </div>
              
              <div className="divide-y">
                <div className="px-4 py-3 grid grid-cols-12 gap-2">
                  <div className="col-span-4">João Silva</div>
                  <div className="col-span-2">Apto 101</div>
                  <div className="col-span-3">(11) 99999-8888</div>
                  <div className="col-span-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      Ativo
                    </span>
                  </div>
                </div>
                
                <div className="px-4 py-3 grid grid-cols-12 gap-2">
                  <div className="col-span-4">Maria Santos</div>
                  <div className="col-span-2">Apto 201</div>
                  <div className="col-span-3">(11) 99888-7777</div>
                  <div className="col-span-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      Ativa
                    </span>
                  </div>
                </div>
                
                <div className="px-4 py-3 grid grid-cols-12 gap-2">
                  <div className="col-span-4">Pedro Costa</div>
                  <div className="col-span-2">Apto 302</div>
                  <div className="col-span-3">(11) 97777-6666</div>
                  <div className="col-span-3">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Pendente
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'reservas':
      return (
        <div className="animate-fade-in">
          <div className="condo-card mb-6">
            <h3 className="condo-section-title">Reservas de Áreas Comuns</h3>
            <p className="text-muted-foreground">
              Gerencie e visualize as reservas das áreas comuns do condomínio. Aprove ou rejeite solicitações.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="condo-card">
              <h3 className="font-semibold mb-2">Salão de Festas</h3>
              <div className="space-y-2">
                <div className="p-2 bg-blue-50 border border-blue-100 rounded-md">
                  <div className="font-medium">15/04/2025</div>
                  <div className="text-sm">18:00 - 23:00</div>
                  <div className="text-sm text-muted-foreground">Maria Santos (Apto 201)</div>
                </div>
                <div className="p-2 bg-blue-50 border border-blue-100 rounded-md">
                  <div className="font-medium">30/04/2025</div>
                  <div className="text-sm">19:00 - 23:30</div>
                  <div className="text-sm text-muted-foreground">Carlos Oliveira (Apto 502)</div>
                </div>
              </div>
            </div>
            
            <div className="condo-card">
              <h3 className="font-semibold mb-2">Churrasqueira</h3>
              <div className="space-y-2">
                <div className="p-2 bg-blue-50 border border-blue-100 rounded-md">
                  <div className="font-medium">18/04/2025</div>
                  <div className="text-sm">12:00 - 17:00</div>
                  <div className="text-sm text-muted-foreground">Pedro Costa (Apto 302)</div>
                </div>
              </div>
            </div>
            
            <div className="condo-card">
              <h3 className="font-semibold mb-2">Sala de Reuniões</h3>
              <div className="space-y-2">
                <div className="p-2 bg-blue-50 border border-blue-100 rounded-md">
                  <div className="font-medium">20/04/2025</div>
                  <div className="text-sm">19:00 - 21:00</div>
                  <div className="text-sm text-muted-foreground">Síndico</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'comunicados':
      return (
        <div className="animate-fade-in">
          <div className="condo-card mb-6">
            <h3 className="condo-section-title">Comunicados e Avisos</h3>
            <p className="text-muted-foreground">
              Gerencie os comunicados e avisos importantes para os moradores do condomínio.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="condo-card">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Manutenção no Elevador</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Informamos que o elevador principal passará por manutenção preventiva na próxima segunda-feira, das 9h às 12h. Durante este período, utilize o elevador de serviço.
                  </p>
                </div>
                <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                  Importante
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Enviado em: 02/04/2025</span>
                <span className="text-condo-blue">Enviado para: Todos os moradores</span>
              </div>
            </div>
            
            <div className="condo-card">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Limpeza da Caixa d'água</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    O serviço de limpeza e higienização da caixa d'água será realizado no dia 10/04. Pedimos que economizem água neste dia.
                  </p>
                </div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  Informativo
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Enviado em: 01/04/2025</span>
                <span className="text-condo-blue">Enviado para: Todos os moradores</span>
              </div>
            </div>
            
            <div className="condo-card">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Assembleia Ordinária</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Convocamos todos os condôminos para a Assembleia Ordinária que será realizada no dia 25/04, às 19h, no salão de festas.
                  </p>
                </div>
                <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                  Importante
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Enviado em: 30/03/2025</span>
                <span className="text-condo-blue">Enviado para: Todos os moradores</span>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="animate-fade-in">
          <div className="condo-card">
            <h3 className="condo-section-title">Em desenvolvimento</h3>
            <p className="text-muted-foreground">
              Esta seção está em desenvolvimento. Novas funcionalidades serão implementadas em breve.
            </p>
          </div>
        </div>
      );
  }
};

export default SectionContent;
