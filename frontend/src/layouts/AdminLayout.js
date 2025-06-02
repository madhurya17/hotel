import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
  return (
    <>
      <header className="admin-header">
        <div className="container">
          <h1 className="logo">Admin Panel</h1>
          <nav>
            <Link to="/admin/rooms">Rooms</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/bookings">Bookings</Link>
          </nav>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <footer className="admin-footer">
        <div className="container">
          &copy; 2024 Hotel Booking Admin. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default AdminLayout;
