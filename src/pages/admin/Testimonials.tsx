
import { useState } from 'react';
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Star, Check, X } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { formatDate } from '@/utils/helpers';

// Mock data for testimonials
const testimonialsData = [
  { 
    id: '1', 
    name: 'Marie Lefèvre', 
    content: 'Un séjour formidable! L\'hôtel est magnifique et le personnel très attentif.', 
    rating: 5, 
    date: new Date('2024-04-15'), 
    status: 'approved' 
  },
  { 
    id: '2', 
    name: 'Jean Dupont', 
    content: 'Très belle chambre avec une vue fantastique. Service impeccable.', 
    rating: 4, 
    date: new Date('2024-04-10'), 
    status: 'approved' 
  },
  { 
    id: '3', 
    name: 'Anne Martin', 
    content: 'Séjour agréable mais le petit-déjeuner pourrait être amélioré.', 
    rating: 3, 
    date: new Date('2024-04-05'), 
    status: 'approved' 
  },
  { 
    id: '4', 
    name: 'Paul Girard', 
    content: 'Personnel sympathique et chambres propres. Je recommande.', 
    rating: 4, 
    date: new Date('2024-04-01'), 
    status: 'approved' 
  },
  { 
    id: '5', 
    name: 'Sarah Petit', 
    content: 'Un hôtel de luxe avec un service exceptionnel!', 
    rating: 5, 
    date: new Date('2024-03-28'), 
    status: 'pending' 
  },
  { 
    id: '6', 
    name: 'Michel Bernard', 
    content: 'Propre et confortable, mais un peu cher pour ce qui est offert.', 
    rating: 3, 
    date: new Date('2024-03-20'), 
    status: 'pending' 
  },
  { 
    id: '7', 
    name: 'Sophie Moreau', 
    content: 'Une expérience inoubliable. Je reviendrai certainement!', 
    rating: 5, 
    date: new Date('2024-03-15'), 
    status: 'approved' 
  },
];

const Testimonials = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Filter testimonials based on search term and status
  const filteredTestimonials = testimonialsData.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === null || testimonial.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTestimonials = filteredTestimonials.slice(startIndex, startIndex + itemsPerPage);
  
  const handleDelete = (id: string) => {
    toast({
      title: "Témoignage supprimé",
      description: "Le témoignage a été supprimé avec succès.",
    });
  };
  
  const handleApprove = (id: string) => {
    toast({
      title: "Témoignage approuvé",
      description: "Le témoignage est maintenant visible sur le site.",
    });
  };
  
  const handleReject = (id: string) => {
    toast({
      title: "Témoignage rejeté",
      description: "Le témoignage a été rejeté et ne sera pas affiché.",
    });
  };
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i}
        size={16}
        className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'approved':
        return 'Approuvé';
      case 'pending':
        return 'En attente';
      case 'rejected':
        return 'Rejeté';
      default:
        return status;
    }
  };
  
  return (
    <AdminLayout title="Gestion des Témoignages">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="pl-10"
                placeholder="Rechercher un témoignage..."
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
                variant={statusFilter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("pending")}
              >
                En attente
              </Button>
              <Button 
                variant={statusFilter === "approved" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("approved")}
              >
                Approuvés
              </Button>
              <Button 
                variant={statusFilter === "rejected" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("rejected")}
              >
                Rejetés
              </Button>
            </div>
          </div>
        </div>
        
        {/* Testimonials Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3 font-medium">Client</th>
                <th className="pb-3 font-medium">Témoignage</th>
                <th className="pb-3 font-medium">Note</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Statut</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTestimonials.length > 0 ? (
                paginatedTestimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="border-b">
                    <td className="py-4 font-medium">{testimonial.name}</td>
                    <td className="py-4 max-w-xs truncate">{testimonial.content}</td>
                    <td className="py-4">
                      <div className="flex">
                        {renderStars(testimonial.rating)}
                      </div>
                    </td>
                    <td className="py-4">{formatDate(testimonial.date)}</td>
                    <td className="py-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(testimonial.status)}`}>
                        {getStatusLabel(testimonial.status)}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex justify-end gap-2">
                        {testimonial.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-green-600 hover:text-green-800 hover:bg-green-100"
                              onClick={() => handleApprove(testimonial.id)}
                            >
                              <Check size={18} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-800 hover:bg-red-100"
                              onClick={() => handleReject(testimonial.id)}
                            >
                              <X size={18} />
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="icon">
                          <Edit size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(testimonial.id)}
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
                    Aucun témoignage trouvé.
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
              Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredTestimonials.length)} sur {filteredTestimonials.length} témoignages
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

export default Testimonials;
