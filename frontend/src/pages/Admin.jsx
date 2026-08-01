import { useState, useEffect } from "react";

function Admin() {
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5000/api/rooms";

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price: Number(price) }),
      });
      if (res.ok) {
        setMessage("Room added successfully!");
        setName("");
        setPrice("");
        fetchRooms();
      } else {
        setMessage("Failed to add room.");
      }
    } catch (err) {
      setMessage("Error connecting to server.");
    }
    setLoading(false);
  };

  return (
    <div className="page" style={{ padding: "40px 20px" }}>
      <h1 className="gradient-text">Admin Dashboard</h1>

      <div className="glass-panel" style={{ maxWidth: "600px", margin: "0 auto 40px" }}>
        <h2>Add New Room</h2>
        {message && <p style={{ color: message.includes("Failed") || message.includes("Error") ? "red" : "green", marginBottom: "16px" }}>{message}</p>}
        
        <form onSubmit={handleAddRoom}>
          <input 
            type="text" 
            className="premium-input" 
            placeholder="Room Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input 
            type="number" 
            className="premium-input" 
            placeholder="Room Price (Rs.)" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <button type="submit" className="premium-button" disabled={loading}>
            {loading ? "Adding..." : "Add Room"}
          </button>
        </form>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "left" }}>
        <h2>Room List</h2>
        <div className="booking-grid">
          {rooms.map((room) => (
            <div key={room._id} className="booking-card">
              <h3 style={{ margin: "0 0 8px 0", color: "var(--text-h)" }}>{room.name}</h3>
              <p style={{ margin: "0", color: "var(--accent)", fontWeight: "bold" }}>Rs. {room.price}</p>
            </div>
          ))}
          {rooms.length === 0 && (
            <p style={{ color: "var(--text)" }}>No rooms available. Add one above.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;