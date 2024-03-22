import React, { useEffect, useState } from 'react';
import { fetchInvoices } from '../../../services/invoiceService'; // Ensure this path matches your project structure

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Added for improved error handling

  useEffect(() => {
    const loadInvoices = async () => {
      setIsLoading(true);
      setError(null); // Reset error state on new loading attempt
      try {
        const data = await fetchInvoices();
        setInvoices(data);
      } catch (err) {
        console.error("Failed to fetch invoices:", err);
        setError('Failed to load invoices. Please try again.'); // Set a user-friendly error message
      } finally {
        setIsLoading(false);
      }
    };

    loadInvoices();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading invoices...</p>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div> // Display error message
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
                <td>{new Date(invoice.invoiceDate).toLocaleDateString()}</td> {/* Formatting the date */}
                <td>{invoice.customerId}</td>
                <td>${invoice.totalAmount.toFixed(2)}</td> {/* Formatting the amount as currency */}
                <td>{invoice.isPaid ? 'Paid' : 'Pending'}</td> {/* Adding a simple status */}
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
