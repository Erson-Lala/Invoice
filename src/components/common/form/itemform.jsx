import React, { useState } from 'react';
import './itemform.scss';

const ItemForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    price: 10.99,
    itemType: 1,
    vatRate: 0.15,
    uom: 'Unit',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });


    if (name === 'code') {
      if (value.length < 2) {
        setErrors({ ...errors, code: 'Code must be at least 2 characters long.' });
      } else {

        const newErrors = { ...errors };
        delete newErrors.code;
        setErrors(newErrors);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (Object.keys(errors).length === 0) {
      onSubmit(formData);
      alert('Operation successful');

    } else {
      alert('Please correct the errors before submitting.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <label>
        Name:
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Code:
        <input
          type="text"
          name="code"
          placeholder="Code"
          value={formData.code}
          onChange={handleChange}
          maxLength={50}
          required
        />
        {errors.code && <div className="error-message">{errors.code}</div>}
      </label>

      <label>
        Price:
        <input
          type="number"
          step="0.01"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Item Type:
        <select name="itemType" value={formData.itemType} onChange={handleChange} required>
          <option value="1">Type 1</option>
          <option value="2">Type 2</option>
          {/* Add more options as per your ItemType enum */}
        </select>
      </label>

      <label>
        VAT Rate:
        <input
          type="number"
          step="0.01"
          name="vatRate"
          placeholder="VAT Rate"
          value={formData.vatRate}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        UOM (Unit of Measurement):
        <input
          type="text"
          name="uom"
          placeholder="UOM"
          value={formData.uom}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit" className="btn" disabled={Object.keys(errors).length > 0}>Submit</button>
    </form>
  );
};

export default ItemForm;
