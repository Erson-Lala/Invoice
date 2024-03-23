import React, { useState, useEffect } from 'react';
import { fetchItems, createItem, updateItem } from '../../../services/itemService';
import Header from '../header/header';
import Footer from '../footer/footer';
import Modal from '../modal/modal';
import ItemForm from '../form/itemform';
import './itemmanagement.scss';

const ItemManagement = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const fetchedItems = await fetchItems();
        setItems(fetchedItems);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    loadItems();
  }, []);

  const handleOpenCreateModal = () => {
    setCurrentItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (itemData) => {
    try {
      if (currentItem) {
        await updateItem(currentItem.id, itemData);
      } else {
        await createItem(itemData);
      }
      setIsModalOpen(false);
      const fetchedItems = await fetchItems();
      setItems(fetchedItems);
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <div>
    <Header />
    <div className="item-management">
      <button onClick={handleOpenCreateModal} className='btn'>Add New Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.code}
            <button className='btn' onClick={() => handleOpenEditModal(item)}>Edit</button>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ItemForm item={currentItem} onSubmit={handleFormSubmit} />
        </Modal>
      )}
    </div>
    <Footer />
    </div>
  );
};

export default ItemManagement;
