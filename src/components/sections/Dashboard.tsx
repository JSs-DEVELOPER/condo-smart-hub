
import React, { useContext } from 'react';
import { CreditCard, Users, Calendar, MessageSquare, FileText, AlertTriangle, Home, PieChart, TrendingUp } from 'lucide-react';
import StatCard from '../dashboard/StatCard';
import RecentActivity from '../dashboard/RecentActivity';
import UpcomingReservations from '../dashboard/UpcomingReservations';
import NoticesList from '../dashboard/NoticesList';
import { ActivityItem, ActivityType } from './ActivityItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthContext } from '@/App';

// Dados fictícios para demonstração
const recentActivities: ActivityItem[] = [
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
  {
    id: '5',
    title: 'Manutenção Agendada',
    description: 'Manutenção do ar condicionado - Áreas comuns',
    timestamp: '4 dias atrás',
    type: 'comunicado',
  },
  {
    id: '6',
    title: 'Multa Aplicada',
    description: 'Estacionamento em vaga reservada - Apto 505',
    timestamp: '1 semana atrás',
    type: 'financeiro',
  }
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
  {
    id: '4',
    title: 'Festa Infantil',
    area: 'Área de Lazer',
    date: '25/04/2025',
    time: '14:00 - 18:00',
    resident: 'Ana Silva - Apto 303',
  }
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
  {
    id: '4',
    title: 'Nova Portaria Eletrônica',
    content: 'Informamos que a partir do dia 15/04 teremos um novo sistema de portaria eletrônica. Todos os moradores receberão as instruções de uso por e-mail.',
    date: '28/03/2025',
    important: true,
  }
];

const condoDetails = {
  areas: [
    { name: 'Salão de Festas', status: 'Disponível', nextMaintenance: '15/05/2025' },
    { name: 'Piscina', status: 'Em manutenção', nextMaintenance: '10/04/2025' },
    { name: 'Academia', status: 'Disponível', nextMaintenance: '20/04/2025' },
    { name: 'Churrasqueira', status: 'Disponível', nextMaintenance: '01/05/2025' },
    { name: 'Sala de Jogos', status: 'Disponível', nextMaintenance: '25/04/2025' },
  ],
  pendingPayments: [
    { apartment: '101', block: 'A', amount: 'R$ 450,00', dueDate: '10/04/2025' },
    { apartment: '305', block: 'B', amount: 'R$ 450,00', dueDate: '10/04/2025' },
    { apartment: '402', block: 'A', amount: 'R$ 450,00', dueDate: '10/04/2025' },
    { apartment: '201', block: 'C', amount: 'R$ 450,00', dueDate: '10/04/2025' },
  ],
  pendingMaintenance: [
    { area: 'Elevador Principal', date: '10/04/2025', company: 'ElevaTech' },
    { area: 'Jardim', date: '15/04/2025', company: 'Verde Vivo' },
    { area: 'Sistema de CFTV', date: '20/04/2025', company: 'SegurançaTotal' },
  ],
  recentOccurrences: [
    { type: 'Barulho', apartment: '203', status: 'Em análise', date: '01/04/2025' },
    { type: 'Vazamento', apartment: 'Garagem', status: 'Resolvido', date: '28/03/2025' },
    { type: 'Segurança', apartment: 'Portaria', status: 'Em andamento', date: '30/03/2025' },
  ]
};

const Dashboard = () => {
  const { userRole, userInfo } = useContext(AuthContext);
  
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

  // Renderizar detalhes adicionais para gestores
  const renderAdminDetails = () => {
    if (userRole !== 'morador') {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Status das Áreas Comuns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {condoDetails.areas.map((area, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                    <div className="flex items-center">
                      <Home size={18} className="mr-2 text-muted-foreground" />
                      <span>{area.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        area.status === 'Disponível' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                        'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                      }`}>
                        {area.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pagamentos Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {condoDetails.pendingPayments.map((payment, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                    <div>
                      <span className="font-medium">Apto {payment.apartment} - Bloco {payment.block}</span>
                      <p className="text-sm text-muted-foreground">Vencimento: {payment.dueDate}</p>
                    </div>
                    <span className="font-semibold text-red-500">{payment.amount}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
    return null;
  };

  // Renderizar painel financeiro para moradores
  const renderResidentFinancial = () => {
    if (userRole === 'morador') {
      return (
        <div className="grid grid-cols-1 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Meu Histórico Financeiro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="font-medium">Taxa de Condomínio - Abril/2025</span>
                    <p className="text-sm text-muted-foreground">Vencimento: 10/04/2025</p>
                  </div>
                  <span className="font-semibold text-yellow-500">R$ 450,00 (Pendente)</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="font-medium">Taxa de Condomínio - Março/2025</span>
                    <p className="text-sm text-muted-foreground">Vencimento: 10/03/2025</p>
                  </div>
                  <span className="font-semibold text-green-500">R$ 450,00 (Pago)</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="font-medium">Taxa de Condomínio - Fevereiro/2025</span>
                    <p className="text-sm text-muted-foreground">Vencimento: 10/02/2025</p>
                  </div>
                  <span className="font-semibold text-green-500">R$ 450,00 (Pago)</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <span className="font-medium">Taxa Extra - Reforma do Salão</span>
                    <p className="text-sm text-muted-foreground">Vencimento: 15/01/2025</p>
                  </div>
                  <span className="font-semibold text-green-500">R$ 150,00 (Pago)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
    return null;
  };

  // Renderizar mais detalhes para administradores
  const renderMoreAdminDetails = () => {
    if (userRole !== 'morador') {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Manutenções Programadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {condoDetails.pendingMaintenance.map((maintenance, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                    <div>
                      <span className="font-medium">{maintenance.area}</span>
                      <p className="text-sm text-muted-foreground">Data: {maintenance.date}</p>
                    </div>
                    <span className="text-sm">{maintenance.company}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ocorrências Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {condoDetails.recentOccurrences.map((occurrence, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                    <div>
                      <span className="font-medium">{occurrence.type} - {occurrence.apartment}</span>
                      <p className="text-sm text-muted-foreground">Data: {occurrence.date}</p>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      occurrence.status === 'Resolvido' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                      occurrence.status === 'Em análise' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {occurrence.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="animate-fade-in">
      {renderStats()}
      
      {renderAdminDetails()}
      
      {renderResidentFinancial()}
      
      {renderMoreAdminDetails()}
      
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
