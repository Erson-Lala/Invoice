import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import CustomerCreation from '../customerCreation/customercreation';
import InvoiceCreation from '../invoiceCreation/invoicecreation';
import InvoiceList from '../invoiceList/invoicelist';
import './homepage.scss'; 


const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      {/* <InvoiceCreation /> */}
      {/* <CustomerCreation /> */}
      <InvoiceList />
      <Footer />
    </div>
  );
};

export default HomePage;
