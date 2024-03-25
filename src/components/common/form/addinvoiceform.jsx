import React, { useState } from 'react';
import { addInvoice } from '../../../services/invoiceService';
import './addinvoiceform.scss';

const AddInvoiceForm = ({ onSuccess, onError }) => {
  const [newInvoice, setNewInvoice] = useState({
    invoiceDate: '',
    invoiceNumber: '',
    customerId: 0,
    user: 'User Name',
    invoiceLines: [{
      itemId: 1,
      itemName: 'Item Name',
      itemCode: 'ITEM123',
      vatRate: 0.2,
      quantity: 1,
      uom: 'Unit',
      unitPrice: 0.01,
      lineTotal: 0,
      discountPercent: 0,
      discountTotalAmount: 0,
      totalAfterDiscount: 0,
      notes: '',
      taxAmount: 0,
      totalIncludingTax: 0
    }]
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : value;
    setNewInvoice({ ...newInvoice, [name]: type === 'number' ? parseFloat(updatedValue) : updatedValue });
  };

  const handleInvoiceLineChange = (index, e) => {
    const { name, value } = e.target;
    const updatedInvoiceLines = newInvoice.invoiceLines.map((line, i) => {
      if (i === index) {
        return { ...line, [name]: parseFloat(value) };
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
          itemId: 1,
          itemName: 'Item Name',
          itemCode: 'ITEM123',
          vatRate: 0.2,
          quantity: 1,
          uom: 'Unit',
          unitPrice: 0.01,
          lineTotal: 0,
          discountPercent: 0,
          discountTotalAmount: 0,
          totalAfterDiscount: 0,
          notes: '',
          taxAmount: 0,
          totalIncludingTax: 0
        }
      ]
    });
  };

  const handleAddInvoice = async (e) => {
    e.preventDefault();
    try {
      await addInvoice(newInvoice);
      alert('Invoice created successfully!');
      onSuccess();
    } catch (error) {
      onError(error);
      alert(`Failed to create invoice: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleAddInvoice} className="add-invoice-form">
      <input type="text" name="invoiceNumber" placeholder="Invoice Number" value={newInvoice.invoiceNumber} onChange={handleChange} required />
      <input type="date" name="invoiceDate" value={newInvoice.invoiceDate} onChange={handleChange} required />
      <input type="number" name="customerId" placeholder="Customer ID" value={newInvoice.customerId} onChange={handleChange} required />

      {newInvoice.invoiceLines.map((line, index) => (
        <div key={index}>
          <input type="number" name="itemId" placeholder="Item ID" value={line.itemId} onChange={(e) => handleInvoiceLineChange(index, e)} required />
          <input type="number" step="0.01" name="vatRate" placeholder="VAT Rate" value={line.vatRate} onChange={(e) => handleInvoiceLineChange(index, e)} required />
          <input type="number" step="1" name="quantity" placeholder="Quantity" value={line.quantity} onChange={(e) => handleInvoiceLineChange(index, e)} min="1" required />
          <input type="number" step="0.01" name="unitPrice" placeholder="Unit Price" value={line.unitPrice} onChange={(e) => handleInvoiceLineChange(index, e)} min="0.01" required />
        </div>
      ))}

      <button type="button" onClick={addInvoiceLine} className="btn">Add Line Item</button>
      <button type="submit" className="btn">Add Invoice</button>
    </form>
  );
};

export default AddInvoiceForm;
