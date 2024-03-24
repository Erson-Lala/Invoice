import React, { useState } from 'react';
import { addCustomer } from '../../../services/customerService';
import './addcustomerform.scss';

const AddCustomerForm = ({ onSuccess, onError }) => {
  const [newCustomer, setNewCustomer] = useState({
    name: '', email: '', phone: '', address: '', city: '', postalCode: '', country: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      await addCustomer(newCustomer);
      onSuccess();
    } catch (error) {
      onError(error);
    }
  };

  return (
    <form onSubmit={handleAddCustomer} className="new-customer-form">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newCustomer.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newCustomer.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newCustomer.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newCustomer.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={newCustomer.city}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={newCustomer.postalCode}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={newCustomer.country}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn">Add New Customer</button>
    </form>
  );
};

export default AddCustomerForm;
