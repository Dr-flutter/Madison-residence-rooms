
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';
import Sidebar from './Sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { isAuthenticated, requireAuth } from '@/services/authService';
import { ScrollToTop } from '@/components/ScrollToTop';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuthentication = async () => {
      if (!(await requireAuth(navigate))) {
        return;
      }
    };
    
    checkAuthentication();
  }, [navigate]);
  
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  
  if (!isAuthenticated()) {
    return null; // Don't render anything until auth check is complete
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop />
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        toggleMobileSidebar={toggleMobileSidebar}
      />
      
      {/* Main Content */}
      <div className="md:ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm py-4 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileSidebar}
                className="md:hidden mr-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold">{title}</h1>
            </div>
            
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 bg-burgundy text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Button>
              
              <div className="text-sm mr-2 hidden sm:block">
                <span className="text-gray-500">Bonjour, </span>
                <span className="font-medium">{user?.name || 'Admin'}</span>
              </div>
              
              <div className="h-8 w-8 bg-burgundy rounded-full flex items-center justify-center text-white font-medium">
                {user?.name ? user.name.charAt(0) : 'A'}
              </div>
            </div>
          </div>
        </header>
        
        {/* Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
