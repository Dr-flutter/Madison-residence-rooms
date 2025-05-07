
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { ScrollToTop } from './ScrollToTop';

interface LayoutProps {
  children: React.ReactNode;
  noFooterNewsletter?: boolean;
}

const Layout = ({ children, noFooterNewsletter = false }: LayoutProps) => {
  // Add smooth scroll effect
  useEffect(() => {
    // Force scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Add smooth scroll behavior to the html element
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
