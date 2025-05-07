
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Image, Info, Book, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import LogoDisplay from './LogoDisplay';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Chambres', href: '/chambres' },
    { name: 'Services', href: '/services' },
    { name: 'Galerie', href: '/galerie', icon: Image },
    { name: 'À propos', href: '/a-propos', icon: Info },
    { name: 'Blog', href: '/blog', icon: Book },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 relative z-10">
          <div className="h-12 w-12 sm:h-14 sm:w-14 overflow-hidden">
            <LogoDisplay 
              showBackground={scrolled || isMobileMenuOpen || location.pathname !== '/'} 
              className="h-full w-full"
            />
          </div>
          <span className={cn(
            "text-2xl font-bold transition-colors duration-300",
            scrolled || isMobileMenuOpen || location.pathname !== '/' ? "text-gradient-burgundy" : "text-white"
          )}>
            Résidence Madison
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "font-medium flex items-center gap-1.5 transition-colors duration-300",
                isActive(item.href) ? "text-burgundy font-semibold" : 
                  (scrolled || location.pathname !== '/' ? "text-gray-700 hover:text-burgundy" : "text-white hover:text-burgundy-100")
              )}
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Reservation Button */}
        <div className="hidden md:block">
          <Link to="/reservation">
            <Button className="bg-burgundy hover:bg-burgundy-800 shadow-md">Réserver</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className={cn(
              "focus:outline-none transition-colors duration-300",
              scrolled || isMobileMenuOpen || location.pathname !== '/' ? "text-gray-700 hover:text-burgundy" : "text-white hover:text-burgundy-100"
            )}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-4 animate-fade-in border-t border-gray-100 shadow-lg">
          <div className="flex flex-col space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-gray-700 font-medium py-2 flex items-center gap-2 transition-colors duration-300",
                  isActive(item.href) ? "text-burgundy font-semibold" : "hover:text-burgundy"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.name}
              </Link>
            ))}
            <Link 
              to="/reservation"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button className="w-full bg-burgundy hover:bg-burgundy-800 mt-2">
                Réserver
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
