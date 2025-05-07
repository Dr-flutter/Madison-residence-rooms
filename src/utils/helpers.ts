
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

/**
 * Calculate the number of days between two dates
 */
export const daysBetween = (startDate: Date, endDate: Date): number => {
  // Convert to UTC to avoid timezone and DST issues
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  
  // Calculate difference in milliseconds
  const diffTime = Math.abs(end.getTime() - start.getTime());
  
  // Convert to days and return
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Calculate the total price for a booking
 */
export const calculateBookingPrice = (pricePerNight: number, checkIn: Date, checkOut: Date): number => {
  const nights = daysBetween(checkIn, checkOut);
  return pricePerNight * nights;
};
