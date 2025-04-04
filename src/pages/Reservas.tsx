
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, PlusCircle, Info, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

// Áreas comuns disponíveis para reserva
const commonAreas = [
  { id: '1', name: 'Salão de Festas', capacity: 50, hourlyRate: 50, minHours: 4, deposit: 200, images: ['salao1.jpg', 'salao2.jpg'] },
  { id: '2', name: 'Churrasqueira', capacity: 20, hourlyRate: 30, minHours: 3, deposit: 100, images: ['churrasco1.jpg'] },
  { id: '3', name: 'Sala de Reuniões', capacity: 15, hourlyRate: 20, minHours: 1, deposit: 0, images: ['reuniao1.jpg'] },
  { id: '4', name: 'Espaço Gourmet', capacity: 25, hourlyRate: 40, minHours: 3, deposit: 150, images: ['gourmet1.jpg'] },
  { id: '5', name: 'Quadra Poliesportiva', capacity: 30, hourlyRate: 25, minHours: 1, deposit: 0, images: ['quadra1.jpg'] },
];

// Reservas fictícias (normalmente viria do banco de dados)
const initialReservations = [
  { id: '1', areaId: '1', title: 'Aniversário de 15 anos', user: 'Maria Santos', apartment: '201', date: new Date(2025, 3, 15), startTime: '18:00', endTime: '23:00', status: 'confirmada' },
  { id: '2', areaId: '3', title: 'Reunião de Condomínio', user: 'Síndico', apartment: 'Admin', date: new Date(2025, 3, 20), startTime: '19:00', endTime: '21:00', status: 'confirmada' },
  { id: '3', areaId: '5', title: 'Campeonato de Futebol', user: 'Pedro Alves', apartment: '502', date: new Date(2025, 3, 22), startTime: '09:00', endTime: '12:00', status: 'confirmada' },
  { id: '4', areaId: '2', title: 'Churrasco Familiar', user: 'Carlos Mendes', apartment: '301', date: new Date(2025, 3, 18), startTime: '12:00', endTime: '16:00', status: 'pendente' },
];

const Reservas = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [reservations, setReservations] = useState(initialReservations);
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [selectedArea, setSelectedArea] = useState<typeof commonAreas[0] | null>(null);
  const [openReserveDialog, setOpenReserveDialog] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({
    title: '',
    date: new Date(),
    startTime: '12:00',
    endTime: '16:00',
    description: '',
    participants: '10',
    area: '',
  });

  // Função para abrir o diálogo de informações da área
  const handleOpenInfo = (area: typeof commonAreas[0]) => {
    setSelectedArea(area);
    setOpenInfoDialog(true);
  };

  // Função para abrir o diálogo de reserva
  const handleOpenReserve = () => {
    setReservationDetails({
      ...reservationDetails,
      date: date || new Date(),
    });
    setOpenReserveDialog(true);
  };

  // Função para criar uma nova reserva
  const handleCreateReservation = () => {
    // Aqui você faria a validação e enviaria para o servidor
    // Para este exemplo, vamos apenas adicionar à lista localmente
    
    const newReservation = {
      id: `${reservations.length + 1}`,
      areaId: reservationDetails.area,
      title: reservationDetails.title,
      user: 'Você',
      apartment: '101', // Normalmente viria do usuário logado
      date: reservationDetails.date,
      startTime: reservationDetails.startTime,
      endTime: reservationDetails.endTime,
      status: 'pendente'
    };
    
    setReservations([...reservations, newReservation]);
    
    toast({
      title: 'Reserva solicitada com sucesso!',
      description: 'Sua reserva foi enviada para aprovação.',
    });
    
    setOpenReserveDialog(false);
  };

  // Obter reservas para a data selecionada
  const getDayReservations = () => {
    if (!date) return [];
    
    return reservations.filter(r => {
      const rDate = new Date(r.date);
      return rDate.getDate() === date.getDate() && 
             rDate.getMonth() === date.getMonth() && 
             rDate.getFullYear() === date.getFullYear();
    });
  };

  // Renderizar lista de reservas do dia
  const renderDayReservations = () => {
    const dayReservations = getDayReservations();
    
    if (dayReservations.length === 0) {
      return (
        <div className="text-center py-6 text-muted-foreground">
          Não há reservas para esta data.
        </div>
      );
    }
    
    return dayReservations.map(reservation => {
      const area = commonAreas.find(a => a.id === reservation.areaId);
      
      return (
        <div key={reservation.id} className="border-b last:border-0 py-3">
          <div className="flex justify-between">
            <div>
              <h4 className="font-medium">{reservation.title}</h4>
              <p className="text-sm text-muted-foreground">{area?.name}</p>
              <p className="text-sm">
                {reservation.startTime} - {reservation.endTime}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-xs px-2 py-1 rounded-full ${
                reservation.status === 'confirmada' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              }`}>
                {reservation.status === 'confirmada' ? 'Confirmada' : 'Pendente'}
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                {reservation.user} - Apto {reservation.apartment}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Calendário de Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal mb-4"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <Button onClick={handleOpenReserve} variant="default" className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Solicitar Reserva
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Áreas Disponíveis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commonAreas.map((area) => (
                  <div key={area.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                    <div>
                      <h4 className="font-medium">{area.name}</h4>
                      <p className="text-sm text-muted-foreground">Capacidade: {area.capacity} pessoas</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleOpenInfo(area)}>
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                Reservas para {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Hoje"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderDayReservations()}
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Regras para Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>As reservas devem ser feitas com pelo menos 48 horas de antecedência.</li>
                <li>É necessário pagar o valor da taxa de reserva e caução (quando aplicável) antes da confirmação.</li>
                <li>Em caso de cancelamento, deve ser feito com 24 horas de antecedência para reembolso.</li>
                <li>O morador responsável pela reserva deve estar presente durante todo o evento.</li>
                <li>Respeitar o limite de capacidade de pessoas é obrigatório.</li>
                <li>Respeitar os horários de funcionamento das áreas comuns.</li>
                <li>Após o uso, o local deve ser entregue limpo e em boas condições.</li>
                <li>Danos causados durante o uso da área serão cobrados do responsável pela reserva.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Diálogo de Informações da Área */}
      {selectedArea && (
        <Dialog open={openInfoDialog} onOpenChange={setOpenInfoDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedArea.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-muted h-48 rounded-md flex items-center justify-center text-muted-foreground">
                Imagem da área
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Capacidade</h4>
                  <p className="text-sm">{selectedArea.capacity} pessoas</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Taxa por Hora</h4>
                  <p className="text-sm">R$ {selectedArea.hourlyRate},00</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Mínimo de Horas</h4>
                  <p className="text-sm">{selectedArea.minHours} horas</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Caução</h4>
                  <p className="text-sm">
                    {selectedArea.deposit > 0 ? `R$ ${selectedArea.deposit},00` : 'Não necessário'}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Disponibilidade</h4>
                <p className="text-sm text-muted-foreground">
                  Segunda a Sexta: 08:00 - 22:00<br />
                  Sábados, Domingos e Feriados: 10:00 - 22:00
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setOpenInfoDialog(false)}>Fechar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Diálogo de Reserva */}
      <Dialog open={openReserveDialog} onOpenChange={setOpenReserveDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Solicitar Reserva</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="area">Área</Label>
              <Select 
                value={reservationDetails.area} 
                onValueChange={(value) => setReservationDetails({...reservationDetails, area: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma área" />
                </SelectTrigger>
                <SelectContent>
                  {commonAreas.map((area) => (
                    <SelectItem key={area.id} value={area.id}>{area.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="title">Título do Evento</Label>
              <Input 
                id="title" 
                value={reservationDetails.title} 
                onChange={(e) => setReservationDetails({...reservationDetails, title: e.target.value})}
                placeholder="Ex: Aniversário, Reunião, etc."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Horário de Início</Label>
                <Input 
                  id="startTime" 
                  type="time" 
                  value={reservationDetails.startTime} 
                  onChange={(e) => setReservationDetails({...reservationDetails, startTime: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="endTime">Horário de Término</Label>
                <Input 
                  id="endTime" 
                  type="time" 
                  value={reservationDetails.endTime} 
                  onChange={(e) => setReservationDetails({...reservationDetails, endTime: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="participants">Número de Participantes</Label>
              <Input 
                id="participants" 
                type="number" 
                value={reservationDetails.participants} 
                onChange={(e) => setReservationDetails({...reservationDetails, participants: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="description">Descrição do Evento</Label>
              <Textarea 
                id="description" 
                value={reservationDetails.description} 
                onChange={(e) => setReservationDetails({...reservationDetails, description: e.target.value})}
                placeholder="Descreva o evento ou use para observações adicionais"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="mr-2">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleCreateReservation}>Solicitar Reserva</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Reservas;
