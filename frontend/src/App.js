import React, { useState } from 'react';

const reviews = [
  {
    name: 'John Doe',
    text: 'Great trainer! Improved my game a lot.',
    rating: 5
  },
  {
    name: 'Jane Smith',
    text: 'Very professional and motivating.',
    rating: 4
  }
];

function App() {
  const [search, setSearch] = useState('');

  // Placeholder for future fetch logic
  // useEffect(() => { /* fetch trainers */ }, []);

  return (
    <div style={{ background: '#111', minHeight: '100vh', color: '#fff', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', background: '#ff8500' }}>
        <h1 style={{ margin: 0, color: '#111', fontWeight: 'bold' }}>BasketballBooksy</h1>
        <div>
          <input
            type="text"
            placeholder="Search trainers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: 'none', width: '200px' }}
          />
        </div>
        <div>
          <button style={{ background: '#111', color: '#ff8500', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
            Login / Sign Up
          </button>
        </div>
      </header>
      <main style={{ padding: '2rem' }}>
        <section>
          <h2 style={{ color: '#ff8500' }}>Reviews</h2>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {reviews.map((review, idx) => (
              <div key={idx} style={{ background: '#222', padding: '1rem', borderRadius: '8px', minWidth: '250px', maxWidth: '350px' }}>
                <strong style={{ color: '#ff8500' }}>{review.name}</strong>
                <p style={{ margin: '0.5rem 0' }}>{review.text}</p>
                <span style={{ color: '#ff8500' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
