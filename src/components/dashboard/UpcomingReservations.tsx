
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface Reservation {
  id: string;
  title: string;
  area: string;
  date: string;
  time: string;
  resident: string;
}

interface UpcomingReservationsProps {
  reservations: Reservation[];
}

const UpcomingReservations = ({ reservations }: UpcomingReservationsProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Próximas Reservas</CardTitle>
        <Calendar className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
              <h4 className="font-medium">{reservation.title}</h4>
              <div className="flex flex-col mt-1">
                <span className="text-sm">
                  <span className="text-muted-foreground">Área:</span> {reservation.area}
                </span>
                <span className="text-sm">
                  <span className="text-muted-foreground">Data:</span> {reservation.date}
                </span>
                <span className="text-sm">
                  <span className="text-muted-foreground">Horário:</span> {reservation.time}
                </span>
                <span className="text-sm">
                  <span className="text-muted-foreground">Morador:</span> {reservation.resident}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingReservations;
