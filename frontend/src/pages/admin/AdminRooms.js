import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminRooms.css';

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    maxCount: '',
    imageUrls: '',
  });
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('/api/rooms');
      setRooms(data);
    } catch (err) {
      setError('Failed to fetch rooms');
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const imageUrlsArray = form.imageUrls.split(',').map(url => url.trim());
      await axios.post('/api/rooms', { ...form, price: Number(form.price), maxCount: Number(form.maxCount), imageUrls: imageUrlsArray }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Room added successfully');
      setForm({ name: '', description: '', price: '', maxCount: '', imageUrls: '' });
      fetchRooms();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add room');
    }
  };

  const handleEditRoom = (room) => {
    setEditingRoomId(room._id);
    setForm({
      name: room.name,
      description: room.description,
      price: room.price,
      maxCount: room.maxCount,
      imageUrls: room.imageUrls.join(', '),
    });
  };

  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const imageUrlsArray = form.imageUrls.split(',').map(url => url.trim());
      await axios.put(`/api/rooms/${editingRoomId}`, { ...form, price: Number(form.price), maxCount: Number(form.maxCount), imageUrls: imageUrlsArray }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Room updated successfully');
      setEditingRoomId(null);
      setForm({ name: '', description: '', price: '', maxCount: '', imageUrls: '' });
      fetchRooms();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update room');
    }
  };

  const handleDeleteRoom = async (id) => {
    setError('');
    setSuccess('');
    try {
      await axios.delete(`/api/rooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Room deleted successfully');
      fetchRooms();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete room');
    }
  };

  return (
    <div className="admin-rooms">
      <h2>Manage Rooms</h2>
      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}

      <form onSubmit={editingRoomId ? handleUpdateRoom : handleAddRoom} className="room-form">
        <input
          type="text"
          name="name"
          placeholder="Room Name"
          value={form.name}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price per night"
          value={form.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="maxCount"
          placeholder="Max Guests"
          value={form.maxCount}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="imageUrls"
          placeholder="Image URLs (comma separated)"
          value={form.imageUrls}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editingRoomId ? 'Update Room' : 'Add Room'}</button>
        {editingRoomId && (
          <button type="button" onClick={() => {
            setEditingRoomId(null);
            setForm({ name: '', description: '', price: '', maxCount: '', imageUrls: '' });
            setError('');
            setSuccess('');
          }}>Cancel</button>
        )}
      </form>

      <table className="rooms-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Max Guests</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room._id}>
              <td>{room.name}</td>
              <td>${room.price}</td>
              <td>{room.maxCount}</td>
              <td>
                <button onClick={() => handleEditRoom(room)}>Edit</button>
                <button onClick={() => handleDeleteRoom(room._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRooms;
