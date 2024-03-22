import apiInstance from './apiConfig';

export const fetchInvoices = async () => {
  try {
    const response = await apiInstance.get('/api/Invoices');
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
};

export const fetchInvoiceById = async (invoiceId) => {
  try {
    const response = await apiInstance.get(`/api/Invoices/${invoiceId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching invoice with ID ${invoiceId}:`, error);
    throw error;
  }
};
