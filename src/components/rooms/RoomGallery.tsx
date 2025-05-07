
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RoomGalleryProps {
  images: string[];
  name: string;
}

const RoomGallery = ({ images, name }: RoomGalleryProps) => {
  const [activeImage, setActiveImage] = useState(0);

  const nextImage = () => {
    setActiveImage((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="aspect-[16/9] overflow-hidden rounded-xl">
        <img
          src={images[activeImage]}
          alt={`${name} - Photo ${activeImage + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-burgundy hover:bg-white p-2 rounded-full shadow-md focus:outline-none"
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-burgundy hover:bg-white p-2 rounded-full shadow-md focus:outline-none"
            aria-label="Image suivante"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`border-2 rounded overflow-hidden flex-shrink-0 transition-all ${
                index === activeImage 
                  ? 'border-burgundy opacity-100 scale-105' 
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={image}
                alt={`${name} - Miniature ${index + 1}`}
                className="h-16 w-24 object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
        {activeImage + 1} / {images.length}
      </div>
    </div>
  );
};

export default RoomGallery;
