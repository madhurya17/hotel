import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminBookings.css';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.get('/api/admin/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookings');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="admin-bookings">
      <h2>All Bookings</h2>
      {error && <p className="error-msg">{error}</p>}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td>{booking.user.name}</td>
                <td>{booking.room.name}</td>
                <td>{new Date(booking.fromDate).toLocaleDateString()}</td>
                <td>{new Date(booking.toDate).toLocaleDateString()}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminBookings;
