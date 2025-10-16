
import React, { useState, useEffect } from 'react';
import TrainerCard from './TrainerCard';

function App() {
  const [search, setSearch] = useState('');
  const [activeSearch, setActiveSearch] = useState(null); // 'trainers', 'locations', 'workout'
  const [location, setLocation] = useState('');



const trainers = [
  {
    name: 'Alex Johnson',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Former college point guard. Specializes in ball handling and shooting drills.',
    specialties: ['Shooting', 'Ball Handling', 'Defense'],
    experience: 8,
    location: 'Brooklyn, NY',
    rate: 60,
  },
  {
    name: 'Maria Lee',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Certified youth coach. Focused on fundamentals and motivation.',
    specialties: ['Motivation', 'Fundamentals', 'Teamwork'],
    experience: 5,
    location: 'Chicago, IL',
    rate: 50,
  },
  {
    name: 'Chris Evans',
    photo: 'https://randomuser.me/api/portraits/men/65.jpg',
    bio: 'Pro-level trainer with experience in vertical jump and agility.',
    specialties: ['Vertical Jump', 'Agility', 'Strength'],
    experience: 10,
    location: 'Los Angeles, CA',
    rate: 75,
  },
  {
    name: 'Carlos Silva',
    photo: 'https://randomuser.me/api/portraits/men/83.jpg',
    bio: 'Brazilian national team coach. Specializes in footwork and shooting.',
    specialties: ['Footwork', 'Shooting'],
    experience: 12,
    location: 'Rio de Janeiro, Brazil',
    rate: 80,
  },
  {
    name: 'Emily Carter',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    bio: 'Texas high school coach. Focused on youth development.',
    specialties: ['Youth', 'Development'],
    experience: 7,
    location: 'Austin, TX',
    rate: 55,
  },
  {
    name: 'Peter Kovacs',
    photo: 'https://randomuser.me/api/portraits/men/22.jpg',
    bio: 'Hungarian pro trainer. Specializes in European style play.',
    specialties: ['European Style', 'Passing'],
    experience: 9,
    location: 'Budapest, Hungary',
    rate: 70,
  },
  {
    name: 'Samantha Green',
    photo: 'https://randomuser.me/api/portraits/women/12.jpg',
    bio: 'NYC shooting coach. Focused on advanced shooting mechanics.',
    specialties: ['Shooting', 'Mechanics'],
    experience: 6,
    location: 'New York, NY',
    rate: 65,
  },
];

const reviews = [
  {
    name: 'John Doe',
    text: 'Sessions helped me find the perfect trainer and take my game to the next level!',
    rating: 5,
  },
  {
    name: 'Jane Smith',
    text: 'I found a great coach through this app. My skills and confidence have improved so much.',
    rating: 4,
  },
  {
    name: 'Michael Brown',
    text: 'Great trainers and easy booking. Highly recommend for anyone serious about basketball.',
    rating: 5,
  },
  {
    name: 'Lisa Turner',
    text: 'The app is super intuitive and the coaches are top notch!',
    rating: 5,
  },
  {
    name: 'Kevin Lee',
    text: 'I improved my shooting thanks to the personalized sessions.',
    rating: 4,
  },
];


  // Typewriter animation for the slogan
  const phrase = 'Book your next session';
  const [typed, setTyped] = useState('');
  useEffect(() => {
    let idx = 0;
    let intervalId = null;
    let pauseTimeout = null;
    const type = () => {
      intervalId = setInterval(() => {
        if (idx < phrase.length) {
          setTyped(phrase.slice(0, idx + 1));
          idx++;
        } else {
          clearInterval(intervalId);
          pauseTimeout = setTimeout(() => {
            idx = 0;
            setTyped('');
            type();
          }, 1200);
        }
      }, 90);
    };
    type();
    return () => {
      clearInterval(intervalId);
      clearTimeout(pauseTimeout);
    };
  }, [phrase]);

  // Home page with three options
  if (!activeSearch) {
    return (
      <div style={{ position: 'relative', minHeight: '100vh', minWidth: '100vw', width: '100vw', height: '100vh', color: '#FFF', fontFamily: 'Montserrat, Inter, Arial, sans-serif', overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Overlay for readability - covers entire scrollable page */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100%', zIndex: 1, background: 'linear-gradient(180deg, rgba(24,24,24,0.45) 0%, rgba(24,24,24,0.25) 60%, rgba(24,24,24,0.55) 100%)', pointerEvents: 'none', backdropFilter: 'blur(2px)' }}></div>
        {/* Background Video */}
        <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100%', objectFit: 'cover', zIndex: 0 }}>
          <source src="/basketball.mp4" type="video/mp4" />
        </video>
        <header style={{ display: 'flex', alignItems: 'center', height: '72px', background: 'transparent', padding: '0 2.5rem', justifyContent: 'space-between', boxShadow: 'none', zIndex: 3, position: 'relative', textShadow: '0 2px 12px #181818, 0 0 8px #000' }}>
          <h1 style={{ margin: 0, color: '#FFF', fontWeight: 700, fontSize: '2.2rem', fontFamily: 'Bebas Neue, Montserrat, Inter, Arial, sans-serif', letterSpacing: '2px', textTransform: 'uppercase' }}>Sessions</h1>
          <button style={{ background: '#FFF', color: '#181818', border: 'none', padding: '0.85rem 1.7rem', borderRadius: '10px', cursor: 'pointer', fontSize: '1.08rem', fontWeight: 600, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', transition: 'background 0.2s', marginLeft: '2rem' }}>Login</button>
        </header>
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '100vh', zIndex: 2, position: 'relative', paddingTop: '18vh' }}>
          <h2 style={{ color: '#FFF', fontWeight: 700, fontSize: '2rem', marginBottom: '2rem', fontFamily: 'inherit', letterSpacing: '1px', zIndex: 3, position: 'relative', textShadow: '0 2px 12px #181818, 0 0 8px #000, 0 0 18px #000' }}>{typed}<span style={{ borderRight: '2px solid #FFF', marginLeft: '2px', animation: 'blink 1s steps(1) infinite' }}></span></h2>
          <style>{`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
          <div style={{ display: 'flex', gap: '2.5rem', marginBottom: '1.2rem', zIndex: 2, position: 'relative', background: 'transparent', borderRadius: '22px', padding: '1.2rem 2rem', textShadow: '0 2px 12px #181818, 0 0 8px #000' }}>
            <button onClick={() => setActiveSearch('trainers')} style={{ background: 'linear-gradient(135deg, #222 70%, #FFA726 100%)', color: '#FFF', border: '1px solid #FFA726', padding: '2rem 2.5rem', borderRadius: '14px', fontWeight: 700, fontSize: '1.15rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.13)', zIndex: 3, textShadow: '0 2px 8px #181818' }}>Search Trainers</button>
            <button onClick={() => setActiveSearch('locations')} style={{ background: 'linear-gradient(135deg, #222 70%, #FFA726 100%)', color: '#FFF', border: '1px solid #FFA726', padding: '2rem 2.5rem', borderRadius: '14px', fontWeight: 700, fontSize: '1.15rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.13)', zIndex: 3, textShadow: '0 2px 8px #181818' }}>Search by Location</button>
            <button onClick={() => setActiveSearch('workout')} style={{ background: 'linear-gradient(135deg, #222 70%, #FFA726 100%)', color: '#FFF', border: '1px solid #FFA726', padding: '2rem 2.5rem', borderRadius: '14px', fontWeight: 700, fontSize: '1.15rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.13)', zIndex: 3, textShadow: '0 2px 8px #181818' }}>Search by Workout</button>
          </div>
          {/* Verified Trainers Section - horizontal layout, full screen width */}
          <section style={{ width: '100vw', minHeight: '100vh', marginTop: '65vh', marginBottom: '0', position: 'relative', zIndex: 3, padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textShadow: '0 2px 12px #181818, 0 0 8px #000', background: 'none' }}>
            <h2 style={{ color: '#FFA726', fontWeight: 700, fontSize: '2rem', marginBottom: '2.2rem', letterSpacing: '1px', textAlign: 'center' }}>Connect with verified trainers across the globe</h2>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '2.5rem', width: '100%', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
              {trainers.slice(0, 5).map((trainer, idx) => (
                <div key={idx} style={{ background: 'linear-gradient(135deg, #222 70%, #FFA726 100%)', color: '#FFF', borderRadius: '10px', padding: '1.2rem 2.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.13)', minWidth: 220, maxWidth: 340, textAlign: 'center', fontSize: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #FFA726', position: 'relative' }}>
                  <img src={trainer.photo} alt={trainer.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', marginBottom: '0.7rem', border: '2px solid #FFA726' }} />
                  <div style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.18rem', color: '#FFA726', letterSpacing: '0.5px' }}>{trainer.name}</div>
                  <div style={{ fontSize: '0.95rem', marginBottom: '0.25rem', color: '#FFF', fontStyle: 'italic', lineHeight: 1.2 }}>{trainer.location}</div>
                  <div style={{ position: 'absolute', top: '12px', right: '18px', background: '#FFA726', color: '#222', fontWeight: 700, fontSize: '0.8rem', borderRadius: '6px', padding: '3px 10px', boxShadow: '0 1px 4px rgba(0,0,0,0.10)' }}>Verified</div>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews Section - horizontal layout under trainers */}
          <section style={{ width: '100%', marginTop: '0.5rem', marginBottom: '2.7rem', position: 'relative', zIndex: 3, paddingLeft: '8vw', textShadow: '0 2px 12px #181818, 0 0 8px #000' }}>
            <h3 style={{ color: '#FFA726', fontWeight: 700, fontSize: '1.15rem', marginBottom: '1.1rem', letterSpacing: '1px' }}>User Reviews</h3>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '2.5rem', background: 'none', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              {reviews.map((review, idx) => (
                <div key={idx} style={{ background: 'linear-gradient(135deg, #222 70%, #FFA726 100%)', color: '#FFF', borderRadius: '10px', padding: '0.45rem 0.6rem', boxShadow: '0 2px 8px rgba(0,0,0,0.13)', minWidth: 100, maxWidth: 130, textAlign: 'left', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', border: '1px solid #FFA726' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.15rem', color: '#FFA726', letterSpacing: '0.5px' }}>{review.name}</div>
                  <div style={{ fontSize: '0.78rem', marginBottom: '0.2rem', color: '#FFF', fontStyle: 'italic', lineHeight: 1.2 }}>{review.text}</div>
                  <div style={{ color: '#FFA726', fontSize: '0.85rem', marginTop: '0.08rem', letterSpacing: '1px' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  // Location search page
  if (activeSearch === 'locations') {
    return (
      <div style={{ minHeight: '100vh', minWidth: '100vw', width: '100vw', height: '100vh', background: '#181818', color: '#FFF', fontFamily: 'Montserrat, Inter, Arial, sans-serif', overflow: 'hidden' }}>
        <header style={{ display: 'flex', alignItems: 'center', height: '72px', background: '#181818', padding: '0 2.5rem', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h1 style={{ margin: 0, color: '#FFF', fontWeight: 700, fontSize: '2.2rem', fontFamily: 'Bebas Neue, Montserrat, Inter, Arial, sans-serif', letterSpacing: '2px', textTransform: 'uppercase' }}>Sessions</h1>
          <button style={{ background: '#FFF', color: '#181818', border: 'none', padding: '0.85rem 1.7rem', borderRadius: '10px', cursor: 'pointer', fontSize: '1.08rem', fontWeight: 600, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', transition: 'background 0.2s', marginLeft: '2rem' }}>Login</button>
        </header>
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
          <button onClick={() => setActiveSearch(null)} style={{ background: '#222', color: '#FFA726', border: 'none', padding: '0.7rem 1.5rem', borderRadius: '8px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', marginBottom: '2rem' }}>← Back</button>
          <input type="text" placeholder="Enter a city or location" value={location} onChange={(e) => setLocation(e.target.value)} style={{ padding: '1rem', borderRadius: '12px', border: '1.5px solid #FFA726', width: '320px', fontSize: '1.15rem', textAlign: 'center', background: '#FFF', color: '#181818', marginBottom: '1.5rem' }} />
          <button style={{ background: '#FFA726', color: '#181818', border: 'none', padding: '0.7rem 1.5rem', borderRadius: '8px', fontWeight: 600, fontSize: '1.05rem', cursor: 'pointer', marginBottom: '2rem' }} disabled={!location.trim()}>Find Trainers</button>
          {/* You can add location-based trainer results here */}
        </main>
      </div>
    );
  }

  // Trainers search page
  if (activeSearch === 'trainers') {
    return (
      <div style={{ minHeight: '100vh', minWidth: '100vw', width: '100vw', height: '100vh', background: '#181818', color: '#FFF', fontFamily: 'Montserrat, Inter, Arial, sans-serif', overflow: 'hidden' }}>
        <header style={{ display: 'flex', alignItems: 'center', height: '72px', background: '#181818', padding: '0 2.5rem', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h1 style={{ margin: 0, color: '#FFF', fontWeight: 700, fontSize: '2.2rem', fontFamily: 'Bebas Neue, Montserrat, Inter, Arial, sans-serif', letterSpacing: '2px', textTransform: 'uppercase' }}>Sessions</h1>
          <button style={{ background: '#FFF', color: '#181818', border: 'none', padding: '0.85rem 1.7rem', borderRadius: '10px', cursor: 'pointer', fontSize: '1.08rem', fontWeight: 600, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', transition: 'background 0.2s', marginLeft: '2rem' }}>Login</button>
        </header>
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
          <button onClick={() => setActiveSearch(null)} style={{ background: '#222', color: '#FFA726', border: 'none', padding: '0.7rem 1.5rem', borderRadius: '8px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', marginBottom: '2rem' }}>← Back</button>
          <h2 style={{ color: '#FFA726', fontWeight: 700, fontSize: '1.5rem', marginBottom: '2rem' }}>Trainer Profiles</h2>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {trainers.slice(0, 3).map((trainer, idx) => (
              <TrainerCard key={idx} trainer={trainer} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Workout search page
  if (activeSearch === 'workout') {
    return (
      <div style={{ minHeight: '100vh', minWidth: '100vw', width: '100vw', height: '100vh', background: '#181818', color: '#FFF', fontFamily: 'Montserrat, Inter, Arial, sans-serif', overflow: 'hidden' }}>
        <header style={{ display: 'flex', alignItems: 'center', height: '72px', background: '#181818', padding: '0 2.5rem', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h1 style={{ margin: 0, color: '#FFF', fontWeight: 700, fontSize: '2.2rem', fontFamily: 'Bebas Neue, Montserrat, Inter, Arial, sans-serif', letterSpacing: '2px', textTransform: 'uppercase' }}>Sessions</h1>
          <button style={{ background: '#FFF', color: '#181818', border: 'none', padding: '0.85rem 1.7rem', borderRadius: '10px', cursor: 'pointer', fontSize: '1.08rem', fontWeight: 600, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', transition: 'background 0.2s', marginLeft: '2rem' }}>Login</button>
        </header>
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
          <button onClick={() => setActiveSearch(null)} style={{ background: '#222', color: '#FFA726', border: 'none', padding: '0.7rem 1.5rem', borderRadius: '8px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', marginBottom: '2rem' }}>← Back</button>
          <input type="text" placeholder="Enter workout type" value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: '1rem', borderRadius: '12px', border: '1px solid #FFA726', width: '320px', fontSize: '1.15rem', textAlign: 'center', background: '#FFF', color: '#181818', marginBottom: '1.5rem' }} />
          <button style={{ background: '#FFA726', color: '#181818', border: 'none', padding: '0.7rem 1.5rem', borderRadius: '8px', fontWeight: 600, fontSize: '1.05rem', cursor: 'pointer', marginBottom: '2rem' }} disabled={!search.trim()}>Find Trainers</button>
          {/* You can add workout-based trainer results here */}
        </main>
      </div>
    );
  }

  return null;
}

export default App;

