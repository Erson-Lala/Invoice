import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import './homepage.scss'; 

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      <main className="main-content">
        <section className="hero">
          <h1>Welcome to the Invoicing App</h1>
          <p>Create and manage your invoices with ease.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
