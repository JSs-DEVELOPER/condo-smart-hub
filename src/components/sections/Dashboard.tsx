
import React from 'react';
import { CreditCard, Users, Calendar, MessageSquare, FileText } from 'lucide-react';
import StatCard from '../dashboard/StatCard';
import RecentActivity from '../dashboard/RecentActivity';
import UpcomingReservations from '../dashboard/UpcomingReservations';
import NoticesList from '../dashboard/NoticesList';

// Dados fictícios para demonstração
const recentActivities = [
  {
    id: '1',
    title: 'Nova Reserva',
    description: 'Salão de Festas reservado por Apto 101',
    timestamp: 'Hoje, 10:45',
    type: 'reserva',
  },
  {
    id: '2',
    title: 'Comunicado Enviado',
    description: 'Manutenção programada no elevador principal',
    timestamp: 'Ontem, 15:30',
    type: 'comunicado',
  },
  {
    id: '3',
    title: 'Nova Ocorrência',
    description: 'Vazamento reportado na garagem',
    timestamp: 'Ontem, 09:15',
    type: 'ocorrencia',
  },
  {
    id: '4',
    title: 'Pagamento Registrado',
    description: 'Taxa condominial de Abril - Apto 304',
    timestamp: '3 dias atrás',
    type: 'financeiro',
  },
];

const upcomingReservations = [
  {
    id: '1',
    title: 'Aniversário de 15 anos',
    area: 'Salão de Festas',
    date: '15/04/2025',
    time: '18:00 - 23:00',
    resident: 'Maria Santos - Apto 201',
  },
  {
    id: '2',
    title: 'Reunião de Condomínio',
    area: 'Sala de Reuniões',
    date: '20/04/2025',
    time: '19:00 - 21:00',
    resident: 'Síndico',
  },
  {
    id: '3',
    title: 'Aula de Yoga',
    area: 'Espaço Fitness',
    date: '22/04/2025',
    time: '08:00 - 09:00',
    resident: 'Carlos Oliveira - Apto 502',
  },
];

const recentNotices = [
  {
    id: '1',
    title: 'Manutenção no Elevador',
    content: 'Informamos que o elevador principal passará por manutenção preventiva na próxima segunda-feira, das 9h às 12h. Durante este período, utilize o elevador de serviço.',
    date: '02/04/2025',
    important: true,
  },
  {
    id: '2',
    title: 'Limpeza da Caixa d\'água',
    content: 'O serviço de limpeza e higienização da caixa d\'água será realizado no dia 10/04. Pedimos que economizem água neste dia.',
    date: '01/04/2025',
    important: false,
  },
  {
    id: '3',
    title: 'Assembleia Ordinária',
    content: 'Convocamos todos os condôminos para a Assembleia Ordinária que será realizada no dia 25/04, às 19h, no salão de festas.',
    date: '30/03/2025',
    important: true,
  },
];

interface DashboardProps {
  userRole: 'morador' | 'sindico' | 'subsindico' | 'conselheiro';
}

const Dashboard = ({ userRole }: DashboardProps) => {
  // Renderizar estatísticas diferentes com base no papel do usuário
  const renderStats = () => {
    if (userRole === 'morador') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <StatCard
            title="Próxima Fatura"
            value="R$ 450,00"
            icon={<CreditCard size={20} />}
          />
          <StatCard
            title="Reservas Ativas"
            value="2"
            icon={<Calendar size={20} />}
          />
          <StatCard
            title="Ocorrências Abertas"
            value="1"
            icon={<FileText size={20} />}
          />
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total de Moradores"
          value="128"
          icon={<Users size={20} />}
          change={2.5}
        />
        <StatCard
          title="Reservas este Mês"
          value="24"
          icon={<Calendar size={20} />}
          change={5.8}
        />
        <StatCard
          title="Comunicados Ativos"
          value="8"
          icon={<MessageSquare size={20} />}
          change={-12.3}
        />
        <StatCard
          title="Inadimplência"
          value="4.2%"
          icon={<CreditCard size={20} />}
          change={-1.5}
        />
      </div>
    );
  };
  
  return (
    <div className="animate-fade-in">
      {renderStats()}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RecentActivity activities={recentActivities} />
        <NoticesList notices={recentNotices} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingReservations reservations={upcomingReservations} />
        
        {userRole !== 'morador' && (
          <div className="condo-card">
            <h3 className="condo-section-title">Integrações Disponíveis</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-md flex flex-col items-center justify-center">
                <div className="text-condo-blue mb-2">CRM</div>
                <div className="text-sm text-center text-muted-foreground">Integre com seu sistema de CRM</div>
              </div>
              <div className="p-4 border rounded-md flex flex-col items-center justify-center">
                <div className="text-condo-blue mb-2">Pagamentos</div>
                <div className="text-sm text-center text-muted-foreground">Conecte com gateways de pagamento</div>
              </div>
              <div className="p-4 border rounded-md flex flex-col items-center justify-center">
                <div className="text-condo-blue mb-2">Analytics</div>
                <div className="text-sm text-center text-muted-foreground">Analise dados do condomínio</div>
              </div>
              <div className="p-4 border rounded-md flex flex-col items-center justify-center">
                <div className="text-condo-blue mb-2">IA</div>
                <div className="text-sm text-center text-muted-foreground">Use IA para automatizar tarefas</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
