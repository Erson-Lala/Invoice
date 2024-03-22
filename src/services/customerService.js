import apiInstance from './apiConfig';

export const fetchCustomers = async () => {
  try {
    const response = await apiInstance.get('/customers');
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};
