import apiInstance from './apiConfig';

export const fetchItems = async () => {
  try {
    const response = await apiInstance.get('/api/Items');
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const createItem = async (itemData) => {
  try {
    console.log('Sending item data:', itemData);

    const response = await apiInstance.post('/api/Items', itemData);
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};


export const updateItem = async (id, itemData) => {
  try {
    console.log('Sending item data:', itemData);

    const response = await apiInstance.put(`/api/Items/${id}`, itemData);
    return response.data;
  } catch (error) {
    console.error(`Error updating item with ID ${id}:`, error);
    throw error;
  }
};
