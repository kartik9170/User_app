import servicesData from '../data/servicesData';
const wait = () => new Promise((resolve) => setTimeout(resolve, 200));
export const fetchServices = async () => { await wait(); return servicesData; };
export const fetchServiceById = async (id) => { await wait(); return servicesData.find((s) => s.id === id); };
