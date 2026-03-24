import React, { createContext, useMemo, useState } from 'react';
import { BOOKING_STATUS } from '../utils/constants';
import { generateId } from '../utils/helpers';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  const addBooking = (payload) => {
    const newBooking = { id: generateId('booking'), status: BOOKING_STATUS.PENDING, createdAt: new Date().toISOString(), ...payload };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBooking = (id, updates) => setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));

  const value = useMemo(() => ({ bookings, addBooking, updateBooking }), [bookings]);
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};
