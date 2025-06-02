 import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './ClientLayout.css';

const ClientLayout = () => {
  return (
    <>
      <header className="client-header">
        <div className="container">
          <h1 className="logo">Hotel Booking</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/mybookings">My Bookings</Link>
            <Link to="/login">Login</Link>
          </nav>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <footer className="client-footer">
        <div className="container">
          &copy; 2024 Hotel Booking. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default ClientLayout;
