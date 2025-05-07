
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Testimonial } from '@/types';
import { formatDate } from '@/utils/helpers';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Only show approved testimonials
  const approvedTestimonials = testimonials.filter(t => t.approved);
  
  const goToPrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? approvedTestimonials.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === approvedTestimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Auto-advance testimonials
  useEffect(() => {
    if (approvedTestimonials.length <= 1) return;

    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [approvedTestimonials.length]);

  if (approvedTestimonials.length === 0) {
    return null;
  }
  
  return (
    <section ref={sectionRef} className="py-24 bg-burgundy/5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-burgundy/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-burgundy/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-burgundy uppercase font-medium tracking-wider text-sm">Témoignages</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Ce que disent nos clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Découvrez les témoignages de nos clients qui ont vécu l'expérience Résidence Madison à Kribi.
          </p>
        </div>
        
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative bg-white rounded-2xl shadow-lg p-8 md:p-12 overflow-hidden">
            {/* Quote mark */}
            <div className="absolute top-6 right-6 text-burgundy/10">
              <Quote size={80} strokeWidth={1} />
            </div>
            
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex mb-6">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-5 w-5 ${
                      index < approvedTestimonials[activeIndex].rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              
              {/* Testimonial content */}
              <blockquote className="text-lg md:text-xl text-gray-700 italic mb-8 transition-opacity duration-500">
                {approvedTestimonials[activeIndex].content}
              </blockquote>
              
              {/* Author info */}
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full bg-burgundy/20 flex items-center justify-center text-burgundy font-bold text-lg">
                  {approvedTestimonials[activeIndex].author.charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="font-semibold">{approvedTestimonials[activeIndex].author}</div>
                  <div className="text-sm text-gray-500">
                    {formatDate(approvedTestimonials[activeIndex].date)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={goToPrev}
              className="p-3 rounded-full bg-white shadow-md text-burgundy hover:bg-burgundy hover:text-white transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center space-x-2">
              {approvedTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "bg-burgundy w-6" : "bg-burgundy/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={goToNext}
              className="p-3 rounded-full bg-white shadow-md text-burgundy hover:bg-burgundy hover:text-white transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
