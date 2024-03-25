import React, { useEffect, useState } from 'react';
import { fetchInvoices } from '../../../services/invoiceService';
import './invoicelist.scss';
import InvoiceCreation from '../invoiceCreation/invoicecreation';
import CustomerCreation from '../customerCreation/customercreation';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customerId, setCustomerId] = useState('');
  const [customerTotal, setCustomerTotal] = useState(0);
  const [noCustomerFound, setNoCustomerFound] = useState(false);

  useEffect(() => {
    const loadInvoices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchInvoices();
        setInvoices(data);
      } catch (err) {
        console.error("Failed to fetch invoices:", err);
        setError('Failed to load invoices. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadInvoices();
  }, []);

  const handleCustomerTotal = () => {
    const filteredInvoices = invoices.filter(invoice => invoice.customerId === parseInt(customerId));
    if (filteredInvoices.length === 0) {
      setNoCustomerFound(true);
      setCustomerTotal(0);
    } else {
      const total = filteredInvoices.reduce((acc, curr) => acc + curr.totalAmount, 0);
      setCustomerTotal(total);
      setNoCustomerFound(false);
    }
  };

  return (
    <div className="invoice-list">
      <div className="top-section">
        <InvoiceCreation />
        <div className="customer-total-form">
          <input
            type="number"
            placeholder="Enter Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleCustomerTotal();
              }
            }}
          />
          <button onClick={handleCustomerTotal}>Calculate</button>
        </div>

        <CustomerCreation />
      </div>
      {noCustomerFound ? (
        <div className="no-customer-message">No customer found</div>
      ) : (
        <div className="total-amount">Total Amount for Customer ID {customerId}: ${customerTotal.toFixed(2)}</div>
      )}

      {isLoading ? (
        <p>Loading invoices...</p>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : invoices.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Date</th>
              <th>Customer ID</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(invoice => (
              <tr key={invoice.id}>
                <td>{invoice.invoiceNumber}</td>
                <td>{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                <td>{invoice.customerId}</td>
                <td>${invoice.totalAmount.toFixed(2)}</td>
                <td>{invoice.isPaid ? 'Paid' : 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No invoices found.</p>
      )}
    </div>
  );
};

export default InvoiceList;