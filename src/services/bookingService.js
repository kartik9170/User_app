const wait = () => new Promise((resolve) => setTimeout(resolve, 300));
export const createBookingRequest = async (data) => { await wait(); return { success: true, booking: data }; };
export const updateBookingStatus = async (bookingId, status) => { await wait(); return { success: true, bookingId, status }; };
