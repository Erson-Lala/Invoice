import React, { useState } from 'react';
import { addInvoice } from '../../../services/invoiceService';
import './addinvoiceform.scss';

const AddInvoiceForm = ({ onSuccess, onError }) => {
  const [newInvoice, setNewInvoice] = useState({
    invoiceDate: '',
    invoiceNumber: '',
    customerId: '',
    totalAmount: '',
    totalVatAmount: '',
    totalDiscountAmount: '',
    isPaid: false,
    notes: '',
    user: '',
    invoiceLines: [{
      itemId: '',
      itemName: '',
      itemCode: '',
      vatRate: '',
      quantity: '',
      uom: '',
      unitPrice: '',
      discountPercent: '',
      notes: ''
    }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice({ ...newInvoice, [name]: value });
  };

  const handleInvoiceLineChange = (index, e) => {
    const updatedInvoiceLines = newInvoice.invoiceLines.map((line, i) => {
      if (i === index) {
        return { ...line, [e.target.name]: e.target.value };
      }
      return line;
    });
    setNewInvoice({ ...newInvoice, invoiceLines: updatedInvoiceLines });
  };

  const addInvoiceLine = () => {
    setNewInvoice({
      ...newInvoice,
      invoiceLines: [
        ...newInvoice.invoiceLines,
        {
          itemId: '',
          itemName: '',
          itemCode: '',
          vatRate: '',
          quantity: '',
          uom: '',
          unitPrice: '',
          discountPercent: '',
          notes: ''
        }
      ]
    });
  };

  const handleAddInvoice = async (e) => {
    e.preventDefault();
    try {
      await addInvoice(newInvoice);
      onSuccess();
    } catch (error) {
      onError(error);
    }
  };

  return (
    <form onSubmit={handleAddInvoice} className="add-invoice-form">
      <input type="text" name="invoiceNumber" placeholder="Invoice Number" value={newInvoice.invoiceNumber} onChange={handleChange} required />
      <input type="date" name="invoiceDate" value={newInvoice.invoiceDate} onChange={handleChange} required />
      
      {newInvoice.invoiceLines.map((line, index) => (
        <div key={index}>
          <input type="text" name="itemName" placeholder="Item Name" value={line.itemName} onChange={(e) => handleInvoiceLineChange(index, e)} required />
        </div>
      ))}

      <button type="button" onClick={addInvoiceLine} className='btn'>Add Line Item</button>
      <button type="submit" className="btn">Add Invoice</button>
    </form>
  );
};

export default AddInvoiceForm;
