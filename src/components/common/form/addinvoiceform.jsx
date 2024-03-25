import React, { useState } from 'react';
import { addInvoice } from '../../../services/invoiceService';
import './addinvoiceform.scss';

const AddInvoiceForm = ({ onSuccess, onError }) => {
  const [newInvoice, setNewInvoice] = useState({
    invoiceDate: '',
    invoiceNumber: '',
    customerId: 0,
    totalAmount: 0.0,
    totalVatAmount: 0.0,
    totalDiscountAmount: 0.0,
    isPaid: false,
    invoiceLines: [{
      itemId: 0,
      itemType: 0,
      vatRate: 0.0,
      quantity: 0.0,
      unitPrice: 0.0,
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
        return { ...line, [name]: name === 'itemType' ? parseInt(value, 10) : parseFloat(value) };
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
        { itemId: 0, itemType: 0, vatRate: 0.0, quantity: 0.0, unitPrice: 0.0 }
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
      <input type="number" name="customerId" placeholder="Customer ID" value={newInvoice.customerId} onChange={handleChange} required />
      <input type="number" step="0.01" name="totalAmount" placeholder="Total Amount" value={newInvoice.totalAmount} onChange={handleChange} required />
      <input type="number" step="0.01" name="totalVatAmount" placeholder="Total VAT Amount" value={newInvoice.totalVatAmount} onChange={handleChange} required />
      <input type="number" step="0.01" name="totalDiscountAmount" placeholder="Total Discount Amount" value={newInvoice.totalDiscountAmount} onChange={handleChange} required />
      <div>
        <input type="checkbox" name="isPaid" checked={newInvoice.isPaid} onChange={handleChange} /> Paid
      </div>
      
      {newInvoice.invoiceLines.map((line, index) => (
        <div key={index}>
          <input type="number" name="itemId" placeholder="Item ID" value={line.itemId} onChange={(e) => handleInvoiceLineChange(index, e)} required />
          <input type="number" step="0.01" name="vatRate" placeholder="VAT Rate" value={line.vatRate} onChange={(e) => handleInvoiceLineChange(index, e)} required />
          <input type="number" step="0.01" name="quantity" placeholder="Quantity" value={line.quantity} onChange={(e) => handleInvoiceLineChange(index, e)} required />
          <input type="number" step="0.01" name="unitPrice" placeholder="Unit Price" value={line.unitPrice} onChange={(e) => handleInvoiceLineChange(index, e)} required />
        </div>
      ))}

      <button type="button" onClick={addInvoiceLine} className="btn">Add Line Item</button>
      <button type="submit" className="btn">Add Invoice</button>
    </form>
  );
};

export default AddInvoiceForm;