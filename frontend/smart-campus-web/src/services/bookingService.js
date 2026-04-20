import api from './api';

export const getUserBookings = async () => {
  try {
    const response = await api.get('/api/user/bookings');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/api/user/bookings', bookingData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelBooking = async (id) => {
  try {
    const response = await api.put(`/api/user/bookings/${id}/cancel`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
