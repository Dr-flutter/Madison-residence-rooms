
import { User } from '@/types';
import { mockAuthData } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

export const login = async (email: string, password: string): Promise<User | null> => {
  try {
    const user = await mockAuthData.login(email, password);
    sessionStorage.setItem('isAuthenticated', 'true');
    return user;
  } catch (error) {
    console.error('Login failed:', error);
    toast({
      title: "Échec de connexion",
      description: "Email ou mot de passe incorrect.",
      variant: "destructive",
    });
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await mockAuthData.logout();
    sessionStorage.removeItem('isAuthenticated');
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    });
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

export const checkAuth = async (): Promise<User | null> => {
  if (sessionStorage.getItem('isAuthenticated') === 'true') {
    try {
      const user = await mockAuthData.checkAuth();
      return user;
    } catch (error) {
      console.error('Auth check failed:', error);
      return null;
    }
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return sessionStorage.getItem('isAuthenticated') === 'true';
};

export const requireAuth = async (navigate: (path: string) => void): Promise<boolean> => {
  const authStatus = isAuthenticated();
  
  if (!authStatus) {
    toast({
      title: "Accès refusé",
      description: "Veuillez vous connecter pour accéder à cette page.",
      variant: "destructive",
    });
    navigate('/admin/login');
    return false;
  }
  
  return true;
};
