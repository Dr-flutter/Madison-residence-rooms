export interface Room {
  id: string;
  name: string;
  description: string;
  shortDescription?: string; // Added this optional property
  price: number;
  capacity: number;
  type: RoomType;
  images: string[];
  amenities: string[];
  available: boolean;
  featured?: boolean;
  promo?: boolean; // Added this optional property
}

export type RoomType = 'standard' | 'vip' | 'suite' | 'luxe' | 'duplex';

export interface Booking {
  id: string;
  roomId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  checkIn: Date;
  checkOut: Date;
  status: BookingStatus;
  totalPrice: number;
  paymentMethod?: PaymentMethod;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  guests: number;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'pending' | 'partial' | 'completed' | 'refunded';
export type PaymentMethod = 'cash' | 'orange_money' | 'mobile_money' | 'paypal';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  nationality?: string;
  bookings: string[];
  createdAt: Date;
}

export interface Testimonial {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: Date;
  approved: boolean;
  image?: string;
  customerEmail?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: Date;
  image?: string;
  tags: string[];
  published: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  featured?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export type UserRole = 'admin' | 'receptionist' | 'manager';

export interface DashboardStats {
  totalBookings: number;
  upcomingBookings: number;
  revenue: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    thisYear: number;
  };
  occupancyRate: number;
  totalCustomers: number;
  popularRooms: {
    roomId: string;
    bookingCount: number;
    roomName: string;
  }[];
}
