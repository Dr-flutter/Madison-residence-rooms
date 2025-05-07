
import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash, Check } from 'lucide-react';
import { Customer } from '@/types';
import AdminLayout from '@/components/admin/AdminLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { formatDate } from '@/utils/helpers';

// Mock client data - In a real application, this would come from the API
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '+237 691234567',
    address: 'Douala, Cameroun',
    nationality: 'Camerounaise',
    bookings: ['booking1', 'booking2'],
    createdAt: new Date('2024-03-15')
  },
  {
    id: '2',
    name: 'Marie Lefèvre',
    email: 'marie.lefevre@example.com',
    phone: '+33 612345678',
    address: 'Paris, France',
    nationality: 'Française',
    bookings: ['booking3'],
    createdAt: new Date('2024-04-01')
  },
  {
    id: '3',
    name: 'Samuel Johnson',
    email: 'samuel.johnson@example.com',
    phone: '+1 555-1234',
    address: 'New York, USA',
    nationality: 'Américaine',
    bookings: [],
    createdAt: new Date('2024-04-12')
  },
  {
    id: '4',
    name: 'Fatou Diallo',
    email: 'fatou.diallo@example.com',
    phone: '+221 771234567',
    address: 'Dakar, Sénégal',
    nationality: 'Sénégalaise',
    bookings: ['booking4', 'booking5'],
    createdAt: new Date('2024-02-25')
  }
];

const ClientsPage = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    name: '',
    email: '',
    phone: '',
    address: '',
    nationality: '',
    bookings: [],
  });

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCustomers(customers);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      setFilteredCustomers(
        customers.filter(
          customer =>
            customer.name.toLowerCase().includes(lowerCaseQuery) ||
            customer.email.toLowerCase().includes(lowerCaseQuery) ||
            customer.phone.includes(searchQuery)
        )
      );
    }
  }, [searchQuery, customers]);

  const handleAddCustomer = () => {
    const customerId = `customer${Math.floor(Math.random() * 1000)}`;
    const customer: Customer = {
      id: customerId,
      name: newCustomer.name || '',
      email: newCustomer.email || '',
      phone: newCustomer.phone || '',
      address: newCustomer.address || '',
      nationality: newCustomer.nationality || '',
      bookings: [],
      createdAt: new Date(),
    };

    setCustomers([...customers, customer]);
    setIsAddDialogOpen(false);
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      address: '',
      nationality: '',
      bookings: [],
    });
    toast({
      title: "Client ajouté",
      description: "Le client a été ajouté avec succès",
    });
  };

  const handleEditCustomer = () => {
    if (!currentCustomer) return;

    const updatedCustomers = customers.map(customer =>
      customer.id === currentCustomer.id ? currentCustomer : customer
    );

    setCustomers(updatedCustomers);
    setIsEditDialogOpen(false);
    toast({
      title: "Client modifié",
      description: "Les informations du client ont été mises à jour",
    });
  };

  const handleDeleteCustomer = () => {
    if (!currentCustomer) return;

    setCustomers(customers.filter(customer => customer.id !== currentCustomer.id));
    setIsDeleteDialogOpen(false);
    toast({
      title: "Client supprimé",
      description: "Le client a été supprimé avec succès",
      variant: "destructive",
    });
  };

  const openEditDialog = (customer: Customer) => {
    setCurrentCustomer(customer);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (customer: Customer) => {
    setCurrentCustomer(customer);
    setIsDeleteDialogOpen(true);
  };

  return (
    <AdminLayout title="Gestion des clients">
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Rechercher un client..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-burgundy hover:bg-burgundy-800 w-full sm:w-auto">
            <Plus size={16} className="mr-2" /> Ajouter un client
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Nationalité</TableHead>
                <TableHead>Date d'ajout</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.nationality || '-'}</TableCell>
                    <TableCell>{formatDate(customer.createdAt)}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(customer)}
                        className="h-8 w-8 p-0 inline-flex items-center justify-center"
                      >
                        <Edit size={14} />
                        <span className="sr-only">Modifier</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDeleteDialog(customer)}
                        className="h-8 w-8 p-0 inline-flex items-center justify-center text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash size={14} />
                        <span className="sr-only">Supprimer</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                    Aucun client trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Client Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau client</DialogTitle>
            <DialogDescription>
              Saisissez les informations du nouveau client.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom</label>
                <Input
                  placeholder="Nom du client"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  placeholder="Email du client"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Téléphone</label>
                <Input
                  placeholder="Numéro de téléphone"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Adresse (optionnel)</label>
                <Input
                  placeholder="Adresse"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nationalité (optionnel)</label>
                <Input
                  placeholder="Nationalité"
                  value={newCustomer.nationality}
                  onChange={(e) => setNewCustomer({ ...newCustomer, nationality: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button className="bg-burgundy hover:bg-burgundy-800" onClick={handleAddCustomer}>
              <Check size={16} className="mr-2" />
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Client Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier le client</DialogTitle>
            <DialogDescription>
              Modifiez les informations du client.
            </DialogDescription>
          </DialogHeader>
          {currentCustomer && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nom</label>
                  <Input
                    placeholder="Nom du client"
                    value={currentCustomer.name}
                    onChange={(e) => setCurrentCustomer({ ...currentCustomer, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    type="email"
                    placeholder="Email du client"
                    value={currentCustomer.email}
                    onChange={(e) => setCurrentCustomer({ ...currentCustomer, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Téléphone</label>
                  <Input
                    placeholder="Numéro de téléphone"
                    value={currentCustomer.phone}
                    onChange={(e) => setCurrentCustomer({ ...currentCustomer, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Adresse (optionnel)</label>
                  <Input
                    placeholder="Adresse"
                    value={currentCustomer.address || ''}
                    onChange={(e) => setCurrentCustomer({ ...currentCustomer, address: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nationalité (optionnel)</label>
                  <Input
                    placeholder="Nationalité"
                    value={currentCustomer.nationality || ''}
                    onChange={(e) => setCurrentCustomer({ ...currentCustomer, nationality: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button className="bg-burgundy hover:bg-burgundy-800" onClick={handleEditCustomer}>
              <Check size={16} className="mr-2" />
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Client Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Supprimer le client</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce client ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          {currentCustomer && (
            <div className="py-4">
              <p><strong>Nom :</strong> {currentCustomer.name}</p>
              <p><strong>Email :</strong> {currentCustomer.email}</p>
              <p><strong>Téléphone :</strong> {currentCustomer.phone}</p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteCustomer}
            >
              <Trash size={16} className="mr-2" />
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ClientsPage;
