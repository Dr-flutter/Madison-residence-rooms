
import { useState } from 'react';
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { formatDate } from '@/utils/helpers';

// Mock data for blog posts
const blogPostsData = [
  { 
    id: '1', 
    title: 'Les bienfaits d\'un séjour spa et bien-être',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80', 
    excerpt: 'Découvrez comment un séjour bien-être peut transformer votre santé et votre esprit...',
    author: 'Marie Dupont',
    category: 'Bien-être',
    publishDate: new Date('2024-04-15'),
    status: 'published'
  },
  { 
    id: '2', 
    title: 'Guide complet des activités à Douala',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80', 
    excerpt: 'Explorez les meilleurs sites touristiques et activités culturelles à Douala...',
    author: 'Thomas Ndeme',
    category: 'Tourisme',
    publishDate: new Date('2024-04-10'),
    status: 'published'
  },
  { 
    id: '3', 
    title: '5 recettes camerounaises à découvrir absolument',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80', 
    excerpt: 'Plongez dans la cuisine camerounaise avec ces recettes traditionnelles et délicieuses...',
    author: 'Sophie Mbarga',
    category: 'Cuisine',
    publishDate: new Date('2024-04-05'),
    status: 'published'
  },
  { 
    id: '4', 
    title: 'Comment organiser un mariage parfait dans notre hôtel',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80', 
    excerpt: 'Conseils et astuces pour organiser le mariage de vos rêves dans notre établissement...',
    author: 'Jean Kamga',
    category: 'Événements',
    publishDate: new Date('2024-04-01'),
    status: 'draft'
  },
  { 
    id: '5', 
    title: 'L\'histoire de la ville de Douala',
    image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=800&q=80', 
    excerpt: 'Découvrez l\'histoire riche et fascinante de Douala à travers les siècles...',
    author: 'Paul Ngando',
    category: 'Histoire',
    publishDate: new Date('2024-03-28'),
    status: 'published'
  },
  { 
    id: '6', 
    title: 'Les entreprises durables au Cameroun',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80', 
    excerpt: 'Focus sur les entreprises camerounaises qui s\'engagent pour l\'environnement...',
    author: 'Claire Ngoumou',
    category: 'Écologie',
    publishDate: null,
    status: 'draft'
  },
];

const Blog = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Filter blog posts based on search term and status
  const filteredPosts = blogPostsData.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === null || post.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);
  
  const handleDeletePost = (id: string) => {
    toast({
      title: "Article supprimé",
      description: "L'article a été supprimé avec succès.",
    });
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'published':
        return 'Publié';
      case 'draft':
        return 'Brouillon';
      case 'archived':
        return 'Archivé';
      default:
        return status;
    }
  };
  
  return (
    <AdminLayout title="Gestion du Blog">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="pl-10"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant={statusFilter === null ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(null)}
              >
                Tous
              </Button>
              <Button 
                variant={statusFilter === "published" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("published")}
              >
                Publiés
              </Button>
              <Button 
                variant={statusFilter === "draft" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("draft")}
              >
                Brouillons
              </Button>
            </div>
          </div>
          
          <Button className="w-full sm:w-auto">
            <Plus size={18} className="mr-2" />
            Nouvel article
          </Button>
        </div>
        
        {/* Blog Posts Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3 font-medium">Titre</th>
                <th className="pb-3 font-medium">Auteur</th>
                <th className="pb-3 font-medium">Catégorie</th>
                <th className="pb-3 font-medium">Date de publication</th>
                <th className="pb-3 font-medium">Statut</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPosts.length > 0 ? (
                paginatedPosts.map((post) => (
                  <tr key={post.id} className="border-b">
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-12 h-8 bg-gray-100 rounded overflow-hidden mr-3">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{post.title}</span>
                      </div>
                    </td>
                    <td className="py-4">{post.author}</td>
                    <td className="py-4">{post.category}</td>
                    <td className="py-4">
                      {post.publishDate ? formatDate(post.publishDate) : '-'}
                    </td>
                    <td className="py-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(post.status)}`}>
                        {getStatusLabel(post.status)}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex justify-end gap-2">
                        {post.status === 'published' && (
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/blog/${post.id}`}>
                              <Eye size={18} />
                            </Link>
                          </Button>
                        )}
                        <Button variant="ghost" size="icon">
                          <Edit size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-gray-500">
                    Aucun article trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">
              Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredPosts.length)} sur {filteredPosts.length} articles
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
    </AdminLayout>
  );
};

export default Blog;
