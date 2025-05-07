
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Hotel,
  CalendarDays,
  Users,
  CreditCard,
  MessageSquare,
  Image,
  FileText,
  Settings,
  Shield,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
}

const Sidebar = ({ isMobileOpen, toggleMobileSidebar }: SidebarProps) => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
    window.location.href = '/admin/login';
  };

  const menuItems = [
    { name: 'Tableau de bord', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Chambres', icon: Hotel, path: '/admin/chambres' },
    { name: 'Réservations', icon: CalendarDays, path: '/admin/reservations' },
    { name: 'Clients', icon: Users, path: '/admin/clients' },
    { name: 'Paiements', icon: CreditCard, path: '/admin/paiements' },
    { name: 'Témoignages', icon: MessageSquare, path: '/admin/temoignages' },
    { name: 'Galerie', icon: Image, path: '/admin/galerie' },
    { name: 'Blog', icon: FileText, path: '/admin/blog' },
    { name: 'Paramètres', icon: Settings, path: '/admin/parametres' },
    { name: 'RGPD', icon: Shield, path: '/admin/rgpd' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-sidebar shadow-md z-50 transition-transform duration-300 transform md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <Link to="/admin/dashboard" className="text-lg font-semibold text-sidebar-primary">
              Madison Admin
            </Link>
            <button 
              onClick={toggleMobileSidebar}
              className="md:hidden text-sidebar-foreground hover:text-sidebar-primary"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                      location.pathname === item.path
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
