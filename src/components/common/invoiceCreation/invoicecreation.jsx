import React, { useState } from 'react';
import './invoicecreation.scss';

const InvoiceCreation = () => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    email: '',
  });

  const [items, setItems] = useState([
    { description: '', quantity: 1, price: 0 }
  ]);

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[index][name] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Customer Info:', customerInfo);
    console.log('Items:', items);
  };

  return (
    <form className="invoice-creation" onSubmit={handleSubmit}>
      <section className="customer-info">
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={customerInfo.name}
          onChange={handleCustomerChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Customer Address"
          value={customerInfo.address}
          onChange={handleCustomerChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Customer Email"
          value={customerInfo.email}
          onChange={handleCustomerChange}
        />
      </section>
      
      <section className="invoice-items">
        {items.map((item, index) => (
          <div key={index} className="item">
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={item.description}
              onChange={(e) => handleItemChange(index, e)}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleItemChange(index, e)}
            />
          </div>
        ))}
        <button type="button" onClick={addItem}>Add Item</button>
      </section>

      <button type="submit">Create Invoice</button>
    </form>
  );
};

export default InvoiceCreation;
