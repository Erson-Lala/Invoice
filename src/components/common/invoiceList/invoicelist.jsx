import React, { useEffect, useState } from 'react';
import { fetchInvoices } from '../../../services/invoiceService';
import './invoicelist.scss';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <div className="invoice-list">
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
