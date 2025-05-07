
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Coming Soon Page
import ComingSoon from "./pages/ComingSoon";

// Public Pages
import Index from "./pages/Index";
import Rooms from "./pages/Rooms";
import RoomDetail from "./pages/RoomDetail";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Reservation from "./pages/Reservation";
import ReservationConfirmed from "./pages/ReservationConfirmed";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminRooms from "./pages/admin/Rooms";
import AdminReservations from "./pages/admin/Reservations";
import AdminClients from "./pages/admin/Clients";
import AdminPayments from "./pages/admin/Payments";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminGallery from "./pages/admin/Gallery";
import AdminBlog from "./pages/admin/Blog";
import AdminSettings from "./pages/admin/Settings";
import AdminRGPD from "./pages/admin/RGPD";

// Context Providers
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

// Set this to true to show the Coming Soon page instead of the main application
const SHOW_COMING_SOON = false;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Coming Soon Route (when SHOW_COMING_SOON is true) */}
            {SHOW_COMING_SOON ? (
              <>
                <Route path="/" element={<ComingSoon />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            ) : (
              <>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/chambres" element={<Rooms />} />
                <Route path="/chambres/:id" element={<RoomDetail />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/reservation-confirmee" element={<ReservationConfirmed />} />
                <Route path="/a-propos" element={<About />} />
                <Route path="/galerie" element={<Gallery />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/chambres" element={<AdminRooms />} />
                <Route path="/admin/reservations" element={<AdminReservations />} />
                <Route path="/admin/clients" element={<AdminClients />} />
                <Route path="/admin/paiements" element={<AdminPayments />} />
                <Route path="/admin/temoignages" element={<AdminTestimonials />} />
                <Route path="/admin/galerie" element={<AdminGallery />} />
                <Route path="/admin/blog" element={<AdminBlog />} />
                <Route path="/admin/parametres" element={<AdminSettings />} />
                <Route path="/admin/rgpd" element={<AdminRGPD />} />
                
                {/* Catch-all route for 404 */}
                <Route path="*" element={<NotFound />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;