
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface HeaderProps {
  title: string;
  userName: string;
  userInitials: string;
  userRole: string;
  sidebarCollapsed: boolean;
}

const Header = ({ title, userName, userInitials, userRole, sidebarCollapsed }: HeaderProps) => {
  return (
    <header className={`bg-white border-b border-border h-16 flex items-center justify-between px-4 sticky top-0 z-10 transition-all ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      
      <div className="hidden md:flex items-center relative max-w-md w-full mx-4">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar..."
          className="pl-10 w-full"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-condo-red rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <span className="font-medium">Nova solicitação de reserva</span>
                  <span className="text-sm text-muted-foreground">Área de lazer - 15/04/2025</span>
                  <span className="text-xs text-muted-foreground">agora mesmo</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <span className="font-medium">Novo comunicado</span>
                  <span className="text-sm text-muted-foreground">Manutenção no elevador</span>
                  <span className="text-xs text-muted-foreground">há 2 horas</span>
                </div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
                <span className="ml-2 hidden md:inline-block">{userName}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{userName}</span>
                <span className="text-xs text-muted-foreground capitalize">{userRole}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Meu Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
