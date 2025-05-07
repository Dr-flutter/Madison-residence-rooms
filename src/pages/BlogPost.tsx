import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

// Types pour un article de blog
interface BlogPost {
  id: string;
  title: string;
  content: string;
  coverImage: string;
  author: string;
  date: string;
  category: string;
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation d'une requête API pour récupérer un article spécifique
    const fetchPost = () => {
      setLoading(true);
      
      // Données simulées pour les articles de blog
      const blogPosts: BlogPost[] = [
        {
          id: '1',
          title: 'Les 5 plus belles plages à découvrir à Kribi',
          content: `
            <p>Kribi, surnommée "la ville aux mille plaisirs", est réputée pour ses magnifiques plages de sable doré. Voici notre sélection des 5 plus belles plages que vous devez absolument découvrir lors de votre séjour à la Résidence Madison.</p>
            
            <h2>1. La Grande plage de Kribi</h2>
            <p>S'étendant sur plusieurs kilomètres, la Grande plage est l'endroit idéal pour se prélasser au soleil. Son sable fin et ses eaux calmes en font un paradis pour les familles. Ne manquez pas le coucher de soleil qui offre un spectacle magique.</p>
            
            <h2>2. La plage de Londji</h2>
            <p>Située à environ 15 km au nord de Kribi, la plage de Londji est moins fréquentée mais tout aussi splendide. C'est là que vous pourrez observer les pêcheurs traditionnels ramener leurs prises du jour. Un spectacle authentique qui mérite le détour.</p>
            
            <h2>3. La plage d'Ebodjé</h2>
            <p>Pour les amateurs de nature préservée, Ebodjé est un véritable joyau. Cette longue étendue de sable est bordée par une végétation luxuriante. C'est également un site de ponte pour les tortues marines pendant certaines périodes de l'année.</p>
            
            <h2>4. La plage de Grand Batanga</h2>
            <p>À environ 7 km au sud de Kribi, Grand Batanga offre une ambiance plus tranquille loin de l'agitation touristique. Ses eaux cristallines sont parfaites pour la baignade et le snorkeling.</p>
            
            <h2>5. La Crique des Pêcheurs</h2>
            <p>Nichée entre les rochers, cette petite crique secrète n'est accessible que par un sentier côtier. L'effort en vaut la peine : vous y trouverez une intimité rare et des paysages à couper le souffle.</p>
            
            <p>Quelle que soit la plage que vous choisirez d'explorer, n'oubliez pas votre crème solaire, de l'eau et votre appareil photo pour immortaliser ces moments magiques.</p>
          `,
          coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
          author: 'Jeanne Ndam',
          date: '2023-05-15',
          category: 'Destinations'
        },
        {
          id: '2',
          title: 'La cuisine camerounaise : saveurs et traditions',
          content: `
            <p>La cuisine camerounaise est un véritable voyage des sens, reflet de la diversité culturelle du pays. À la Résidence Madison, nous sommes fiers de vous faire découvrir ces saveurs authentiques.</p>
            
            <h2>Des influences multiples</h2>
            <p>Située au carrefour de l'Afrique centrale et occidentale, la cuisine camerounaise s'inspire des traditions culinaires de plus de 250 ethnies. Cette diversité se traduit par une richesse de saveurs unique au monde, où épices, légumes frais et techniques ancestrales se rencontrent.</p>
            
            <h2>Les plats emblématiques</h2>
            <p>Parmi les plats que vous pourrez déguster à la Résidence Madison :</p>
            <ul>
              <li><strong>Le Ndolé</strong> : considéré comme le plat national, il est préparé à base de feuilles amères, de pâte d'arachide et de poisson ou de viande.</li>
              <li><strong>Le Mbongo Tchobi</strong> : une sauce noire épicée préparée avec des épices carbonisées, accompagnant poisson ou viande.</li>
              <li><strong>Le Sanga</strong> : un délicieux mélange de maïs frais et de feuilles de manioc.</li>
              <li><strong>Le Poulet DG</strong> : un plat moderne devenu incontournable, à base de poulet frit et de plantains mûrs.</li>
            </ul>
            
            <h2>Les produits locaux de Kribi</h2>
            <p>À Kribi, la fraîcheur des produits est reine. Chaque matin, nos cuisiniers se rendent au marché local pour sélectionner les meilleurs poissons fraîchement pêchés et les fruits et légumes de saison cultivés dans la région.</p>
            
            <h2>Une expérience à partager</h2>
            <p>Dans la tradition camerounaise, les repas sont des moments de partage. C'est pourquoi notre restaurant propose régulièrement des soirées thématiques où vous pourrez déguster des spécialités locales dans une ambiance conviviale.</p>
            
            <p>Lors de votre séjour à la Résidence Madison, ne manquez pas notre atelier d'initiation à la cuisine camerounaise, où notre chef vous dévoilera quelques secrets de préparation que vous pourrez rapporter chez vous !</p>
          `,
          coverImage: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
          author: 'Paul Etoga',
          date: '2023-06-22',
          category: 'Cuisine'
        },
        {
          id: '3',
          title: 'Les chutes de la Lobé : merveille naturelle',
          content: `
            <p>À seulement quelques kilomètres au sud de Kribi se trouve l'un des spectacles naturels les plus impressionnants d'Afrique : les chutes de la Lobé, où une rivière se jette directement dans l'océan Atlantique.</p>
            
            <h2>Un phénomène rare</h2>
            <p>Les chutes de la Lobé constituent l'un des rares endroits au monde où une rivière se déverse directement dans l'océan. Ce phénomène géologique unique crée un contraste saisissant entre l'eau douce et l'eau salée, dans un cadre de végétation luxuriante.</p>
            
            <h2>Comment s'y rendre</h2>
            <p>Depuis la Résidence Madison, plusieurs options s'offrent à vous :</p>
            <ul>
              <li>En taxi : trajet d'environ 20 minutes (5 000 FCFA)</li>
              <li>En moto-taxi : plus rapide mais moins confortable (2 000 FCFA)</li>
              <li>Par notre service d'excursion : départ chaque matin à 9h avec guide inclus</li>
            </ul>
            
            <h2>L'expérience complète</h2>
            <p>Une visite aux chutes de la Lobé est plus qu'une simple observation de la nature. Sur place, vous pourrez :</p>
            <ul>
              <li>Traverser la rivière en pirogue traditionnelle pour admirer les chutes depuis l'océan</li>
              <li>Observer les rituels des Pygmées Baguiéli qui considèrent ce lieu comme sacré</li>
              <li>Vous baigner dans des bassins naturels à proximité des chutes</li>
              <li>Déguster des poissons grillés préparés par les pêcheurs locaux</li>
            </ul>
            
            <h2>Conseils pratiques</h2>
            <p>Pour profiter pleinement de votre visite :</p>
            <ul>
              <li>Portez des chaussures imperméables ou prévoyez d'aller pieds nus</li>
              <li>Apportez un appareil photo protégé contre les éclaboussures</li>
              <li>Prévoyez de l'argent liquide pour les guides locaux et les traversées en pirogue</li>
              <li>Le matin est le meilleur moment pour éviter l'affluence touristique</li>
            </ul>
            
            <p>À la réception de la Résidence Madison, n'hésitez pas à demander plus d'informations sur cette excursion incontournable lors de votre séjour à Kribi.</p>
          `,
          coverImage: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
          author: 'Sophie Mbarga',
          date: '2023-07-10',
          category: 'Aventures'
        },
        {
          id: '4',
          title: 'Un week-end parfait à Kribi : notre itinéraire',
          content: `
            <p>Vous n'avez qu'un week-end pour découvrir Kribi ? Pas de panique ! Voici notre itinéraire idéal pour profiter au maximum de ce joyau côtier du Cameroun en seulement deux jours.</p>
            
            <h2>Jour 1 : À la découverte de Kribi</h2>
            
            <h3>Matinée</h3>
            <p>Commencez votre journée par un petit-déjeuner sur la terrasse de la Résidence Madison avec vue sur le jardin tropical. Puis dirigez-vous vers la plage de Kribi pour une balade matinale loin de la chaleur intense de l'après-midi. Observez les pêcheurs qui reviennent avec leurs prises du jour.</p>
            
            <h3>Déjeuner</h3>
            <p>Rendez-vous au marché central pour déguster un poisson grillé fraîchement pêché, accompagné de plantains et de légumes locaux.</p>
            
            <h3>Après-midi</h3>
            <p>Visitez le phare de Kribi, puis partez en excursion aux chutes de la Lobé. Ce spectacle naturel impressionnant où la rivière se jette directement dans l'océan est un incontournable. Profitez-en pour faire une traversée en pirogue.</p>
            
            <h3>Soirée</h3>
            <p>Dîner aux fruits de mer à la Résidence Madison, suivi d'une promenade digestive sur la plage éclairée par la lune.</p>
            
            <h2>Jour 2 : Détente et culture</h2>
            
            <h3>Matinée</h3>
            <p>Partez tôt pour visiter un village de pêcheurs traditionnel à Grand Batanga. Vous pourrez y observer la construction de pirogues et échanger avec les habitants sur leur mode de vie.</p>
            
            <h3>Déjeuner</h3>
            <p>Pique-nique sur la plage de Grand Batanga, loin de l'agitation touristique.</p>
            
            <h3>Après-midi</h3>
            <p>Retour à Kribi pour une séance de détente : massage traditionnel à base d'huiles locales à la Résidence Madison, suivi d'une sieste au bord de la piscine.</p>
            
            <h3>Soirée</h3>
            <p>Pour votre dernière soirée, offrez-vous un dîner romantique les pieds dans le sable dans l'un des restaurants de fruits de mer réputés de Kribi. Ne manquez pas de goûter à la "sauce jaune", une spécialité locale à base de fruits de mer.</p>
            
            <h2>Conseils pratiques</h2>
            <ul>
              <li>Prévoyez de l'argent liquide car tous les établissements n'acceptent pas les cartes bancaires</li>
              <li>Réservez vos excursions à l'avance à la réception de la Résidence Madison</li>
              <li>Portez toujours une protection solaire, même par temps nuageux</li>
              <li>Un petit sac imperméable est idéal pour protéger vos affaires lors des excursions en bord de mer</li>
            </ul>
            
            <p>Avec cet itinéraire, vous repartirez de Kribi avec des souvenirs plein la tête, même après un court séjour !</p>
          `,
          coverImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
          author: 'Jeanne Ndam',
          date: '2023-08-05',
          category: 'Conseils'
        },
        {
          id: '5',
          title: 'La pêche traditionnelle à Kribi : rencontre avec les pêcheurs locaux',
          content: `
            <p>À Kribi, la pêche n'est pas qu'une activité économique, c'est un art de vivre qui se transmet de génération en génération. Lors de votre séjour à la Résidence Madison, ne manquez pas l'opportunité de découvrir ce patrimoine culturel unique.</p>
            
            <h2>Une tradition ancestrale</h2>
            <p>Les techniques de pêche pratiquées à Kribi remontent à plusieurs siècles. Les pêcheurs Batanga et Yassa, principaux groupes ethniques côtiers de la région, ont développé des savoir-faire spécifiques adaptés aux différentes espèces marines qui peuplent ces eaux.</p>
            
            <h2>Les pirogues, emblèmes de la côte</h2>
            <p>Les pirogues traditionnelles de Kribi sont taillées dans un seul tronc d'arbre, généralement l'acajou ou le bubinga. Leur conception unique leur permet d'affronter les vagues parfois violentes de l'Atlantique tout en restant suffisamment légères pour être manipulées par un ou deux pêcheurs.</p>
            
            <h2>Une journée avec les pêcheurs</h2>
            <p>La Résidence Madison propose une excursion matinale pour vivre l'expérience de la pêche traditionnelle :</p>
            <ul>
              <li>Départ à l'aube (5h30) pour observer le rituel de préparation des filets</li>
              <li>Participation à une sortie en mer sur une pirogue (pour les plus aventureux)</li>
              <li>Aide au tri des poissons au retour sur la plage</li>
              <li>Apprentissage des techniques de conservation du poisson</li>
              <li>Participation à la préparation d'un plat traditionnel à base de poisson frais</li>
            </ul>
            
            <h2>Les défis de la pêche moderne</h2>
            <p>Aujourd'hui, les pêcheurs de Kribi font face à de nombreux défis : changement climatique, diminution des stocks de poissons, concurrence des grands chalutiers industriels. Lors de votre rencontre avec eux, vous comprendrez mieux les enjeux de préservation de ce mode de vie.</p>
            
            <h2>Comment soutenir la pêche locale</h2>
            <p>Pendant votre séjour, plusieurs actions simples peuvent contribuer à soutenir cette activité traditionnelle :</p>
            <ul>
              <li>Privilégiez les restaurants qui s'approvisionnent directement auprès des pêcheurs locaux</li>
              <li>Achetez du poisson séché comme souvenir authentique</li>
              <li>Participez aux excursions respectueuses organisées par la Résidence Madison</li>
              <li>Respectez les zones de pêche lors de vos activités nautiques</li>
            </ul>
            
            <p>Une rencontre avec les pêcheurs de Kribi est bien plus qu'une simple activité touristique, c'est une immersion dans l'âme même de cette région côtière du Cameroun.</p>
          `,
          coverImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
          author: 'Sophie Mbarga',
          date: '2023-09-18',
          category: 'Culture'
        },
      ];
      
      const foundPost = blogPosts.find(p => p.id === id);
      setPost(foundPost || null);
      setLoading(false);
    };
    
    fetchPost();
  }, [id]);

  // Formatage de la date en français
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd MMMM yyyy', { locale: fr });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-burgundy"></div>
          </div>
        ) : post ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/blog">
              <Button variant="ghost" className="mb-6 flex items-center gap-2 text-burgundy hover:bg-burgundy/10">
                <ChevronLeft size={18} />
                Retour aux articles
              </Button>
            </Link>
            
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <div className="bg-burgundy text-white text-sm px-3 py-1 rounded inline-block mb-4">
                  {post.category}
                </div>
                <h1 className="text-4xl font-bold text-burgundy mb-4">{post.title}</h1>
                <div className="flex items-center text-gray-600 mb-8">
                  <span className="mr-4">Par {post.author}</span>
                  <span>{formatDate(post.date)}</span>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden mb-10 shadow-lg">
                <img 
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}>
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Vous pourriez aussi aimer</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Link to="/blog/2" className="group">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1472396961693-142e6e269027"
                          alt="Article suggéré"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-burgundy transition-colors">
                          La cuisine camerounaise : saveurs et traditions
                        </h4>
                        <p className="text-sm text-gray-500">22 juin 2023</p>
                      </div>
                    </div>
                  </Link>
                  
                  <Link to="/blog/3" className="group">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1500673922987-e212871fec22"
                          alt="Article suggéré"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-burgundy transition-colors">
                          Les chutes de la Lobé : merveille naturelle
                        </h4>
                        <p className="text-sm text-gray-500">10 juillet 2023</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Article non trouvé</h2>
            <p className="text-gray-500 mb-8">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
            <Link to="/blog">
              <Button className="bg-burgundy hover:bg-burgundy-800">
                Retour au blog
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BlogPost;
