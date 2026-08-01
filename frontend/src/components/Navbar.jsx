import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return {
      textDecoration: "none",
      color: isActive ? "var(--accent)" : "var(--text-h)",
      fontWeight: isActive ? "600" : "500",
      padding: "8px 16px",
      borderRadius: "8px",
      background: isActive ? "var(--accent-bg)" : "transparent",
      transition: "all 0.2s ease"
    };
  };

  return (
    <nav className="glass-panel" style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      margin: "20px",
      padding: "16px 32px",
      borderRadius: "20px"
    }}>
      <h2 style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "28px" }}>🏨</span> 
        <span className="gradient-text" style={{ fontWeight: "bold" }}>Paradise Hotel</span>
      </h2>

      <div style={{ display: "flex", gap: "8px" }}>
        <Link to="/" style={getLinkStyle("/")}>Home</Link>
        <Link to="/rooms" style={getLinkStyle("/rooms")}>Rooms</Link>
        <Link to="/booking" style={getLinkStyle("/booking")}>Booking</Link>
        <Link to="/admin" style={getLinkStyle("/admin")}>Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;