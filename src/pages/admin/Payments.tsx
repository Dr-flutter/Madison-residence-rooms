import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Download, FileText, Plus, PlusCircle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { formatPrice, formatDate } from '@/utils/helpers';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// Mock data for payments
const paymentsData = [
  { id: 'PAY-1', bookingId: 'B-001', customerName: 'Sophie Dubois', amount: 125000, date: new Date('2024-04-28'), method: 'Carte', status: 'completed', type: 'automatique', invoiceNumber: 'F-2024-001' },
  { id: 'PAY-2', bookingId: 'B-002', customerName: 'Thomas Martin', amount: 180000, date: new Date('2024-04-27'), method: 'PayPal', status: 'completed', type: 'automatique', invoiceNumber: 'F-2024-002' },
  { id: 'PAY-3', bookingId: 'B-003', customerName: 'Léa Girard', amount: 95000, date: new Date('2024-04-26'), method: 'Virement', status: 'completed', type: 'manuelle', invoiceNumber: 'F-2024-003' },
  { id: 'PAY-4', bookingId: 'B-004', customerName: 'Antoine Petit', amount: 150000, date: new Date('2024-04-25'), method: 'Carte', status: 'pending', type: 'automatique', invoiceNumber: 'F-2024-004' },
  { id: 'PAY-5', bookingId: 'B-005', customerName: 'Claire Nguyen', amount: 200000, date: new Date('2024-04-24'), method: 'Mobile Money', status: 'completed', type: 'manuelle', invoiceNumber: 'F-2024-005' },
  { id: 'PAY-6', bookingId: 'B-006', customerName: 'Lucas Fournier', amount: 135000, date: new Date('2024-04-23'), method: 'Carte', status: 'failed', type: 'automatique', invoiceNumber: 'F-2024-006' },
  { id: 'PAY-7', bookingId: 'B-007', customerName: 'Emma Leroy', amount: 110000, date: new Date('2024-04-22'), method: 'Carte', status: 'completed', type: 'automatique', invoiceNumber: 'F-2024-007' },
  { id: 'PAY-8', bookingId: 'B-008', customerName: 'Hugo Moreau', amount: 165000, date: new Date('2024-04-21'), method: 'Virement', status: 'pending', type: 'manuelle', invoiceNumber: 'F-2024-008' },
];

const Payments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);
  const itemsPerPage = 10;

  // Form states for manual invoice
  const [customerName, setCustomerName] = useState('');
  const [roomType, setRoomType] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  
  // Filter payments based on search term and type
  const filteredPayments = paymentsData.filter(payment => {
    const matchesSearch = 
      payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === null || payment.type === typeFilter;
    
    return matchesSearch && matchesType;
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage);
  
  const handleDownloadReceipt = (paymentId: string) => {
    toast({
      title: "Téléchargement de reçu",
      description: `Le reçu pour le paiement ${paymentId} est en cours de téléchargement.`,
    });
  };
  
  const handleCreateManualInvoice = () => {
    if (!customerName || !roomType || !amount) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Facture créée",
      description: `Une nouvelle facture manuelle a été créée pour ${customerName}.`,
    });

    // Reset form fields
    setCustomerName('');
    setRoomType('');
    setAmount('');
    setPaymentMethod('cash');
    setShowInvoiceDialog(false);
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'completed':
        return 'Payé';
      case 'pending':
        return 'En attente';
      case 'failed':
        return 'Échoué';
      default:
        return status;
    }
  };

  const getTypeLabel = (type: string) => {
    return type === 'automatique' ? 'Automatique' : 'Manuelle';
  };
  
  return (
    <AdminLayout title="Gestion des Paiements">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="pl-10"
                placeholder="Rechercher un paiement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant={typeFilter === null ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter(null)}
              >
                Tous
              </Button>
              <Button 
                variant={typeFilter === "automatique" ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter("automatique")}
              >
                Automatiques
              </Button>
              <Button 
                variant={typeFilter === "manuelle" ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter("manuelle")}
              >
                Manuelles
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Dialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle size={18} className="mr-2" />
                  Nouvelle facture
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Créer une facture manuelle</DialogTitle>
                  <DialogDescription>
                    Remplissez ce formulaire pour créer une facture pour une réservation en présentiel.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customer" className="text-right">
                      Client
                    </Label>
                    <Input
                      id="customer"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="col-span-3"
                      placeholder="Nom du client"
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="room-type" className="text-right">
                      Chambre
                    </Label>
                    <Select value={roomType} onValueChange={setRoomType}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner une chambre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chambre-alfais">Chambre Alfaïs</SelectItem>
                        <SelectItem value="chambre-richard">Chambre Richard</SelectItem>
                        <SelectItem value="chambre-anais">Chambre Anaïs</SelectItem>
                        <SelectItem value="chambre-yoan">Chambre Yoan</SelectItem>
                        <SelectItem value="studio-viviane">Studio Viviane</SelectItem>
                        <SelectItem value="duplex-elodie">Duplex Elodie</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                      Montant (FCFA)
                    </Label>
                    <Input
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="col-span-3"
                      type="number"
                      placeholder="Montant en FCFA"
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="payment-method" className="text-right">
                      Méthode
                    </Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Méthode de paiement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Espèces</SelectItem>
                        <SelectItem value="card">Carte bancaire</SelectItem>
                        <SelectItem value="mobile_money">Mobile Money</SelectItem>
                        <SelectItem value="orange_money">Orange Money</SelectItem>
                        <SelectItem value="transfer">Virement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowInvoiceDialog(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleCreateManualInvoice}>
                    Créer la facture
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline">
              <Download size={18} className="mr-2" />
              Exporter
            </Button>
          </div>
        </div>
        
        {/* Payments Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3 font-medium">Facture</th>
                <th className="pb-3 font-medium">Réservation</th>
                <th className="pb-3 font-medium">Client</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Montant</th>
                <th className="pb-3 font-medium">Méthode</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Statut</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPayments.length > 0 ? (
                paginatedPayments.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="py-4 font-medium">{payment.invoiceNumber}</td>
                    <td className="py-4">{payment.bookingId}</td>
                    <td className="py-4">{payment.customerName}</td>
                    <td className="py-4">{formatDate(payment.date)}</td>
                    <td className="py-4">{formatPrice(payment.amount)}</td>
                    <td className="py-4">{payment.method}</td>
                    <td className="py-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        payment.type === 'automatique'
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {getTypeLabel(payment.type)}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(payment.status)}`}>
                        {getStatusLabel(payment.status)}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownloadReceipt(payment.id)}
                        >
                          <FileText size={18} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-4 text-center text-gray-500">
                    Aucun paiement trouvé.
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
              Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredPayments.length)} sur {filteredPayments.length} paiements
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

export default Payments;