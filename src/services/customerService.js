import apiInstance from './apiConfig';

export const fetchCustomers = async () => {
  try {
    const response = await apiInstance.get('api/customers');
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const addCustomer = async (customerData) => {
  try {
    const response = await apiInstance.post('/api/Customers', customerData);
    return response.data;
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error;
  }
};