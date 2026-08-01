import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.log("Error fetching rooms:", err));
  }, []);

  const handleBookNow = (roomName) => {
    navigate(`/booking?roomName=${encodeURIComponent(roomName)}`);
  };

  return (
    <div className="page" style={{ padding: "40px 20px" }}>
      <h1 className="gradient-text">Available Rooms</h1>
      <p style={{ color: "var(--text)", marginBottom: "40px" }}>
        Discover our world-class accommodations and find your perfect stay.
      </p>

      <div className="booking-grid" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {rooms.map((room) => (
          <div key={room._id} className="booking-card" style={{ padding: "24px" }}>
            <h2 style={{ margin: "0 0 12px 0", color: "var(--text-h)" }}>{room.name}</h2>
            <p style={{ margin: "0 0 20px 0", fontSize: "20px", color: "var(--accent)", fontWeight: "bold" }}>
              Rs. {room.price} <span style={{ fontSize: "14px", color: "var(--text)", fontWeight: "normal" }}>/ night</span>
            </p>
            <button 
              className="premium-button" 
              onClick={() => handleBookNow(room.name)}
            >
              Book Now
            </button>
          </div>
        ))}
        
        {rooms.length === 0 && (
          <div className="glass-panel" style={{ gridColumn: "1 / -1", padding: "40px" }}>
            <p style={{ color: "var(--text)", fontSize: "18px", margin: 0 }}>
              No rooms currently available. Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rooms;