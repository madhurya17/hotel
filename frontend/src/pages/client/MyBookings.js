import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to view your bookings.');
      return;
    }
    try {
      const { data } = await axios.get('/api/bookings/mybookings', {
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

  const cancelBooking = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/api/bookings/cancel/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Booking cancelled successfully');
      fetchBookings();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  return (
    <div className="my-bookings">
      <h2>My Bookings</h2>
      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.room.name}</td>
                <td>{new Date(booking.fromDate).toLocaleDateString()}</td>
                <td>{new Date(booking.toDate).toLocaleDateString()}</td>
                <td>{booking.status}</td>
                <td>
                  {booking.status === 'booked' && (
                    <button onClick={() => cancelBooking(booking._id)}>Cancel</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBookings;
