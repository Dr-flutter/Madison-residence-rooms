
import Layout from '@/components/Layout';
import ReservationForm from '@/components/reservation/ReservationForm';
import { roomsData } from '@/data/mockData';

const Reservation = () => {
  return (
    <Layout>
      <section className="bg-gray-50 py-10 pt-24 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Réservation</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complétez le formulaire ci-dessous pour réserver votre séjour à la Résidence Madison à Kribi.
            </p>
          </div>
          
          <ReservationForm rooms={roomsData} />
        </div>
      </section>
    </Layout>
  );
};

export default Reservation;
