import React, { useState, useEffect } from 'react';
import TrainerCard from './TrainerCard';
import SearchResults from './SearchResults';

// Typewriter effect component
function TypeWriter({ text, delay = 100, onComplete }) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  return <span>{currentText}</span>;
}

function App() {
  const [user, setUser] = useState(null);
  const [roleSelect, setRoleSelect] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [booking, setBooking] = useState({ name: '', email: '', phone: '', age: '', notes: '' });
  const [trainerSearch, setTrainerSearch] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [filterSkill, setFilterSkill] = useState('');
  const [filterDropdown, setFilterDropdown] = useState('');
  const [trainers, setTrainers] = useState([]);
  const [showTypewriter, setShowTypewriter] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch trainers from backend API
    const fetchTrainers = async () => {
      try {
        console.log("Fetching trainers from backend...");
        const response = await fetch('http://localhost:8080/api/trainers');
        if (response.ok) {
          const backendTrainers = await response.json();
          // Transform backend data to match frontend structure
          const transformedTrainers = backendTrainers.map(trainer => ({
            id: trainer.id,
            name: trainer.name,
            bio: trainer.bio,
            specialties: trainer.specialties,
            location: trainer.location,
            rate: trainer.rate,
            photo: trainer.photoUrl
          }));
          setTrainers(transformedTrainers);
          console.log("✅ Trainers loaded from backend:", transformedTrainers);
        } else {
          console.error("Failed to fetch trainers, using fallback data");
          // Fallback to mock data if backend is not available
          const mockTrainers = [
            {
              id: 1,
              name: "Michael Jordan",
              bio: "Former NBA superstar specializing in shooting fundamentals and mental toughness. Perfect for youth and adult players looking to elevate their game.",
              specialties: "Shooting, All Around, Skills",
              location: "Chicago, IL",
              rate: 150,
              photo: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
            },
            {
              id: 2,
              name: "Sarah Thompson",
              bio: "Professional skills coach with 10+ years experience. Specializes in developing young players aged 8-16 with fundamentals and confidence building.",
              specialties: "Skills, Youth Development",
              location: "Los Angeles, CA", 
              rate: 75,
              photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
            }
          ];
          setTrainers(mockTrainers);
        }
      } catch (error) {
        console.error("Error fetching trainers:", error);
        // Fallback to mock data on error
        setTrainers([]);
      }
    };

    fetchTrainers();
  }, []);

  const filtered = trainers.filter(tr => {
    const matchesLocation = !filterLocation || tr.location?.toLowerCase().includes(filterLocation.toLowerCase());
    const matchesSpecialty = !filterSpecialty || (tr.specialties && tr.specialties.toLowerCase().includes(filterSpecialty.toLowerCase()));
    const matchesPrice = !filterPrice || tr.rate <= Number(filterPrice);
    const matchesSkill = !filterSkill || tr.bio?.toLowerCase().includes(filterSkill.toLowerCase());
    let matchesSearch = true;
    matchesSearch = !trainerSearch || tr.name?.toLowerCase().includes(trainerSearch.toLowerCase());
    return matchesLocation && matchesSpecialty && matchesPrice && matchesSkill && matchesSearch;
  });

  const handleBookClick = trainer => {
    setSelectedTrainer(trainer);
    if (!user) {
      setShowLoginModal(true);
    } else {
      setShowModal(true);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (trainerSearch.trim()) {
      setSearchQuery(trainerSearch.trim());
      setCurrentPage('search');
    }
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSearchQuery('');
  };

  // Render search results page
  if (currentPage === 'search') {
    return (
      <>
        <SearchResults 
          searchQuery={searchQuery}
          trainers={trainers}
          onBookClick={handleBookClick}
          user={user}
          onBack={handleBackToHome}
        />
        
        {/* Booking Modal */}
        {showModal && selectedTrainer && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', minWidth: '100vw', minHeight: '100vh', background: 'rgba(24,24,24,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }}>
            <div style={{ background: 'linear-gradient(135deg, #2C2C2C, #1A1A1A)', color: '#FFF', borderRadius: '20px', padding: '2.5rem 2.5rem 2rem 2.5rem', minWidth: 340, maxWidth: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.4)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
              <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: 18, right: 18, background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)', color: '#FFF', border: 'none', borderRadius: '50%', width: 36, height: 36, fontWeight: 700, fontSize: '1.3rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(255,107,107,0.3)' }}>×</button>
              <img src={selectedTrainer.photo} alt={selectedTrainer.name} style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1.2rem', border: '3px solid #4ECDC4' }} />
              <h3 style={{ margin: '0.5rem 0', fontWeight: 700, fontSize: '1.4rem' }}>{selectedTrainer.name}</h3>
              <div style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#4ECDC4', fontWeight: 500 }}>{selectedTrainer.specialties}</div>
              <div style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>{selectedTrainer.bio}</div>
              <div style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>Location: {selectedTrainer.location}</div>
              <div style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: '#4ECDC4', fontWeight: 600 }}>Rate: ${selectedTrainer.rate}/hr</div>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1.5rem' }} onSubmit={e => {
                e.preventDefault();
                fetch('http://localhost:8080/api/bookings', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    student: user ? user.name : booking.name,
                    trainer: selectedTrainer.id,
                    status: 'requested',
                    notes: booking.notes,
                    email: user ? user.email : booking.email,
                    phone: booking.phone,
                    age: booking.age,
                  })
                }).then(() => {
                  setShowModal(false);
                  setBooking({ name: '', email: '', phone: '', age: '', notes: '' });
                  alert('Booking submitted!');
                });
              }}>
                <input required type="text" placeholder="Name" value={user ? user.name : booking.name} onChange={e => setBooking(b => ({ ...b, name: e.target.value }))} style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: 'none', fontSize: '1rem', background: 'rgba(255,255,255,0.1)', color: '#FFF', backdropFilter: 'blur(10px)' }} />
                <input required type="email" placeholder="Email" value={user ? user.email : booking.email} onChange={e => setBooking(b => ({ ...b, email: e.target.value }))} style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: 'none', fontSize: '1rem', background: 'rgba(255,255,255,0.1)', color: '#FFF', backdropFilter: 'blur(10px)' }} />
                <input required type="tel" placeholder="Phone" value={booking.phone} onChange={e => setBooking(b => ({ ...b, phone: e.target.value }))} style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: 'none', fontSize: '1rem', background: 'rgba(255,255,255,0.1)', color: '#FFF', backdropFilter: 'blur(10px)' }} />
                <input required type="number" placeholder="Age" value={booking.age} onChange={e => setBooking(b => ({ ...b, age: e.target.value }))} style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: 'none', fontSize: '1rem', background: 'rgba(255,255,255,0.1)', color: '#FFF', backdropFilter: 'blur(10px)' }} />
                <textarea placeholder="Notes" value={booking.notes} onChange={e => setBooking(b => ({ ...b, notes: e.target.value }))} style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: 'none', fontSize: '1rem', minHeight: 70, background: 'rgba(255,255,255,0.1)', color: '#FFF', backdropFilter: 'blur(10px)', resize: 'vertical' }} />
                <button type="submit" style={{ background: 'linear-gradient(135deg, #4ECDC4, #44A08D)', color: '#FFF', border: 'none', borderRadius: '12px', padding: '1rem', fontWeight: 700, fontSize: '1.1rem', marginTop: '0.5rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(78,205,196,0.3)', transition: 'all 0.3s ease' }}>Book Session</button>
              </form>
            </div>
          </div>
        )}

        {/* Login Modal */}
        {showLoginModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', minWidth: '100vw', minHeight: '100vh', background: 'rgba(24,24,24,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }}>
            <div style={{ background: 'linear-gradient(135deg, #2C2C2C, #1A1A1A)', color: '#FFF', borderRadius: '20px', padding: '2.5rem', minWidth: 340, maxWidth: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.4)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
              <button onClick={() => setShowLoginModal(false)} style={{ position: 'absolute', top: 18, right: 18, background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)', color: '#FFF', border: 'none', borderRadius: '50%', width: 36, height: 36, fontWeight: 700, fontSize: '1.3rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(255,107,107,0.3)' }}>×</button>
              <h3 style={{ margin: '0.5rem 0 1.5rem 0', fontWeight: 700, fontSize: '1.6rem', textAlign: 'center' }}>Login</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '1rem', marginBottom: '0.5rem', display: 'block', color: 'rgba(255,255,255,0.9)' }}>Select your role:</label>
                <select value={roleSelect} onChange={e => setRoleSelect(e.target.value)} style={{ padding: '0.8rem 1rem', borderRadius: '10px', fontSize: '1rem', width: '100%', marginBottom: '1rem', background: 'rgba(255,255,255,0.1)', color: '#FFF', border: 'none', backdropFilter: 'blur(10px)' }}>
                  <option value="" style={{ background: '#2C2C2C', color: '#FFF' }}>Choose...</option>
                  <option value="student" style={{ background: '#2C2C2C', color: '#FFF' }}>Student</option>
                  <option value="trainer" style={{ background: '#2C2C2C', color: '#FFF' }}>Trainer</option>
                  <option value="admin" style={{ background: '#2C2C2C', color: '#FFF' }}>Admin</option>
                </select>
              </div>
              <button 
                style={{ 
                  background: roleSelect ? 'linear-gradient(135deg, #4ECDC4, #44A08D)' : 'rgba(255,255,255,0.2)', 
                  color: '#FFF', 
                  border: 'none', 
                  borderRadius: '12px', 
                  padding: '0.9rem', 
                  fontWeight: 700, 
                  fontSize: '1.1rem', 
                  width: '100%', 
                  cursor: roleSelect ? 'pointer' : 'not-allowed', 
                  boxShadow: roleSelect ? '0 4px 15px rgba(78,205,196,0.3)' : 'none',
                  transition: 'all 0.3s ease'
                }} 
                disabled={!roleSelect}
                onClick={() => { 
                  setUser({ name: 'Demo User', email: 'demo@example.com', role: roleSelect }); 
                  setShowLoginModal(false); 
                  if (selectedTrainer) {
                    setShowModal(true);
                  }
                }}
              >
                Login
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      minWidth: '100vw', 
      width: '100vw', 
      height: '100vh', 
      background: '#181818', 
      color: '#FFF', 
      overflow: 'hidden', 
      position: 'relative', 
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    }}>
      {/* Video Background - Local Basketball Video */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        preload="auto"
        onError={(e) => console.log('Video error:', e)}
        onLoadStart={() => console.log('Video loading started')}
        onCanPlay={() => console.log('Video can play')}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
          opacity: 0.8
        }}
      >
        <source src="/basketball.mp4" type="video/mp4" />
        {/* Fallback for if video doesn't load */}
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay for better text readability */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(24,24,24,0.3) 0%, rgba(0,0,0,0.2) 100%)',
        zIndex: 2
      }}></div>

      <header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        height: '80px', 
        padding: '0 3rem', 
        justifyContent: 'space-between', 
        position: 'relative', 
        zIndex: 20 
      }}>
        <h1 style={{ 
          margin: 0, 
          color: '#FFF', 
          fontWeight: 800, 
          fontSize: '2.5rem', 
          letterSpacing: '-1px', 
          fontFamily: "'Inter', sans-serif" 
        }}>Sessions</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user ? (
            <>
              <span style={{ color: '#FFF', fontSize: '1.1rem', fontWeight: 500 }}>Welcome, {user.name}</span>
              <button style={{ 
                background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)', 
                color: '#FFF', 
                border: 'none', 
                padding: '0.9rem 2rem', 
                borderRadius: '12px', 
                cursor: 'pointer', 
                fontSize: '1.1rem', 
                fontWeight: 600, 
                boxShadow: '0 4px 15px rgba(255,107,107,0.3)', 
                transition: 'all 0.3s ease' 
              }} onClick={() => setUser(null)}>Logout</button>
            </>
          ) : (
            <button style={{ 
              background: 'linear-gradient(135deg, #4ECDC4, #44A08D)', 
              color: '#FFF', 
              border: 'none', 
              padding: '0.9rem 2rem', 
              borderRadius: '12px', 
              cursor: 'pointer', 
              fontSize: '1.1rem', 
              fontWeight: 600, 
              boxShadow: '0 4px 15px rgba(78,205,196,0.3)', 
              transition: 'all 0.3s ease' 
            }} onClick={() => setShowLoginModal(true)}>Login</button>
          )}
        </div>
      </header>

      <main style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        minHeight: 'calc(100vh - 80px)', 
        minWidth: '100vw', 
        width: '100vw', 
        paddingTop: '2vh', 
        overflow: 'auto', 
        position: 'relative', 
        zIndex: 10 
      }}>
        {/* Hero Section with Typewriter */}
        <div style={{ textAlign: 'center', marginBottom: '2rem', maxWidth: '800px', padding: '0 2rem' }}>
          <h2 style={{ 
            fontWeight: 800, 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            marginBottom: '1.5rem', 
            background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4, #45B7D1)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.2,
            letterSpacing: '-2px'
          }}>
            {showTypewriter ? (
              <TypeWriter 
                text="Book Your Trainer" 
                delay={150} 
                onComplete={() => setShowTypewriter(false)}
              />
            ) : (
              "Book Your Trainer"
            )}
          </h2>
          <p style={{ 
            fontSize: '1.4rem', 
            color: 'rgba(255,255,255,0.9)', 
            fontWeight: 400, 
            lineHeight: 1.6,
            marginBottom: '3rem',
            textShadow: '2px 2px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)'
          }}>
            Find the perfect basketball trainer to elevate your game to the next level
          </p>
        </div>

        {/* Search Section */}
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              placeholder="Describe the trainer you want" 
              value={trainerSearch} 
              onChange={e => setTrainerSearch(e.target.value)} 
              style={{ 
                padding: '1.2rem 1.5rem', 
                borderRadius: '15px', 
                border: 'none', 
                width: '350px', 
                fontSize: '1.15rem', 
                textAlign: 'center', 
                background: 'rgba(255,255,255,0.95)', 
                color: '#181818', 
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                backdropFilter: 'blur(10px)',
                fontWeight: 500
              }} 
            />
            <button 
              type="submit"
              style={{ 
                background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)', 
                color: '#FFF', 
                border: 'none', 
                padding: '1.2rem 2rem', 
                borderRadius: '15px', 
                cursor: 'pointer', 
                fontSize: '1.15rem', 
                fontWeight: 600, 
                boxShadow: '0 8px 25px rgba(255,107,107,0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              Search
            </button>
          </form>
        </div>

        {/* Category Navigation Section */}
        <div style={{ 
          marginTop: '0.5rem', 
          width: '100%', 
          maxWidth: '1000px', 
          padding: '0 1.5rem',
          marginBottom: '1rem'
        }}>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '2rem',
            justifyItems: 'center'
          }}>
            {/* Location Category */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '10px',
              padding: '1rem',
              maxWidth: '180px',
              width: '100%',
              boxShadow: '0 6px 24px rgba(0,0,0,0.2)',
              textAlign: 'center'
            }}>
              <h4 style={{ 
                margin: '0', 
                fontSize: '1.2rem', 
                fontWeight: 700, 
                color: '#4ECDC4',
                letterSpacing: '-0.5px'
              }}>Global Locations</h4>
            </div>

            {/* Trainer Name Category */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '10px',
              padding: '1rem',
              maxWidth: '180px',
              width: '100%',
              boxShadow: '0 6px 24px rgba(0,0,0,0.2)',
              textAlign: 'center'
            }}>
              <h4 style={{ 
                margin: '0', 
                fontSize: '1.2rem', 
                fontWeight: 700, 
                color: '#FF6B6B',
                letterSpacing: '-0.5px'
              }}>Certified Trainers</h4>
            </div>

            {/* Workout Type Category */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '10px',
              padding: '1rem',
              maxWidth: '180px',
              width: '100%',
              boxShadow: '0 6px 24px rgba(0,0,0,0.2)',
              textAlign: 'center'
            }}>
              <h4 style={{ 
                margin: '0', 
                fontSize: '1.2rem', 
                fontWeight: 700, 
                color: '#45B7D1',
                letterSpacing: '-0.5px'
              }}>Focused Workouts</h4>
            </div>

            {/* Age Group Category */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '10px',
              padding: '1rem',
              maxWidth: '180px',
              width: '100%',
              boxShadow: '0 6px 24px rgba(0,0,0,0.2)',
              textAlign: 'center'
            }}>
              <h4 style={{ 
                margin: '0', 
                fontSize: '1.2rem', 
                fontWeight: 700, 
                color: '#FFD700',
                letterSpacing: '-0.5px'
              }}>Diverse Skill Levels</h4>
            </div>
          </div>
        </div>

      </main>

      {/* Booking Modal */}
      {showModal && selectedTrainer && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', minWidth: '100vw', minHeight: '100vh', background: 'rgba(24,24,24,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }}>
          <div style={{ background: 'linear-gradient(135deg, #2C2C2C, #1A1A1A)', color: '#FFF', borderRadius: '20px', padding: '2.5rem 2.5rem 2rem 2.5rem', minWidth: 340, maxWidth: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.4)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: 18, right: 18, background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)', color: '#FFF', border: 'none', borderRadius: '50%', width: 36, height: 36, fontWeight: 700, fontSize: '1.3rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(255,107,107,0.3)' }}>×</button>
            <img src={selectedTrainer.photo} alt={selectedTrainer.name} style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1.2rem', border: '3px solid #4ECDC4' }} />
            <h3 style={{ margin: '0.5rem 0', fontWeight: 700, fontSize: '1.4rem' }}>{selectedTrainer.name}</h3>
            <div style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#4ECDC4', fontWeight: 500 }}>{selectedTrainer.specialties}</div>
            <div style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>{selectedTrainer.bio}</div>
            <div style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>Location: {selectedTrainer.location}</div>
            <div style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: '#4ECDC4', fontWeight: 600 }}>Rate: ${selectedTrainer.rate}/hr</div>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1.5rem' }} onSubmit={e => {
              e.preventDefault();
              fetch('http://localhost:8080/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  student: user ? user.name : booking.name,
                  trainer: selectedTrainer.id,
                  status: 'requested',
                  notes: booking.notes,
                  email: user ? user.email : booking.email,
                  phone: booking.phone,
                  age: booking.age,
                })
              }).then(() => {
                setShowModal(false);
                setBooking({ name: '', email: '', phone: '', age: '', notes: '' });
                alert('Booking submitted!');
              });
            }}>
              <input required type="text" placeholder="Name" value={user ? user.name : booking.name} onChange={e => setBooking(b => ({ ...b, name: e.target.value }))} style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: 'none', fontSize: '1rem', background: 'rgba(255,255,255,0.1)', color: '#FFF', backdropFilter: 'blur(10px)' }} />
              <input required type="email" placeholder="Email" value={user ? user.email : booking.email} onChange={e => setBooking(b => ({ ...b, email: e.target.value }))} style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: 'none', fontSize: '1rem', background: 'rgba(255,255,255,0.1)', color: '#FFF', backdropFilter: 'blur(10px)' }} />
              <input required type="tel" placeholder="Phone" value={booking.phone} onChange={e => setBooking(b => ({ ...b, phone: e.target.value }))} style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: 'none', fontSize: '1rem', background: 'rgba(255,255,255,0.1)', color: '#FFF', backdropFilter: 'blur(10px)' }} />
              <input required type="number" placeholder="Age" value={booking.age} onChange={e => setBooking(b => ({ ...b, age: e.target.value }))} style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: 'none', fontSize: '1rem', background: 'rgba(255,255,255,0.1)', color: '#FFF', backdropFilter: 'blur(10px)' }} />
              <textarea placeholder="Notes" value={booking.notes} onChange={e => setBooking(b => ({ ...b, notes: e.target.value }))} style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: 'none', fontSize: '1rem', minHeight: 70, background: 'rgba(255,255,255,0.1)', color: '#FFF', backdropFilter: 'blur(10px)', resize: 'vertical' }} />
              <button type="submit" style={{ background: 'linear-gradient(135deg, #4ECDC4, #44A08D)', color: '#FFF', border: 'none', borderRadius: '12px', padding: '1rem', fontWeight: 700, fontSize: '1.1rem', marginTop: '0.5rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(78,205,196,0.3)', transition: 'all 0.3s ease' }}>Book Session</button>
            </form>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', minWidth: '100vw', minHeight: '100vh', background: 'rgba(24,24,24,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }}>
          <div style={{ background: 'linear-gradient(135deg, #2C2C2C, #1A1A1A)', color: '#FFF', borderRadius: '20px', padding: '2.5rem', minWidth: 340, maxWidth: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.4)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
            <button onClick={() => setShowLoginModal(false)} style={{ position: 'absolute', top: 18, right: 18, background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)', color: '#FFF', border: 'none', borderRadius: '50%', width: 36, height: 36, fontWeight: 700, fontSize: '1.3rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(255,107,107,0.3)' }}>×</button>
            <h3 style={{ margin: '0.5rem 0 1.5rem 0', fontWeight: 700, fontSize: '1.6rem', textAlign: 'center' }}>Login</h3>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '1rem', marginBottom: '0.5rem', display: 'block', color: 'rgba(255,255,255,0.9)' }}>Select your role:</label>
              <select value={roleSelect} onChange={e => setRoleSelect(e.target.value)} style={{ padding: '0.8rem 1rem', borderRadius: '10px', fontSize: '1rem', width: '100%', marginBottom: '1rem', background: 'rgba(255,255,255,0.1)', color: '#FFF', border: 'none', backdropFilter: 'blur(10px)' }}>
                <option value="" style={{ background: '#2C2C2C', color: '#FFF' }}>Choose...</option>
                <option value="student" style={{ background: '#2C2C2C', color: '#FFF' }}>Student</option>
                <option value="trainer" style={{ background: '#2C2C2C', color: '#FFF' }}>Trainer</option>
                <option value="admin" style={{ background: '#2C2C2C', color: '#FFF' }}>Admin</option>
              </select>
            </div>
            <button 
              style={{ 
                background: roleSelect ? 'linear-gradient(135deg, #4ECDC4, #44A08D)' : 'rgba(255,255,255,0.2)', 
                color: '#FFF', 
                border: 'none', 
                borderRadius: '12px', 
                padding: '0.9rem', 
                fontWeight: 700, 
                fontSize: '1.1rem', 
                width: '100%', 
                cursor: roleSelect ? 'pointer' : 'not-allowed', 
                boxShadow: roleSelect ? '0 4px 15px rgba(78,205,196,0.3)' : 'none',
                transition: 'all 0.3s ease'
              }} 
              disabled={!roleSelect}
              onClick={() => { 
                setUser({ name: 'Demo User', email: 'demo@example.com', role: roleSelect }); 
                setShowLoginModal(false); 
                if (selectedTrainer) {
                  setShowModal(true);
                }
              }}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
