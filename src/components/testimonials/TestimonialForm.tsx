
import { useState } from 'react';
import { Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const TestimonialForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for star hover effect
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !content || !rating) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs et attribuer une note.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Merci pour votre avis !",
        description: "Votre témoignage a été soumis avec succès et sera publié après modération.",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setContent('');
      setRating(0);
      setHoverRating(0);
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Partagez votre expérience</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Nom</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Votre email ne sera pas publié.</p>
        </div>
        
        <div>
          <Label htmlFor="rating" className="mb-2 inline-block">Note</Label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= (hoverRating || rating)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <Label htmlFor="content">Votre avis</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Partagez votre expérience à la Résidence Madison..."
            rows={4}
            required
          />
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          <input type="checkbox" id="consent" required />
          <Label htmlFor="consent" className="text-sm">
            J'accepte que mon avis et mon nom soient publiés sur le site.
          </Label>
        </div>
        
        <Button 
          type="submit" 
          className="bg-burgundy hover:bg-burgundy-800"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Soumettre mon avis'}
        </Button>
      </form>
    </div>
  );
};

export default TestimonialForm;
