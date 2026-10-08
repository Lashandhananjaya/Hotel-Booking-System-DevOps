import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page" style={{ padding: "40px 20px" }}>
      <section style={{ textAlign: "center", padding: "80px 20px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={{ color: "var(--accent)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>
            Welcome to Paradise 
          </p>

          <h1 className="gradient-text" style={{ fontSize: "64px", marginBottom: "24px", lineHeight: "1.1" }}>
            Find Your Perfect Stay
          </h1>

          <p style={{ color: "var(--text)", fontSize: "20px", marginBottom: "40px", lineHeight: "1.6" }}>
            Book comfortable rooms effortlessly with our premium booking system. Experience luxury, convenience, and unparalleled hospitality.
          </p>

          <Link to="/rooms" className="premium-button" style={{ display: "inline-block", textDecoration: "none", width: "auto", padding: "16px 40px", fontSize: "18px", borderRadius: "100px" }}>
            View Available Rooms
          </Link>
        </div>
      </section>

      <section style={{ maxWidth: "1000px", margin: "40px auto 80px" }}>
        <div className="booking-grid">
          <div className="glass-panel" style={{ textAlign: "center", padding: "40px 24px", transition: "transform 0.3s ease" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🛏️</div>
            <h3 style={{ margin: "0 0 12px", color: "var(--text-h)" }}>Comfortable Rooms</h3>
            <p style={{ color: "var(--text)", fontSize: "16px" }}>Clean and modern rooms designed for your ultimate relaxation.</p>
          </div>

          <div className="glass-panel" style={{ textAlign: "center", padding: "40px 24px", transition: "transform 0.3s ease" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>💰</div>
            <h3 style={{ margin: "0 0 12px", color: "var(--text-h)" }}>Best Price Guarantee</h3>
            <p style={{ color: "var(--text)", fontSize: "16px" }}>Affordable room rates without compromising on luxury and quality.</p>
          </div>

          <div className="glass-panel" style={{ textAlign: "center", padding: "40px 24px", transition: "transform 0.3s ease" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📞</div>
            <h3 style={{ margin: "0 0 12px", color: "var(--text-h)" }}>24/7 Support</h3>
            <p style={{ color: "var(--text)", fontSize: "16px" }}>Our friendly staff is available round the clock to assist you.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;