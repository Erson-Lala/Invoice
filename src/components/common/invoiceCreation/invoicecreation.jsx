import React, { useState } from 'react';
import Modal from '../modal/modal';
import AddInvoiceForm from '../form/addinvoiceform';
import './invoicecreation.scss';

const InvoiceCreation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="invoice-creation">
      <button className="btn" onClick={handleModalOpen}>Create New Invoice</button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <AddInvoiceForm
            onSuccess={handleModalClose}
            onError={(error) => {
              console.error("Error creating invoice:", error);
              alert('Failed to create invoice.');
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default InvoiceCreation;
