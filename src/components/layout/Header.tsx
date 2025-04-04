
import React, { useContext } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/App';

interface HeaderProps {
  title: string;
  userName?: string;
  userInitials?: string;
  userRole?: 'morador' | 'sindico' | 'subsindico' | 'conselheiro';
  sidebarCollapsed?: boolean;
}

const Header = ({ 
  title, 
  userName, 
  userInitials,
  userRole, 
  sidebarCollapsed 
}: HeaderProps) => {
  const navigate = useNavigate();
  const { logout, userInfo } = useContext(AuthContext);

  // Use context user info if available
  const displayName = userInfo?.name || userName || 'Usuário';
  const displayInitials = userInitials || displayName.charAt(0).toUpperCase();
  const displayRole = userInfo?.role || userRole || 'morador';

  const handleProfileClick = () => {
    navigate('/perfil');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 px-6 border-b flex items-center justify-between bg-background">
      <h1 className="text-xl font-semibold">{title}</h1>
      
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        
        <Button 
          variant="ghost" 
          className="flex items-center space-x-2"
          onClick={handleProfileClick}
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback>{displayInitials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start text-sm">
            <span className="font-medium">{displayName}</span>
            <span className="text-xs text-muted-foreground capitalize">{displayRole}</span>
          </div>
        </Button>
        
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Sair
        </Button>
      </div>
    </header>
  );
};

export default Header;
