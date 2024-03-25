import React, { useState } from 'react';
import Modal from '../modal/modal';
import AddCustomerForm from '../form/addcustomerform';
import './customercreation.scss';

const CustomerCreation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    alert('Customer created successfully.');
    handleModalClose();
  };

  return (
    <div className="invoice-creation">
      <button className="btn" onClick={handleModalOpen}>Add New Customer</button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <AddCustomerForm
            onSuccess={handleSuccess}
            onError={(error) => {
              console.error("Error adding new customer:", error);
              alert('Failed to add new customer.');
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default CustomerCreation;
