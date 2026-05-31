export interface Booking {
  id?: string;
  fullName: string;
  phone: string;
  email: string;
  serviceType: string;
  preferredDate: Date;
  preferredTime: string;
  notes?: string;
  createdAt?: Date;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface BookingResponse {
  success: boolean;
  message: string;
  bookingId?: string;
}
