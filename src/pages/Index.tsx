import { useEffect } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/home/Hero';
import FeaturedRooms from '@/components/home/FeaturedRooms';
import ServicesSection from '@/components/home/ServicesSection';
import Testimonials from '@/components/home/Testimonials';
import LocationSection from '@/components/home/LocationSection';
import CallToAction from '@/components/home/CallToAction';
import HeroLogoDisplay from '@/components/home/HeroLogoDisplay';

import { roomsData, servicesData, testimonialsData } from '@/data/mockData';

const Index = () => {
  // Add animations on scroll for all the sections
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.8;
        
        if (isInView) {
          element.classList.add('fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on page load
    setTimeout(handleScroll, 300);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      <Hero />
      
      {/* Featured Logo Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900/90 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Notre Identité</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Découvrez la Résidence Madison, un symbole d'élégance et de confort à Kribi.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="w-full md:w-1/2 animate-on-scroll">
                <div className="h-64 md:h-80 mx-auto md:mx-0 max-w-md">
                  <HeroLogoDisplay className="w-full h-full" />
                </div>
              </div>
              
              <div className="w-full md:w-1/2 text-white animate-on-scroll">
                <h3 className="text-2xl font-semibold mb-4 text-burgundy-100">Notre Logo, Notre Histoire</h3>
                <p className="mb-4">
                  Le logo de la Résidence Madison symbolise notre engagement envers l'excellence et l'hospitalité exceptionnelle. 
                  Chaque détail a été soigneusement conçu pour représenter l'élégance et le confort que nous offrons.
                </p>
                <p>
                  Inspiré par notre environnement naturel de Kribi et par notre passion pour un service irréprochable, 
                  notre logo est le reflet de notre mission : vous offrir une expérience de séjour mémorable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturedRooms rooms={roomsData} />
      <ServicesSection services={servicesData} />
      <Testimonials testimonials={testimonialsData} />
      <LocationSection />
      <CallToAction />
    </Layout>
  );
};

export default Index;
