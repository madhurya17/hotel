import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './RoomDetails.css';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await axios.get(`/api/rooms/${id}`);
        setRoom(data);
      } catch (error) {
        console.error('Error fetching room details:', error);
      }
    };
    fetchRoom();
  }, [id]);

  if (!room) return <p>Loading...</p>;

  return (
    <div className="room-details">
      <h2>{room.name}</h2>
      <div className="room-images">
        {room.imageUrls && room.imageUrls.length > 0 ? (
          room.imageUrls.map((url, index) => (
            <img key={index} src={url} alt={room.name} />
          ))
        ) : (
          <img src="https://via.placeholder.com/600x400" alt="placeholder" />
        )}
      </div>
      <p>{room.description}</p>
      <p>Price: ${room.price} per night</p>
      <p>Max Guests: {room.maxCount}</p>
      <Link to={`/booking/${room._id}`} className="btn">Book Now</Link>
    </div>
  );
};

export default RoomDetails;
