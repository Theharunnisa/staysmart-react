
import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

const hotels = [
  { id: 1, name: "Ocean Pearl Resort", city: "Goa", price: 3500, rating: 4.8, type: "AC", view: "Sea view", location: "Calangute Beach, Goa", lat: 15.5439, lng: 73.7553, breakfast: true, images: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80"] },
  { id: 2, name: "Palm Breeze Inn", city: "Goa", price: 1800, rating: 4.3, type: "Non-AC", view: "Garden view", location: "Candolim, Goa", lat: 15.5184, lng: 73.7626, breakfast: false, images: ["https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80"] },
  { id: 3, name: "Royal Deccan Suites", city: "Hyderabad", price: 3200, rating: 4.7, type: "AC", view: "City view", location: "HITEC City, Hyderabad", lat: 17.4435, lng: 78.3772, breakfast: true, images: ["https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80"] },
  { id: 4, name: "Charminar Comfort Stay", city: "Hyderabad", price: 1600, rating: 4.2, type: "Non-AC", view: "City view", location: "Old City, Hyderabad", lat: 17.3616, lng: 78.4747, breakfast: false, images: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"] },
  { id: 5, name: "Garden City Suites", city: "Bangalore", price: 2900, rating: 4.6, type: "AC", view: "Garden view", location: "Indiranagar, Bangalore", lat: 12.9784, lng: 77.6408, breakfast: true, images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80"] },
  { id: 6, name: "Green Nest Inn", city: "Bangalore", price: 1700, rating: 4.2, type: "Non-AC", view: "Garden view", location: "Jayanagar, Bangalore", lat: 12.9250, lng: 77.5838, breakfast: false, images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80"] },
  { id: 7, name: "Marina Grand", city: "Chennai", price: 3500, rating: 4.7, type: "AC", view: "Sea view", location: "Marina Beach, Chennai", lat: 13.05, lng: 80.2824, breakfast: true, images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=80"] },
  { id: 8, name: "Sunrise Residency", city: "Chennai", price: 1600, rating: 4.2, type: "Non-AC", view: "City view", location: "T. Nagar, Chennai", lat: 13.0418, lng: 80.2341, breakfast: false, images: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80"] }
];

const money = n => "₹" + Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 });

function defaultDates() {
  const start = new Date();
  start.setDate(start.getDate() + 1);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  const fmt = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return { start: fmt(start), end: fmt(end) };
}

function App() {
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem("ssUsers") || "[]"));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem("ssUser") || "null"); }
    catch { return null; }
  });
  const [page, setPage] = useState("home");
  const [extraPage, setExtraPage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authMessage, setAuthMessage] = useState("");
  const [authError, setAuthError] = useState(false);

  const [destination, setDestination] = useState("Goa");
  const dates = defaultDates();
  const [checkIn, setCheckIn] = useState(dates.start);
  const [checkOut, setCheckOut] = useState(dates.end);
  const [guests, setGuests] = useState("2");
  const [hotelList, setHotelList] = useState([]);
  const [slides, setSlides] = useState({});

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [booking, setBooking] = useState(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem("ssBooking") || "null");
      return saved ? { ...saved, hotel: hotels.find(h => h.id === Number(saved.hotelId)) } : null;
    } catch { return null; }
  });
  const [draft, setDraft] = useState({});
  const [message, setMessage] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [points, setPoints] = useState(Number(localStorage.getItem("ssPoints") || 0));
  const [ratings, setRatings] = useState(() => JSON.parse(localStorage.getItem("ssRatings") || "{}"));
  const [birthday, setBirthday] = useState("");
  const [rating, setRating] = useState("5");

  const [guestName, setGuestName] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [stayStatus, setStayStatus] = useState("Not checked in");

  const [foodType, setFoodType] = useState("Room service");
  const [foodNotes, setFoodNotes] = useState("");
  const [foodRoom, setFoodRoom] = useState("");
  const [foodQty, setFoodQty] = useState({ friedRice: 0, paneer: 0, biryani: 0, juice: 0 });
  const [foodOrderStatus, setFoodOrderStatus] = useState("");
  const [lockCode, setLockCode] = useState("----");
  const [lockStatus, setLockStatus] = useState("");

  const [review, setReview] = useState("");
  const [reviewRating, setReviewRating] = useState("5");
  const [reviewResult, setReviewResult] = useState("");

  useEffect(() => { localStorage.setItem("ssUsers", JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem("ssPoints", String(points)); }, [points]);
  useEffect(() => { localStorage.setItem("ssRatings", JSON.stringify(ratings)); }, [ratings]);
  useEffect(() => {
    if (user) sessionStorage.setItem("ssUser", JSON.stringify(user));
  }, [user]);

  const showPage = name => {
    if (!user) {
      setPage("home");
      setExtraPage("");
      return;
    }
    setPage(name);
    setExtraPage("");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openExtraFeature = name => {
    setExtraPage(name);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

 
const login = e => {
  e.preventDefault();

  const email = e.target.email.value.trim().toLowerCase();
  const password = e.target.password.value;

  const savedUsers = JSON.parse(localStorage.getItem("ssUsers") || "[]");

  const found = savedUsers.find(
    u => u.email.trim().toLowerCase() === email && u.password === password
  );

  if (!found) {
    setAuthError(true);
    setAuthMessage("Invalid login. Please register first or check your details.");
    return;
  }

  setUsers(savedUsers);
  setUser(found);
  sessionStorage.setItem("ssLoggedIn", "yes");
  sessionStorage.setItem("ssUser", JSON.stringify(found));
  setAuthError(false);
  setAuthMessage("");
};

const register = e => {
  e.preventDefault();

  const data = new FormData(e.target);
  const name = data.get("name").trim();
  const email = data.get("email").trim().toLowerCase();
  const password = data.get("password");

  if (password !== data.get("confirm")) {
    setAuthError(true);
    setAuthMessage("Passwords do not match.");
    return;
  }

  const savedUsers = JSON.parse(localStorage.getItem("ssUsers") || "[]");

  if (savedUsers.some(u => u.email.trim().toLowerCase() === email)) {
    setAuthError(true);
    setAuthMessage("Email already registered. Please login.");
    return;
  }

  const newUser = {
    name,
    email,
    password,
    birthday: data.get("birthday"),
    phone: data.get("phone")
  };

  const updatedUsers = [...savedUsers, newUser];

  localStorage.setItem("ssUsers", JSON.stringify(updatedUsers));
  setUsers(updatedUsers);
  setAuthMode("login");
  setAuthError(false);
  setAuthMessage("Registration successful. Please login.");
  e.target.reset();
};

  const logout = () => {
    sessionStorage.removeItem("ssUser");
    sessionStorage.removeItem("ssLoggedIn");
    sessionStorage.removeItem("ssBooking");
    setUser(null);
    setBooking(null);
    setDraft({});
    setSelectedHotel(null);
    setExtraPage("");
    setPage("home");
    setMenuOpen(false);
  };

  const searchHotels = e => {
    e?.preventDefault();
    if (!destination.trim()) return alert("Please enter a destination.");
    if (new Date(checkOut) <= new Date(checkIn) || new Date(checkIn) < new Date(new Date().toDateString())) {
      return alert("Please choose valid future check-in and check-out dates.");
    }
    const list = hotels.filter(h => h.city.toLowerCase() === destination.trim().toLowerCase());
    setHotelList(list);
    setTimeout(() => document.getElementById("hotelSection")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const chooseCity = city => {
    setDestination(city);
    setHotelList(hotels.filter(h => h.city === city));
  };

  const moveSlide = (id, delta) => {
    const hotel = hotels.find(h => h.id === id);
    setSlides(old => ({ ...old, [id]: ((old[id] || 0) + delta + hotel.images.length) % hotel.images.length }));
  };

  const startBooking = hotel => {
    setSelectedHotel(hotel);
    setDraft({
      custom: {
        name: user?.name || "", roomType: hotel.type, bed: "Queen", view: hotel.view,
        start: checkIn, end: checkOut, guests, floor: "Any floor",
        facilities: ["Wi-Fi"], notes: ""
      },
      match: {}, service: null, coupon: ""
    });
    setCoupon("");
    setMessage("");
    showPage("matcher");
  };

  const updateCustom = (key, value) => {
    setDraft(old => ({ ...old, custom: { ...old.custom, [key]: value } }));
  };

  const toggleFacility = value => {
    const current = draft.custom?.facilities || [];
    updateCustom("facilities", current.includes(value) ? current.filter(x => x !== value) : [...current, value]);
  };

  const submitMatcher = e => {
    e.preventDefault();
    if (!selectedHotel) return;
    const data = new FormData(e.target);
    const budget = Number(data.get("budget"));
    const minRating = Number(data.get("rating"));
    const room = data.get("room");
    const view = data.get("view");
    const breakfast = data.get("breakfast");
    if (selectedHotel.price > budget || selectedHotel.rating < minRating ||
      (room !== "Any" && selectedHotel.type !== room) ||
      (view !== "Any" && selectedHotel.view !== view) ||
      (breakfast === "Required" && !selectedHotel.breakfast)) {
      setMessage("Selected hotel does not match every preference. Change preferences or select another hotel.");
      return;
    }
    setDraft(old => ({ ...old, match: { budget, minRating, room, view, breakfast } }));
    updateCustom("guests", data.get("guests"));
    showPage("customizer");
  };

  const submitCustomizer = e => {
    e.preventDefault();
    const c = draft.custom;
    if (!c?.name?.trim()) return alert("Enter the guest name.");
    if (!c.start || !c.end || new Date(c.end) <= new Date(c.start) || new Date(c.start) < new Date(new Date().toDateString())) {
      return alert("Please select valid future check-in and check-out dates.");
    }
    showPage("housekeeping");
  };

  const nights = draft.custom?.start && draft.custom?.end
    ? Math.max(0, Math.round((new Date(draft.custom.end + "T00:00:00") - new Date(draft.custom.start + "T00:00:00")) / 86400000))
    : 0;

  const cost = useMemo(() => {
    if (!selectedHotel || !draft.custom || nights < 1) return null;
    const c = draft.custom;
    let rate = selectedHotel.price;
    if (c.roomType === "AC" && selectedHotel.type === "Non-AC") rate += 400;
    if (c.roomType === "Non-AC" && selectedHotel.type === "AC") rate = Math.max(500, rate - 300);
    if (c.view !== selectedHotel.view && c.view !== "Standard") rate += 200;
    const extraNight = (c.facilities.includes("Breakfast") ? 250 : 0) + (c.facilities.includes("Pool") ? 150 : 0);
    const fixedExtras = c.facilities.includes("Airport pickup") ? 500 : 0;
    const subtotal = (rate + extraNight) * nights + fixedExtras;
    const code = (coupon || draft.coupon || "").trim().toUpperCase();
    let discount = 0;
    if (code === "STAY10") discount = Math.min(1000, subtotal * 0.10);
    if (code === "WELCOME300" && subtotal >= 2000) discount = 300;
    if (code === "BIRTHDAY15") discount = Math.min(1200, subtotal * 0.15);
    const tax = Math.max(0, subtotal - discount) * 0.12;
    return { hotel: selectedHotel, ...c, nights, rate, subtotal, discount, tax, total: subtotal - discount + tax, coupon: code };
  }, [selectedHotel, draft, nights, coupon]);

  const submitHousekeeping = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const service = {
      type: data.get("type"), time: data.get("time"), repeat: data.get("repeat"),
      privacy: data.get("privacy"), notes: data.get("notes")
    };
    setDraft(old => ({ ...old, service }));
    localStorage.setItem("ssService", JSON.stringify(service));
    showPage("budget");
  };

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (!["STAY10", "WELCOME300", "BIRTHDAY15"].includes(code)) {
      setCouponMessage("Invalid coupon. Try STAY10, WELCOME300 or BIRTHDAY15.");
      return;
    }
    setCoupon(code);
    setDraft(old => ({ ...old, coupon: code }));
    setCouponMessage("Coupon selected. Discount is shown below.");
  };

  const confirmBooking = () => {
    if (!cost) return alert("Check the booking dates and room details.");
    const saved = { ...cost, hotelId: selectedHotel.id };
    setBooking(saved);
    sessionStorage.setItem("ssBooking", JSON.stringify(saved));
    showPage("bill");
  };

  const activeBooking = booking || (() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem("ssBooking") || "null");
      return saved ? { ...saved, hotel: hotels.find(h => h.id === Number(saved.hotelId)) } : null;
    } catch { return null; }
  })();

  const currentHotel = activeBooking?.hotel || selectedHotel;

  const cancelBooking = () => {
    if (!window.confirm("Cancel this booking flow and return Home?")) return;
    setDraft({});
    setSelectedHotel(null);
    setCoupon("");
    showPage("home");
  };

  const submitRating = () => {
    if (!activeBooking) return setMessage("Complete a demo booking before rating a stay.");
    const key = user?.email || "guest";
    const value = Number(rating);
    setRatings(old => ({ ...old, [key]: value }));
    const earned = value >= 4 ? 50 : value === 3 ? 25 : 10;
    setPoints(old => old + earned);
    setMessage(`Rating saved. You earned ${earned} demo points.`);
  };

  const checkBirthday = () => {
    if (!birthday) return setMessage("Please select your birthday.");
    const updated = { ...user, birthday };
    setUser(updated);
    setUsers(old => old.map(u => u.email === user.email ? updated : u));
    const date = new Date(birthday + "T00:00:00");
    const now = new Date();
    setMessage(date.getMonth() === now.getMonth() && date.getDate() === now.getDate()
      ? "Happy Birthday! Your demo BIRTHDAY15 coupon is available."
      : "Birthday saved. You can try BIRTHDAY15 as a sample coupon.");
  };

  const foodTotal = foodQty.friedRice * 150 + foodQty.paneer * 180 + foodQty.biryani * 250 + foodQty.juice * 80;

  const placeFoodOrder = () => {
    if (!foodRoom.trim()) return alert("Please enter your room number.");
    if (foodTotal <= 0) return alert("Please select at least one food item.");
    const order = {
      orderId: "FOOD" + Date.now().toString().slice(-6),
      room: foodRoom, total: foodTotal, status: "Order Placed",
      date: new Date().toLocaleString()
    };
    localStorage.setItem("staySmartFoodOrder", JSON.stringify(order));
    setFoodOrderStatus(`Order ID: ${order.orderId} | Room: ${foodRoom} | Total: ${money(foodTotal)} | ${order.status}`);
  };

  const analyzeReview = () => {
    const words = review.toLowerCase().match(/[a-z]+/g) || [];
    if (!review.trim()) return setReviewResult("Please enter a customer review.");
    const positive = ["good", "great", "excellent", "clean", "friendly", "comfortable", "amazing", "helpful", "love", "best", "beautiful", "delicious", "perfect", "nice"];
    const negative = ["bad", "poor", "dirty", "rude", "slow", "worst", "broken", "expensive", "uncomfortable", "terrible", "disappointed", "noisy", "problem", "awful"];
    const positiveScore = words.filter(w => positive.includes(w)).length;
    const negativeScore = words.filter(w => negative.includes(w)).length;
    const sentiment = positiveScore > negativeScore ? "Positive" : negativeScore > positiveScore ? "Negative" : Number(reviewRating) >= 4 ? "Positive" : Number(reviewRating) <= 2 ? "Negative" : "Neutral";
    const suggestion = sentiment === "Positive" ? "Keep maintaining your service quality." : sentiment === "Negative" ? "Review the complaint and improve the guest experience." : "Ask the guest for more details to improve the service.";
    setReviewResult(`Sentiment: ${sentiment} | Rating: ${reviewRating}/5 | Positive keywords: ${positiveScore} | Negative keywords: ${negativeScore} | Suggestion: ${suggestion}`);
  };

  const doCheckIn = () => {
    if (!guestName.trim() || !bookingId.trim() || !roomNumber.trim()) return alert("Please enter guest name, booking ID and room number.");
    setStayStatus("Checked In");
  };

  const doCheckOut = () => {
    if (stayStatus !== "Checked In") return alert("Please complete check-in first.");
    setStayStatus("Checked Out");
  };

  const generateLockCode = () => {
    if (!activeBooking) {
      setLockStatus("Confirm a demo booking first.");
      setLockCode("----");
      return;
    }
    setLockCode("SS-" + Math.floor(1000 + Math.random() * 9000));
    setLockStatus("Demo room access code generated.");
  };

  const emergencyCall = () => {
    if (window.confirm("Do you need emergency assistance?")) window.location.href = "tel:112";
  };

  const openMap = () => {
    if (!currentHotel) return alert("Select a hotel first.");
    window.open(`https://www.google.com/maps/search/?api=1&query=${currentHotel.lat},${currentHotel.lng}`, "_blank", "noopener");
  };

  const renderAuth = () => (
    <section className="auth-page" id="authPage">
      <div className="auth-card panel">
        <h1>StaySmart</h1>
        <p>Smart Hotel Booking Platform</p>
        <div className="auth-tabs">
          <button className={authMode === "login" ? "primary" : "secondary"} onClick={() => { setAuthMode("login"); setAuthMessage(""); }}>Login</button>
          <button className={authMode === "register" ? "primary" : "secondary"} onClick={() => { setAuthMode("register"); setAuthMessage(""); }}>Register</button>
        </div>
        {authMode === "login" ? (
          <form onSubmit={login}>
            <label>Email</label>
            <input name="email" type="email" placeholder="Enter email" required />
            <label>Password</label>
            <input name="password" type="password" placeholder="Enter password" required />
            <button className="primary" type="submit">Login</button>
          </form>
        ) : (
          <form onSubmit={register}>
            <label>Full Name</label><input name="name" placeholder="Enter your name" required />
            <label>Email</label><input name="email" type="email" placeholder="Enter email" required />
            <label>Phone Number</label><input name="phone" type="tel" pattern="[0-9]{10}" placeholder="10-digit phone number" required />
            <label>Password</label><input name="password" type="password" minLength="6" required />
            <label>Confirm Password</label><input name="confirm" type="password" required />
            <label>Birthday</label><input name="birthday" type="date" />
            <label><input type="checkbox" required /> I agree to the terms and conditions</label>
            <button className="primary" type="submit">Create Account</button>
          </form>
        )}
        {authMessage && <p className={`message ${authError ? "error" : "success"}`}>{authMessage}</p>}
      </div>
    </section>
  );

  if (!user) return renderAuth();

  return (
    <div className="app-container">
      <header className="topbar">
        <div className="brand">StaySmart</div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <nav id="mainNav">
          <button onClick={() => showPage("home")}>Home</button>
          <button onClick={() => showPage("bill")}>My Bill</button>
          <button onClick={() => showPage("location")}>Live Location</button>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>

      {menuOpen && (
        <aside id="sideMenu" className="side-menu">
          <button onClick={() => showPage("home")}>Home</button>
          <button onClick={() => showPage("bill")}>My Bill</button>
          <button onClick={() => showPage("location")}>Live Location</button>
          <button onClick={() => showPage("rewards")}>Rewards & Offers</button>
          <button onClick={() => openExtraFeature("management")}>Management System</button>
          <button onClick={() => openExtraFeature("checkin")}>Digital Check-in / Check-out</button>
          <button onClick={() => openExtraFeature("foodservice")}>Food & Room Service</button>
          <button onClick={() => openExtraFeature("review")}>AI Review Analyzer</button>
          <button onClick={logout}>Logout</button>
        </aside>
      )}

      <main id="appPage">
        {page === "home" && !extraPage && (
          <section id="homePage" className="page">
            <section className="hero">
              <p className="eyebrow">WELCOME TO STAYSMART</p>
              <h1>Find Your Perfect Stay</h1>
              <p>Discover comfortable hotels and plan your stay with smart features.</p>
              <form className="search-grid panel" onSubmit={searchHotels}>
                <label>Destination
                  <input value={destination} onChange={e => setDestination(e.target.value)} placeholder="Goa" />
                </label>
                <label>Check-in
                  <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} required />
                </label>
                <label>Check-out
                  <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} required />
                </label>
                <label>Guests
                  <select value={guests} onChange={e => setGuests(e.target.value)}>
                    {[1, 2, 3, 4, 5, 6].map(n => <option key={n}>{n}</option>)}
                  </select>
                </label>
                <button className="primary" type="submit">Search Hotels</button>
              </form>
            </section>

            <section className="popular-cities">
              <h2>Popular Destinations</h2>
              <div className="city-buttons">
                {["Goa", "Hyderabad", "Bangalore", "Chennai"].map(city => (
                  <button className="secondary" key={city} onClick={() => chooseCity(city)}>{city}</button>
                ))}
              </div>
            </section>

            {hotelList.length > 0 && (
              <section id="hotelSection" className="hotel-section">
                <h2>Hotels in {destination}</h2>
                <p>{hotelList.length} sample hotels</p>
                <div className="hotel-grid" id="hotelGrid">
                  {hotelList.map(h => {
                    const i = slides[h.id] || 0;
                    return (
                      <article className="hotel-card" key={h.id}>
                        <div className="carousel">
                          <img src={h.images[i]} alt={h.name} onError={e => { e.currentTarget.src = "https://placehold.co/800x450?text=Hotel+Preview"; }} />
                          <button className="carousel-arrow left" onClick={() => moveSlide(h.id, -1)}>‹</button>
                          <button className="carousel-arrow right" onClick={() => moveSlide(h.id, 1)}>›</button>
                          <span className="carousel-count">{i + 1} / {h.images.length}</span>
                        </div>
                        <div className="hotel-info">
                          <span className="rating">★ {h.rating} / 5</span>
                          <h3>{h.name}</h3>
                          <p>📍 {h.location}</p>
                          <p>{h.type} · {h.view} · {h.breakfast ? "Breakfast available" : "Breakfast optional"}</p>
                          <div className="hotel-price">{money(h.price)} <small>/ night</small></div>
                          <p>AI View Tour: Preview hotel images using the arrows.</p>
                          <div className="card-buttons">
                            <button className="secondary" onClick={() => { setSelectedHotel(h); setDraft({ custom: { name: user.name, roomType: h.type, bed: "Queen", view: h.view, start: checkIn, end: checkOut, guests, floor: "Any floor", facilities: ["Wi-Fi"], notes: "" } }); showPage("customizer"); }}>View Details</button>
                            <button className="primary" onClick={() => startBooking(h)}>Book Now</button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}
            {hotelList.length === 0 && destination && <p className="message">Search a city to view sample hotels.</p>}
          </section>
        )}

        {page === "matcher" && !extraPage && (
          <section id="matcherPage" className="page panel">
            <h2>Smart Room Matcher</h2>
            {selectedHotel && <p>{selectedHotel.name} · {money(selectedHotel.price)} / night</p>}
            <form onSubmit={submitMatcher}>
              <label>Maximum Budget per Night<input name="budget" type="number" defaultValue="5000" min="500" required /></label>
              <label>Minimum Rating
                <select name="rating" defaultValue="4"><option value="3">3+</option><option value="4">4+</option><option value="4.5">4.5+</option></select>
              </label>
              <label>Room Type<select name="room"><option>Any</option><option>AC</option><option>Non-AC</option></select></label>
              <label>Room View<select name="view"><option>Any</option><option>Sea view</option><option>Garden view</option><option>City view</option></select></label>
              <label>Guests<select name="guests" defaultValue={guests}>{[1, 2, 3, 4, 5, 6].map(n => <option key={n}>{n}</option>)}</select></label>
              <label>Breakfast<select name="breakfast"><option>Optional</option><option>Required</option></select></label>
              <label><input type="checkbox" name="quiet" /> Quiet room</label>
              <label><input type="checkbox" name="family" /> Family friendly</label>
              <label><input type="checkbox" name="near" /> Near attractions</label>
              <p className="message">{message}</p>
              <button className="primary" type="submit">Find My Room</button>
              <button className="secondary" type="button" onClick={cancelBooking}>Cancel</button>
            </form>
          </section>
        )}

        {page === "customizer" && !extraPage && (
          <section id="customizerPage" className="page panel">
            <h2>Room Customizer</h2>
            {selectedHotel && <p>{selectedHotel.name} · {selectedHotel.location}</p>}
            <form onSubmit={submitCustomizer}>
              <label>Guest Name<input value={draft.custom?.name || ""} onChange={e => updateCustom("name", e.target.value)} required /></label>
              <label>Room Type<select value={draft.custom?.roomType || "AC"} onChange={e => updateCustom("roomType", e.target.value)}><option>AC</option><option>Non-AC</option></select></label>
              <label>Bed Type<select value={draft.custom?.bed || "Queen"} onChange={e => updateCustom("bed", e.target.value)}><option>Single</option><option>Double</option><option>Queen</option><option>King</option></select></label>
              <label>Room View<select value={draft.custom?.view || "Standard"} onChange={e => updateCustom("view", e.target.value)}><option>Standard</option><option>Sea view</option><option>Garden view</option><option>City view</option></select></label>
              <label>Check-in<input type="date" value={draft.custom?.start || checkIn} onChange={e => updateCustom("start", e.target.value)} required /></label>
              <label>Check-out<input type="date" value={draft.custom?.end || checkOut} onChange={e => updateCustom("end", e.target.value)} required /></label>
              <label>Guests<select value={draft.custom?.guests || guests} onChange={e => updateCustom("guests", e.target.value)}>{[1, 2, 3, 4, 5, 6].map(n => <option key={n}>{n}</option>)}</select></label>
              <label>Floor Preference<select value={draft.custom?.floor || "Any floor"} onChange={e => updateCustom("floor", e.target.value)}><option>Any floor</option><option>Low floor</option><option>Middle floor</option><option>High floor</option></select></label>
              <p>Facilities</p>
              {["Wi-Fi", "Breakfast", "Pool", "Airport pickup"].map(f => <label key={f}><input type="checkbox" checked={(draft.custom?.facilities || []).includes(f)} onChange={() => toggleFacility(f)} /> {f}</label>)}
              <label>Special Requests<textarea value={draft.custom?.notes || ""} onChange={e => updateCustom("notes", e.target.value)} /></label>
              <button className="primary" type="submit">Continue to Housekeeping</button>
              <button className="secondary" type="button" onClick={cancelBooking}>Cancel</button>
            </form>
          </section>
        )}

        {page === "housekeeping" && !extraPage && (
          <section id="housekeepingPage" className="page panel">
            <h2>Housekeeping Scheduler</h2>
            <form onSubmit={submitHousekeeping}>
              <label>Service Type<select name="type"><option>Room Cleaning</option><option>Fresh Towels</option><option>Bed Sheet Change</option><option>Room Sanitization</option></select></label>
              <label>Preferred Time<input name="time" type="time" required /></label>
              <label>Repeat<select name="repeat"><option>One time</option><option>Daily</option><option>Every two days</option></select></label>
              <label>Privacy Preference<select name="privacy"><option>Clean when I am away</option><option>Knock before entering</option><option>Do not disturb</option></select></label>
              <label>Notes<textarea name="notes" /></label>
              <button className="primary" type="submit">Continue to Budget</button>
            </form>
          </section>
        )}

        {page === "budget" && !extraPage && (
          <section id="budgetPage" className="page panel">
            <h2>Stay Budget Simulator</h2>
            {cost ? <>
              <div id="budgetSummary">
                <h3>{cost.hotel.name}</h3>
                <p>Guest: {cost.name}</p>
                <p>Dates: {cost.start} to {cost.end} · {cost.nights} nights</p>
                <p>Room: {cost.roomType} / {cost.bed} / {cost.view}</p>
                <p>Guests: {cost.guests} · Floor: {cost.floor}</p>
                <p>Housekeeping: {draft.service?.type} — {draft.service?.time}</p>
                <p>Facilities: {cost.facilities.join(", ") || "Standard"}</p>
              </div>
              <label>Coupon Code<input value={coupon} onChange={e => setCoupon(e.target.value.toUpperCase())} placeholder="STAY10" /></label>
              <button className="secondary" type="button" onClick={applyCoupon}>Apply Coupon</button>
              <p className="message">{couponMessage}</p>
              <p>Available coupons: STAY10, WELCOME300, BIRTHDAY15</p>
              <div id="finalCost">
                <div className="bill-line"><span>Room × {cost.nights} nights</span><strong>{money(cost.rate * cost.nights)}</strong></div>
                <div className="bill-line"><span>Facilities and extras</span><strong>{money(cost.subtotal - cost.rate * cost.nights)}</strong></div>
                <div className="bill-line"><span>Subtotal</span><strong>{money(cost.subtotal)}</strong></div>
                <div className="bill-line"><span>Discount</span><strong>−{money(cost.discount)}</strong></div>
                <div className="bill-line"><span>Tax (12%)</span><strong>{money(cost.tax)}</strong></div>
                <div className="total-line">Total: {money(cost.total)}</div>
              </div>
              <button className="primary" onClick={confirmBooking}>Confirm Demo Booking</button>
              <button className="secondary" onClick={cancelBooking}>Cancel Booking</button>
            </> : <p>Please complete your room details first.</p>}
          </section>
        )}

        {page === "bill" && !extraPage && (
          <section id="billPage" className="page panel">
            <h2>My Bill</h2>
            {activeBooking ? <>
              <p className="eyebrow">DEMO BOOKING CONFIRMED</p>
              <h3>{activeBooking.hotel?.name}</h3>
              <p>📍 {activeBooking.hotel?.location}</p><hr />
              <p><strong>Guest:</strong> {activeBooking.name}</p>
              <p><strong>Check-in:</strong> {activeBooking.start}</p>
              <p><strong>Check-out:</strong> {activeBooking.end}</p>
              <p><strong>Nights:</strong> {activeBooking.nights} · <strong>Guests:</strong> {activeBooking.guests}</p>
              <p><strong>Room:</strong> {activeBooking.roomType} / {activeBooking.bed} / {activeBooking.view}</p>
              <p><strong>Facilities:</strong> {activeBooking.facilities?.join(", ") || "Standard"}</p>
              <p><strong>Housekeeping:</strong> {activeBooking.service?.type || draft.service?.type || "Not requested"}</p>
              <div className="bill-line"><span>Subtotal</span><strong>{money(activeBooking.subtotal)}</strong></div>
              <div className="bill-line"><span>Discount</span><strong>−{money(activeBooking.discount)}</strong></div>
              <div className="bill-line"><span>Tax</span><strong>{money(activeBooking.tax)}</strong></div>
              <div className="total-line">Total: {money(activeBooking.total)}</div>
              <p className="message">Demo only. No real reservation or payment was made.</p>
              <button className="primary" onClick={() => showPage("location")}>View Hotel Location</button>
              <button className="secondary" onClick={() => showPage("rewards")}>Rate Stay & Rewards</button>
              <button className="secondary" onClick={() => window.print()}>Print Bill</button>
            </> : <p>No confirmed booking yet. Select a hotel and complete all four steps.</p>}
          </section>
        )}

        {page === "location" && !extraPage && (
          <section id="locationPage" className="page panel">
            <h2>Live Hotel Location</h2>
            {currentHotel ? <>
              <h3>{currentHotel.name}</h3>
              <p>{currentHotel.location}</p>
              <p>Map coordinates: {currentHotel.lat}, {currentHotel.lng}</p>
              <div id="mapFrame">
                <iframe title="Hotel map" loading="lazy" width="100%" height="350" src={`https://www.openstreetmap.org/export/embed.html?bbox=${currentHotel.lng - 0.025}%2C${currentHotel.lat - 0.015}%2C${currentHotel.lng + 0.025}%2C${currentHotel.lat + 0.015}&layer=mapnik&marker=${currentHotel.lat}%2C${currentHotel.lng}`} />
              </div>
              <button className="primary" onClick={openMap}>Open in Google Maps</button>
            </> : <p>Select a hotel or confirm a booking to view its location.</p>}
          </section>
        )}

        {page === "rewards" && !extraPage && (
          <section id="rewardsPage" className="page panel">
            <h2>Rewards & Offers</h2>
            <h3>Your points: {points}</h3>
            <label>Rate your stay
              <select value={rating} onChange={e => setRating(e.target.value)}>{[1, 2, 3, 4, 5].map(n => <option key={n}>{n}</option>)}</select>
            </label>
            <button className="primary" onClick={submitRating}>Submit Rating</button>
            <p className="message">{message}</p>
            <hr />
            <h3>Birthday Offer</h3>
            <label>Your Birthday<input type="date" value={birthday || user.birthday || ""} onChange={e => setBirthday(e.target.value)} /></label>
            <button className="secondary" onClick={checkBirthday}>Check Birthday Offer</button>
            <p className="message">{message}</p>
            <h3>Available Offers</h3>
            <p>STAY10 · 10% discount (up to ₹1,000)</p>
            <p>WELCOME300 · ₹300 discount on eligible stays</p>
            <p>BIRTHDAY15 · 15% discount (up to ₹1,200)</p>
          </section>
        )}
      </main>

      {extraPage === "management" && (
        <section id="management" className="extra-feature panel">
          <button className="secondary" onClick={() => setExtraPage("")}>← Back</button>
          <h2>Hotel Management System</h2>
          <div className="feature-grid">
            <article className="feature-card">
              <h3>Food Call</h3>
              <label>Request<select value={foodType} onChange={e => setFoodType(e.target.value)}><option>Room service</option><option>Drinking water</option><option>Extra towels</option><option>Maintenance</option></select></label>
              <label>Notes<textarea value={foodNotes} onChange={e => setFoodNotes(e.target.value)} /></label>
              <button className="primary" onClick={() => setMessage(`Demo food request: ${foodType}${foodNotes ? " — " + foodNotes : ""}. No real hotel was contacted.`)}>Send Request</button>
              <p className="message">{message}</p>
            </article>
            <article className="feature-card">
              <h3>Room Door Lock</h3>
              <h2 id="lockCode">{lockCode}</h2>
              <p>{lockStatus}</p>
              <button className="primary" onClick={generateLockCode}>Generate Demo Code</button>
              <button className="secondary" onClick={() => { setLockCode("----"); setLockStatus("Demo lock code reset."); }}>Reset Code</button>
            </article>
            <article className="feature-card">
              <h3>Emergency Call</h3>
              <p>For emergencies, contact emergency services.</p>
              <button className="primary" onClick={emergencyCall}>Emergency Call 112</button>
            </article>
          </div>
        </section>
      )}

      {extraPage === "checkin" && (
        <section id="checkin" className="extra-feature panel">
          <button className="secondary" onClick={() => setExtraPage("")}>← Back</button>
          <h2>Digital Check-in / Check-out</h2>
          <label>Guest Name<input value={guestName} onChange={e => setGuestName(e.target.value)} /></label>
          <label>Booking ID<input value={bookingId} onChange={e => setBookingId(e.target.value)} /></label>
          <label>Room Number<input value={roomNumber} onChange={e => setRoomNumber(e.target.value)} /></label>
          <button className="primary" onClick={doCheckIn}>Digital Check-in</button>
          <button className="secondary" onClick={doCheckOut}>Digital Check-out</button>
          <p id="checkinStatus" className="message">Status: {stayStatus}{stayStatus === "Checked In" ? ` | Guest: ${guestName} | Room: ${roomNumber}` : stayStatus === "Checked Out" ? ` | Room: ${roomNumber}` : ""}</p>
        </section>
      )}

      {extraPage === "foodservice" && (
        <section id="foodservice" className="extra-feature panel">
          <button className="secondary" onClick={() => setExtraPage("")}>← Back</button>
          <h2>Food & Room Service</h2>
          <p>Fried Rice — ₹150</p><input type="number" min="0" value={foodQty.friedRice} onChange={e => setFoodQty(old => ({ ...old, friedRice: Math.max(0, Number(e.target.value)) }))} />
          <p>Paneer Curry — ₹180</p><input type="number" min="0" value={foodQty.paneer} onChange={e => setFoodQty(old => ({ ...old, paneer: Math.max(0, Number(e.target.value)) }))} />
          <p>Biryani — ₹250</p><input type="number" min="0" value={foodQty.biryani} onChange={e => setFoodQty(old => ({ ...old, biryani: Math.max(0, Number(e.target.value)) }))} />
          <p>Juice — ₹80</p><input type="number" min="0" value={foodQty.juice} onChange={e => setFoodQty(old => ({ ...old, juice: Math.max(0, Number(e.target.value)) }))} />
          <h3>Food Total: {money(foodTotal)}</h3>
          <label>Room Number<input value={foodRoom} onChange={e => setFoodRoom(e.target.value)} /></label>
          <button className="primary" onClick={placeFoodOrder}>Place Food Order</button>
          <p className="message">{foodOrderStatus}</p>
        </section>
      )}

      {extraPage === "review" && (
        <section id="review" className="extra-feature panel">
          <button className="secondary" onClick={() => setExtraPage("")}>← Back</button>
          <h2>AI Review Analyzer</h2>
          <p>Enter a customer review to analyze its sentiment.</p>
          <label>Customer Review<textarea value={review} onChange={e => setReview(e.target.value)} placeholder="Write your hotel experience..." /></label>
          <label>Rating
            <select value={reviewRating} onChange={e => setReviewRating(e.target.value)}>{[1, 2, 3, 4, 5].map(n => <option key={n}>{n}</option>)}</select>
          </label>
          <button className="primary" onClick={analyzeReview}>Analyze Review</button>
          <p id="reviewResult" className="message">{reviewResult}</p>
          <p><small>Note: This is a keyword-based demo analyzer, not a real AI model.</small></p>
        </section>
      )}

      <footer className="footer">
        <p>© 2026 StaySmart — Smart Hotel Booking Platform</p>
        <p>Frontend demonstration only. No real hotel booking or payment is processed.</p>
      </footer>

      <button className="emergency-btn" onClick={emergencyCall}>Emergency 112</button>
    </div>
  );
}

export default App;
