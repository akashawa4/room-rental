// Booking Types
export const bookingTypes = {
  INQUIRY: 'inquiry',
  BOOKING: 'booking',
  VIEWING: 'viewing'
};

// Booking Statuses
export const bookingStatuses = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed'
};

// Sample bookings data
export const sampleBookings = [
  {
    id: '1',
    roomId: 'room1',
    userId: 'user1',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    userPhone: '+91 9876543210',
    type: bookingTypes.INQUIRY,
    status: bookingStatuses.PENDING,
    message: 'Interested in this room',
    requestedDate: '2024-01-15',
    requestedTime: '14:00',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  }
];

// Local Storage Keys
const BOOKINGS_STORAGE_KEY = 'nivasi_bookings';

// Get bookings from localStorage
export const getBookingsFromStorage = () => {
  try {
    const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading bookings from storage:', error);
    return [];
  }
};

// Save bookings to localStorage
export const saveBookingsToStorage = (bookings) => {
  try {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
  } catch (error) {
    console.error('Error saving bookings to storage:', error);
  }
};

// Add a new booking
export const addBooking = (bookingData) => {
  const bookings = getBookingsFromStorage();
  const newBooking = {
    ...bookingData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  bookings.push(newBooking);
  saveBookingsToStorage(bookings);
  return newBooking;
};

// Update an existing booking
export const updateBooking = (bookingId, updates) => {
  const bookings = getBookingsFromStorage();
  const index = bookings.findIndex(booking => booking.id === bookingId);
  
  if (index !== -1) {
    bookings[index] = {
      ...bookings[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveBookingsToStorage(bookings);
    return bookings[index];
  }
  
  return null;
};

// Delete a booking
export const deleteBooking = (bookingId) => {
  const bookings = getBookingsFromStorage();
  const filteredBookings = bookings.filter(booking => booking.id !== bookingId);
  saveBookingsToStorage(filteredBookings);
  return true;
};

// Get bookings by room ID
export const getBookingsByRoom = (roomId) => {
  const bookings = getBookingsFromStorage();
  return bookings.filter(booking => booking.roomId === roomId);
};

// Get bookings by user ID
export const getBookingsByUser = (userId) => {
  const bookings = getBookingsFromStorage();
  return bookings.filter(booking => booking.userId === userId);
};

// Get a specific booking by ID
export const getBookingById = (bookingId) => {
  const bookings = getBookingsFromStorage();
  return bookings.find(booking => booking.id === bookingId);
}; 