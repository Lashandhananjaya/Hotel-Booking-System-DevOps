import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Booking() {
  const [searchParams] = useSearchParams();
  const initialRoom = searchParams.get("roomName") || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roomName, setRoomName] = useState(initialRoom);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = "/api/bookings";

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, checkInDate, checkOutDate, roomName }),
      });
      if (res.ok) {
        setMessage("Booking Successful!");
        setName("");
        setEmail("");
        setCheckInDate("");
        setCheckOutDate("");
        // don't clear roomName in case they want to book again
        fetchBookings();
      } else {
        const errorData = await res.json();
        setMessage(errorData.message || "Booking Failed");
      }
    } catch (err) {
      setMessage("Error connecting to server.");
    }
    setLoading(false);
  };

  return (
    <div className="page" style={{ padding: "40px 20px" }}>
      <h1 className="gradient-text">Manage Bookings</h1>
      
      <div className="glass-panel" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2>Create a Reservation</h2>
        {message && <p style={{ color: message.includes("Failed") || message.includes("Error") ? "red" : "green", marginBottom: "16px", fontWeight: "500" }}>{message}</p>}
        
        <form onSubmit={handleBooking}>
          <input 
            type="text" 
            className="premium-input" 
            placeholder="Selected Room (e.g. Deluxe Suite)" 
            value={roomName} 
            onChange={(e) => setRoomName(e.target.value)} 
            required
          />
          <input 
            type="text" 
            className="premium-input" 
            placeholder="Enter Your Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
          <input 
            type="email" 
            className="premium-input" 
            placeholder="Enter Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "14px", color: "var(--text)", marginBottom: "8px", display: "block", textAlign: "left" }}>Check-in Date</label>
              <input 
                type="date" 
                className="premium-input" 
                value={checkInDate} 
                onChange={(e) => setCheckInDate(e.target.value)} 
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "14px", color: "var(--text)", marginBottom: "8px", display: "block", textAlign: "left" }}>Check-out Date</label>
              <input 
                type="date" 
                className="premium-input" 
                value={checkOutDate} 
                onChange={(e) => setCheckOutDate(e.target.value)} 
                required
              />
            </div>
          </div>
          <button type="submit" className="premium-button" disabled={loading}>
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
        </form>
      </div>

      <div style={{ marginTop: "60px", maxWidth: "900px", margin: "60px auto 0", textAlign: "left" }}>
        <h2>Recent Bookings</h2>
        <div className="booking-grid">
          {bookings.map((b) => (
            <div key={b._id} className="booking-card">
              <h3 style={{ margin: "0 0 4px 0", color: "var(--text-h)" }}>{b.name}</h3>
              <p style={{ margin: "0 0 12px 0", fontSize: "14px", color: "var(--accent)", fontWeight: "600" }}>{b.roomName}</p>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "var(--code-bg)", borderRadius: "6px" }}>
                <span style={{ fontSize: "13px" }}><strong>In:</strong> {new Date(b.checkInDate).toLocaleDateString()}</span>
                <span style={{ fontSize: "13px" }}><strong>Out:</strong> {new Date(b.checkOutDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
          {bookings.length === 0 && (
            <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "var(--text)", padding: "20px" }}>No bookings found. Be the first!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Booking;