import apiInstance from './apiConfig';

export const fetchItems = async () => {
  try {
    const response = await apiInstance.get('/api/items');
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const createItem = async (itemData) => {
  try {
    const response = await apiInstance.post('/api/items', itemData);
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

export const updateItem = async (id, itemData) => {
  try {
    const response = await apiInstance.put(`/api/items/${id}`, itemData);
    return response.data;
  } catch (error) {
    console.error(`Error updating item with ID ${id}:`, error);
    throw error;
  }
};
