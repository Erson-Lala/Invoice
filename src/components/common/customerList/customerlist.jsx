import React, { useState, useEffect } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import './customerlist.scss';

import { fetchCustomers } from '../../../services/customerService';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCustomers = async () => {
            setIsLoading(true);
            try {
                const data = await fetchCustomers();
                setCustomers(data);
            } catch (err) {
                console.error("Failed to fetch customers:", err);
                setError('Failed to load customers. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        loadCustomers();
    }, []);

    return (
        <div>
            <Header />
            <div className="customer-list">
                <h2>Customers</h2>
                {isLoading ? (
                    <p>Loading customers...</p>
                ) : error ? (
                    <div style={{ color: 'red' }}>{error}</div>
                ) : customers.length > 0 ? (
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>City</th>
                                    <th>Country</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer) => (
                                    <tr key={customer.id}>
                                        <td>{customer.id}</td>
                                        <td>{customer.name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.phone || 'N/A'}</td>
                                        <td>{customer.city || 'N/A'}</td>
                                        <td>{customer.country || 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No customers found.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CustomerList;
