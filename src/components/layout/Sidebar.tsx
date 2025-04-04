
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Users, 
  Calendar, 
  MessageSquare, 
  Settings, 
  CreditCard, 
  FileText, 
  BarChart, 
  Menu, 
  X 
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => {
  return (
    <div 
      className={cn("condo-nav-item", active && "active")}
      onClick={onClick}
    >
      <Icon size={20} />
      <span>{label}</span>
    </div>
  );
};

interface SidebarProps {
  activeSection: string;
  onChangeSection: (section: string) => void;
  userRole: 'morador' | 'sindico' | 'subsindico' | 'conselheiro';
}

const Sidebar = ({ activeSection, onChangeSection, userRole }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  // Define os itens de navegação com base no papel do usuário
  const getNavItems = () => {
    const commonItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'reservas', label: 'Reservas', icon: Calendar },
      { id: 'comunicados', label: 'Comunicados', icon: MessageSquare },
    ];

    const moradorItems = [
      ...commonItems,
      { id: 'financeiro', label: 'Financeiro', icon: CreditCard },
      { id: 'ocorrencias', label: 'Ocorrências', icon: FileText },
    ];

    const administradorItems = [
      ...commonItems,
      { id: 'moradores', label: 'Moradores', icon: Users },
      { id: 'financeiro', label: 'Financeiro', icon: CreditCard },
      { id: 'ocorrencias', label: 'Ocorrências', icon: FileText },
      { id: 'relatorios', label: 'Relatórios', icon: BarChart },
      { id: 'configuracoes', label: 'Configurações', icon: Settings },
    ];

    switch (userRole) {
      case 'morador':
        return moradorItems;
      case 'sindico':
      case 'subsindico':
      case 'conselheiro':
        return administradorItems;
      default:
        return commonItems;
    }
  };

  const navItems = getNavItems();

  return (
    <div 
      className={cn(
        "bg-sidebar fixed h-full z-10 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="text-white font-bold text-xl">CondoSmart</div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-sidebar-accent"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>
      
      <div className="flex flex-col gap-1 p-2 flex-1 overflow-y-auto">
        {navItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={collapsed ? '' : item.label}
            active={activeSection === item.id}
            onClick={() => onChangeSection(item.id)}
          />
        ))}
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="text-white text-sm">
            <p>Você está logado como:</p>
            <p className="font-semibold capitalize">{userRole}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
