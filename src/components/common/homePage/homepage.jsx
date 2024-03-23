import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import InvoiceCreation from '../invoiceCreation/invoicecreation';
import InvoiceList from '../invoiceList/invoicelist';
import ItemManagement from '../itemmanagement/itemmanagement';
import './homepage.scss'; 


const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      <InvoiceCreation />
      <InvoiceList />
      <Footer />
    </div>
  );
};

export default HomePage;
