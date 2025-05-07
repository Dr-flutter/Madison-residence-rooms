
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';

// Types pour les articles de blog
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  date: string;
  category: string;
}

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Données simulées pour les articles de blog
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Les 5 plus belles plages à découvrir à Kribi',
      excerpt: 'Découvrez notre sélection des plus belles plages de Kribi, du sable doré aux criques secrètes.',
      content: 'Contenu complet de l\'article sur les plages de Kribi...',
      coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      author: 'Jeanne Ndam',
      date: '2023-05-15',
      category: 'Destinations'
    },
    {
      id: '2',
      title: 'La cuisine camerounaise : saveurs et traditions',
      excerpt: 'Un voyage culinaire au cœur des saveurs camerounaises, entre tradition et modernité.',
      content: 'Contenu complet de l\'article sur la cuisine camerounaise...',
      coverImage: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      author: 'Paul Etoga',
      date: '2023-06-22',
      category: 'Cuisine'
    },
    {
      id: '3',
      title: 'Les chutes de la Lobé : merveille naturelle',
      excerpt: 'Comment visiter les célèbres chutes de la Lobé où l\'eau se jette directement dans l\'océan.',
      content: 'Contenu complet de l\'article sur les chutes de la Lobé...',
      coverImage: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
      author: 'Sophie Mbarga',
      date: '2023-07-10',
      category: 'Aventures'
    },
    {
      id: '4',
      title: 'Un week-end parfait à Kribi : notre itinéraire',
      excerpt: 'Comment profiter au maximum d\'un court séjour à Kribi avec notre itinéraire sur mesure.',
      content: 'Contenu complet de l\'article sur l\'itinéraire à Kribi...',
      coverImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      author: 'Jeanne Ndam',
      date: '2023-08-05',
      category: 'Conseils'
    },
    {
      id: '5',
      title: 'La pêche traditionnelle à Kribi : rencontre avec les pêcheurs locaux',
      excerpt: 'Immersion dans le quotidien des pêcheurs de Kribi, gardiens d\'un savoir-faire ancestral.',
      content: 'Contenu complet de l\'article sur la pêche traditionnelle...',
      coverImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      author: 'Sophie Mbarga',
      date: '2023-09-18',
      category: 'Culture'
    }
  ];

  // Filtrer les articles en fonction de la recherche
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Formatage de la date en français
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd MMMM yyyy', { locale: fr });
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
          <h1 className="text-4xl font-bold text-burgundy mb-4">Notre blog</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez nos articles sur Kribi, le tourisme au Cameroun et nos conseils de voyage.
          </p>
        </motion.div>

        {/* Barre de recherche */}
        <div className="max-w-xl mx-auto mb-12">
          <Input
            type="text"
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Liste des articles */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-burgundy text-white text-xs px-2 py-1 rounded">
                      {post.category}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl hover:text-burgundy transition-colors">
                      <Link to={`/blog/${post.id}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                      Par {post.author} • {formatDate(post.date)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-700">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/blog/${post.id}`}>
                      <Button variant="ghost" className="text-burgundy hover:bg-burgundy/10">
                        Lire l'article
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">Aucun article ne correspond à votre recherche.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Blog;
