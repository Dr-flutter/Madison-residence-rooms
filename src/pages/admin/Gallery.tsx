import { useState } from 'react';
import { Search, Upload, Trash2, ChevronLeft, ChevronRight, Filter, FolderPlus, X, Check, Image, Edit } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { GalleryImage } from '@/types';

// Mock data for gallery images
const galleryData = [
  { 
    id: '1',
    title: 'Chambre Alfaïs',
    category: 'Chambres',
    url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80',
    featured: true,
    uploadDate: new Date('2024-04-10')
  },
  { 
    id: '2',
    title: 'Restaurant Principal',
    category: 'Restaurant',
    url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
    featured: false,
    uploadDate: new Date('2024-04-08')
  },
  { 
    id: '3',
    title: 'Piscine Extérieure',
    category: 'Extérieurs',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    featured: true,
    uploadDate: new Date('2024-04-05')
  },
  { 
    id: '4',
    title: 'Suite Présidentielle',
    category: 'Chambres',
    url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    featured: false,
    uploadDate: new Date('2024-04-01')
  },
  { 
    id: '5',
    title: 'Spa',
    category: 'Bien-être',
    url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
    featured: false,
    uploadDate: new Date('2024-03-30')
  },
  { 
    id: '6',
    title: 'Salle de Conférence',
    category: 'Évènements',
    url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80',
    featured: false,
    uploadDate: new Date('2024-03-25')
  },
  { 
    id: '7',
    title: 'Bar Lounge',
    category: 'Restaurant',
    url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    featured: false,
    uploadDate: new Date('2024-03-20')
  },
  { 
    id: '8',
    title: 'Vue Aérienne',
    category: 'Extérieurs',
    url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80',
    featured: true,
    uploadDate: new Date('2024-03-15')
  },
];

const Gallery = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState<GalleryImage[]>(galleryData);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const itemsPerPage = 12;
  
  // Form states
  const [imageTitle, setImageTitle] = useState('');
  const [imageCategory, setImageCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFeatured, setImageFeatured] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  
  // Extract unique categories
  const categories = Array.from(new Set(images.map(item => item.category)));
  
  // Filter images based on search term and category
  const filteredImages = images.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === null || image.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedImages = filteredImages.slice(startIndex, startIndex + itemsPerPage);
  
  const handleAddImage = () => {
    if (!imageTitle || !imageCategory || !imageUrl) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    const newImage: GalleryImage = {
      id: `image-${Date.now()}`,
      title: imageTitle,
      category: imageCategory,
      url: imageUrl,
      featured: imageFeatured,
      uploadDate: new Date()
    };

    setImages([...images, newImage]);
    resetForm();
    setShowAddDialog(false);

    toast({
      title: "Image ajoutée",
      description: `L'image "${imageTitle}" a été ajoutée à la galerie.`,
    });
  };

  const handleEditImage = () => {
    if (!selectedImage || !imageTitle || !imageCategory) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    const updatedImages = images.map(img => 
      img.id === selectedImage.id 
        ? {
            ...img,
            title: imageTitle,
            category: imageCategory,
            url: imageUrl || img.url,
            featured: imageFeatured
          }
        : img
    );

    setImages(updatedImages);
    resetForm();
    setShowEditDialog(false);

    toast({
      title: "Image modifiée",
      description: `L'image "${imageTitle}" a été modifiée avec succès.`,
    });
  };
  
  const handleDeleteImage = (id: string) => {
    const updatedImages = images.filter(image => image.id !== id);
    setImages(updatedImages);
    
    toast({
      title: "Image supprimée",
      description: "L'image a été supprimée avec succès de la galerie.",
    });
  };

  const handleDeleteSelected = () => {
    if (selectedImages.length === 0) return;

    const updatedImages = images.filter(image => !selectedImages.includes(image.id));
    setImages(updatedImages);
    setSelectedImages([]);
    
    toast({
      title: "Images supprimées",
      description: `${selectedImages.length} image(s) ont été supprimées avec succès.`,
    });
  };
  
  const handleOpenEditDialog = (image: GalleryImage) => {
    setSelectedImage(image);
    setImageTitle(image.title);
    setImageCategory(image.category);
    setImageUrl(image.url);
    setImageFeatured(image.featured);
    setShowEditDialog(true);
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie ne peut pas être vide.",
        variant: "destructive"
      });
      return;
    }

    if (categories.includes(newCategoryName)) {
      toast({
        title: "Erreur",
        description: "Cette catégorie existe déjà.",
        variant: "destructive"
      });
      return;
    }

    // Add a dummy image with the new category to ensure it appears in filters
    const newImage: GalleryImage = {
      id: `category-${Date.now()}`,
      title: `${newCategoryName} - Exemple`,
      category: newCategoryName,
      url: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
      featured: false,
      uploadDate: new Date()
    };

    setImages([...images, newImage]);
    setNewCategoryName('');
    setShowCategoryDialog(false);
    
    toast({
      title: "Catégorie ajoutée",
      description: `La catégorie "${newCategoryName}" a été créée avec succès.`,
    });
  };
  
  const handleToggleSelect = (id: string) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter(imageId => imageId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };
  
  const handleSelectAll = () => {
    if (selectedImages.length === paginatedImages.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(paginatedImages.map(image => image.id));
    }
  };
  
  const handleUploadImages = () => {
    toast({
      title: "Fonction en développement",
      description: "La fonction de téléchargement d'images sera disponible prochainement.",
    });
    setShowAddDialog(true);
  };
  
  const resetForm = () => {
    setImageTitle('');
    setImageCategory('');
    setImageUrl('');
    setImageFeatured(false);
    setSelectedImage(null);
  };
  
  return (
    <AdminLayout title="Galerie">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="pl-10"
                placeholder="Rechercher une image..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Button className="w-full sm:w-auto" onClick={handleUploadImages}>
              <Upload size={18} className="mr-2" />
              Télécharger
            </Button>
            
            <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <FolderPlus size={18} className="mr-2" />
                  Nouvelle catégorie
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Ajouter une nouvelle catégorie</DialogTitle>
                  <DialogDescription>
                    Créez une nouvelle catégorie pour organiser vos images.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category-name" className="text-right">
                      Nom
                    </Label>
                    <Input
                      id="category-name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="col-span-3"
                      placeholder="Nom de la catégorie"
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCategoryDialog(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleAddCategory}>
                    Créer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        {/* Categories filter pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant={categoryFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoryFilter(null)}
          >
            Toutes
          </Button>
          
          {categories.map(category => (
            <Button 
              key={category}
              variant={categoryFilter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Selection actions */}
        {selectedImages.length > 0 && (
          <div className="flex items-center justify-between p-3 mb-4 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium">
              {selectedImages.length} image(s) sélectionnée(s)
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                {selectedImages.length === paginatedImages.length ? 'Désélectionner tout' : 'Sélectionner tout'}
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                <Trash2 size={16} className="mr-1" />
                Supprimer la sélection
              </Button>
            </div>
          </div>
        )}
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedImages.length > 0 ? (
            paginatedImages.map((image) => (
              <div 
                key={image.id} 
                className={`relative group rounded-lg overflow-hidden aspect-square ${
                  selectedImages.includes(image.id) ? 'ring-2 ring-primary' : ''
                }`}
              >
                <img 
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex flex-col justify-between p-3">
                  {/* Checkbox for selection */}
                  <div className="flex justify-end">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-gray-300"
                      checked={selectedImages.includes(image.id)}
                      onChange={() => handleToggleSelect(image.id)}
                    />
                  </div>
                  
                  {/* Image info and actions */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="text-white font-medium">{image.title}</h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-200">{image.category}</span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:text-blue-500 hover:bg-transparent"
                          onClick={() => handleOpenEditDialog(image)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:text-red-500 hover:bg-transparent"
                          onClick={() => handleDeleteImage(image.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Featured badge */}
                {image.featured && (
                  <div className="absolute top-0 left-0 bg-primary text-primary-foreground text-xs py-1 px-2">
                    Mise en avant
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              Aucune image trouvée.
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">
              Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredImages.length)} sur {filteredImages.length} images
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={18} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Add Image Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter une image</DialogTitle>
            <DialogDescription>
              Remplissez ce formulaire pour ajouter une nouvelle image à la galerie.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image-title" className="text-right">
                Titre
              </Label>
              <Input
                id="image-title"
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)}
                className="col-span-3"
                placeholder="Titre de l'image"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image-category" className="text-right">
                Catégorie
              </Label>
              <Select value={imageCategory} onValueChange={setImageCategory}>
                <SelectTrigger id="image-category" className="col-span-3">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image-url" className="text-right">
                URL
              </Label>
              <Input
                id="image-url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="col-span-3"
                placeholder="URL de l'image"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image-featured" className="text-right">
                Mise en avant
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="image-featured"
                  checked={imageFeatured}
                  onCheckedChange={setImageFeatured}
                />
                <Label htmlFor="image-featured" className="cursor-pointer">
                  {imageFeatured ? 'Oui' : 'Non'}
                </Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddImage}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Image Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier l'image</DialogTitle>
            <DialogDescription>
              Modifiez les informations de l'image sélectionnée.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="mb-4">
              <img 
                src={selectedImage?.url} 
                alt={selectedImage?.title}
                className="w-full h-40 object-cover rounded-md"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-image-title" className="text-right">
                Titre
              </Label>
              <Input
                id="edit-image-title"
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-image-category" className="text-right">
                Catégorie
              </Label>
              <Select value={imageCategory} onValueChange={setImageCategory}>
                <SelectTrigger id="edit-image-category" className="col-span-3">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-image-url" className="text-right">
                URL
              </Label>
              <Input
                id="edit-image-url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="col-span-3"
                placeholder="Garder l'URL existante si vide"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-image-featured" className="text-right">
                Mise en avant
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="edit-image-featured"
                  checked={imageFeatured}
                  onCheckedChange={setImageFeatured}
                />
                <Label htmlFor="edit-image-featured" className="cursor-pointer">
                  {imageFeatured ? 'Oui' : 'Non'}
                </Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditImage}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Gallery;
