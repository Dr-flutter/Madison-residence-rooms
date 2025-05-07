
import Layout from '@/components/Layout';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from 'framer-motion';

// Types pour les images
type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  category: string;
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Images de la galerie avec différentes catégories
  const galleryImages: GalleryImage[] = [
    // Chambres
    { id: 1, src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", alt: "Suite de luxe", category: "chambres" },
    { id: 2, src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", alt: "Chambre standard", category: "chambres" },
    { id: 3, src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81", alt: "Chambre familiale", category: "chambres" },
    { id: 4, src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", alt: "Duplex paysagé", category: "chambres" },
    
    // Restaurant
    { id: 5, src: "https://images.unsplash.com/photo-1472396961693-142e6e269027", alt: "Restaurant principal", category: "restaurant" },
    { id: 6, src: "https://images.unsplash.com/photo-1500673922987-e212871fec22", alt: "Terrasse du restaurant", category: "restaurant" },
    { id: 7, src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", alt: "Espace petit-déjeuner", category: "restaurant" },
    
    // Extérieurs
    { id: 8, src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", alt: "Vue de la résidence", category: "exterieurs" },
    { id: 9, src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7", alt: "Jardin tropical", category: "exterieurs" },
    { id: 10, src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", alt: "Plage à proximité", category: "exterieurs" },
    { id: 11, src: "https://images.unsplash.com/photo-1472396961693-142e6e269027", alt: "Piscine", category: "exterieurs" },
  ];

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <Layout> 
      <div className="container mx-auto px-4 py-12 pt-24 mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold text-burgundy mb-4">Notre galerie</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez la Résidence Madison en images et projetez-vous dans votre futur séjour à Kribi.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Tout voir</TabsTrigger>
              <TabsTrigger value="chambres">Chambres</TabsTrigger>
              <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
              <TabsTrigger value="exterieurs">Extérieurs</TabsTrigger>
            </TabsList>
            
            {/* Toutes les images */}
            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages.map((image) => (
                  <motion.div
                    key={image.id}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                    className="cursor-pointer rounded-lg overflow-hidden shadow-md"
                    onClick={() => openModal(image)}
                  >
                    <AspectRatio ratio={4/3}>
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                      />
                    </AspectRatio>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            {/* Images filtrées par catégorie */}
            {["chambres", "restaurant", "exterieurs"].map((category) => (
              <TabsContent key={category} value={category} className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryImages
                    .filter((image) => image.category === category)
                    .map((image) => (
                      <motion.div
                        key={image.id}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2 }}
                        className="cursor-pointer rounded-lg overflow-hidden shadow-md"
                        onClick={() => openModal(image)}
                      >
                        <AspectRatio ratio={4/3}>
                          <img 
                            src={image.src} 
                            alt={image.alt} 
                            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                          />
                        </AspectRatio>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Modal d'image */}
        <Dialog open={!!selectedImage} onOpenChange={closeModal}>
          <DialogContent className="sm:max-w-4xl p-0 bg-black bg-opacity-90">
            <div className="relative w-full">
              {selectedImage && (
                <>
                  <img 
                    src={selectedImage.src} 
                    alt={selectedImage.alt} 
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
                    <p className="text-lg">{selectedImage.alt}</p>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Gallery;
