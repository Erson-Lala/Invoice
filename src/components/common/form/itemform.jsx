import React, { useState } from 'react';
import './itemform.scss';

const ItemForm = ({ item, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    code: item?.code || '',
    price: item?.price || 0,
    description: item?.description || '',
    itemType: item?.itemType || 0,
    vatRate: item?.vatRate || 0,
    weight: item?.weight || 0,
    length: item?.length || 0,
    width: item?.width || 0,
    height: item?.height || 0,
    sku: item?.sku || '',
    barcode: item?.barcode || '',
    manufacturer: item?.manufacturer || '',
    brand: item?.brand || '',
    model: item?.model || '',
    color: item?.color || '',
    size: item?.size || '',
    material: item?.material || '',
    countryOfOrigin: item?.countryOfOrigin || '',
    warranty: item?.warranty || '',
    supplier: item?.supplier || '',
    uom: item?.uom || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="code"
        placeholder="Code"
        value={formData.code}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <button type="submit" className="btn">Submit</button>
    </form>
  );
};

export default ItemForm;