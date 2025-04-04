
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'reserva' | 'comunicado' | 'ocorrencia' | 'financeiro';
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  // Função para obter a cor de acordo com o tipo de atividade
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'reserva':
        return 'bg-condo-blue-light';
      case 'comunicado':
        return 'bg-condo-yellow';
      case 'ocorrencia':
        return 'bg-condo-red';
      case 'financeiro':
        return 'bg-condo-green';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className={`w-2 h-2 rounded-full mt-2 ${getActivityColor(activity.type)}`} />
              <div className="flex-1">
                <h4 className="text-sm font-medium">{activity.title}</h4>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
