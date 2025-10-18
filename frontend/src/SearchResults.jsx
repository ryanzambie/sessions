import React, { useState, useEffect } from 'react';
import TrainerCard from './TrainerCard';

function SearchResults({ searchQuery, trainers, onBookClick, user, onBack }) {
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    priceRange: '',
    ageRange: '',
    workoutType: ''
  });

  console.log("SearchResults component rendering");
  console.log("Props received:", { searchQuery, trainers, onBookClick, user, onBack });

  // Initial search results based on the query from homepage
  useEffect(() => {
    console.log("SearchResults useEffect triggered");
    
    if (trainers && trainers.length > 0) {
      if (searchQuery) {
        const initialResults = trainers.filter(trainer => {
          const searchTerm = searchQuery.toLowerCase();
          const matches = (
            (trainer.name && trainer.name.toLowerCase().includes(searchTerm)) ||
            (trainer.bio && trainer.bio.toLowerCase().includes(searchTerm)) ||
            (trainer.specialties && trainer.specialties.toLowerCase().includes(searchTerm)) ||
            (trainer.location && trainer.location.toLowerCase().includes(searchTerm))
          );
          return matches;
        });
        console.log("Initial filtered results:", initialResults);
        setFilteredTrainers(initialResults);
      } else {
        setFilteredTrainers(trainers);
      }
    } else {
      console.log("No trainers available");
      setFilteredTrainers([]);
    }
  }, [searchQuery, trainers]);

  // Apply additional filters
  const applyFilters = () => {
    if (!trainers || trainers.length === 0) return;
    
    let results = trainers.filter(trainer => {
      // Search term match
      let matchesSearch = true;
      if (searchQuery) {
        const searchTerm = searchQuery.toLowerCase();
        matchesSearch = (
          (trainer.name && trainer.name.toLowerCase().includes(searchTerm)) ||
          (trainer.bio && trainer.bio.toLowerCase().includes(searchTerm)) ||
          (trainer.specialties && trainer.specialties.toLowerCase().includes(searchTerm)) ||
          (trainer.location && trainer.location.toLowerCase().includes(searchTerm))
        );
      }

      // Location filter
      const matchesLocation = !filters.location || 
        (trainer.location && trainer.location.toLowerCase().includes(filters.location.toLowerCase()));

      // Price filter
      let matchesPrice = true;
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        matchesPrice = trainer.rate >= min && trainer.rate <= max;
      }

      // Age range filter
      const matchesAgeRange = !filters.ageRange || 
        (trainer.bio && trainer.bio.toLowerCase().includes(filters.ageRange.toLowerCase()));

      // Workout type filter
      const matchesWorkoutType = !filters.workoutType || 
        (trainer.specialties && trainer.specialties.toLowerCase().includes(filters.workoutType.toLowerCase()));

      return matchesSearch && matchesLocation && matchesPrice && matchesAgeRange && matchesWorkoutType;
    });

    setFilteredTrainers(results);
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      priceRange: '',
      ageRange: '',
      workoutType: ''
    });
    // Reset to initial search results
    if (trainers && trainers.length > 0) {
      if (searchQuery) {
        const initialResults = trainers.filter(trainer => {
          const searchTerm = searchQuery.toLowerCase();
          return (
            (trainer.name && trainer.name.toLowerCase().includes(searchTerm)) ||
            (trainer.bio && trainer.bio.toLowerCase().includes(searchTerm)) ||
            (trainer.specialties && trainer.specialties.toLowerCase().includes(searchTerm)) ||
            (trainer.location && trainer.location.toLowerCase().includes(searchTerm))
          );
        });
        setFilteredTrainers(initialResults);
      } else {
        setFilteredTrainers(trainers);
      }
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      minWidth: '100vw',
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)', 
      color: '#FFF', 
      overflow: 'hidden',
      position: 'relative',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '1.5rem 2rem',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(10px)'
      }}>
        <button 
          onClick={onBack}
          style={{ 
            background: 'linear-gradient(135deg, #4ECDC4, #44A08D)', 
            color: '#FFF', 
            border: 'none', 
            padding: '0.8rem 1.5rem', 
            borderRadius: '10px', 
            cursor: 'pointer', 
            fontSize: '1rem', 
            fontWeight: 600, 
            marginRight: '2rem',
            boxShadow: '0 4px 15px rgba(78,205,196,0.3)' 
          }}
        >
          ← Back to Home
        </button>
        <h1 style={{ 
          margin: 0, 
          fontSize: '2rem', 
          fontWeight: 700,
          background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Search Results for "{searchQuery}"
        </h1>
      </div>

      {/* Filters Section */}
      <div style={{ 
        padding: '2rem', 
        background: 'rgba(255,255,255,0.05)', 
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ 
          display: 'flex', 
          gap: '1.5rem', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          {/* Location Filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
              Location
            </label>
            <input
              type="text"
              placeholder="Enter city or area"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              style={{
                padding: '0.8rem 1rem',
                borderRadius: '10px',
                border: 'none',
                background: 'rgba(255,255,255,0.1)',
                color: '#FFF',
                fontSize: '1rem',
                width: '180px',
                backdropFilter: 'blur(10px)'
              }}
            />
          </div>

          {/* Price Range Filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
              Price Range
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
              style={{
                padding: '0.8rem 1rem',
                borderRadius: '10px',
                border: 'none',
                background: 'rgba(255,255,255,0.1)',
                color: '#FFF',
                fontSize: '1rem',
                width: '150px',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer'
              }}
            >
              <option value="" style={{ background: '#2C2C2C' }}>Any Price</option>
              <option value="0-25" style={{ background: '#2C2C2C' }}>$0 - $25</option>
              <option value="25-50" style={{ background: '#2C2C2C' }}>$25 - $50</option>
              <option value="50-75" style={{ background: '#2C2C2C' }}>$50 - $75</option>
              <option value="75-100" style={{ background: '#2C2C2C' }}>$75 - $100</option>
              <option value="100-125" style={{ background: '#2C2C2C' }}>$100 - $125</option>
              <option value="125-150" style={{ background: '#2C2C2C' }}>$125 - $150</option>
              <option value="150-175" style={{ background: '#2C2C2C' }}>$150 - $175</option>
              <option value="175-200" style={{ background: '#2C2C2C' }}>$175 - $200</option>
            </select>
          </div>

          {/* Age Range Filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
              Age Group
            </label>
            <select
              value={filters.ageRange}
              onChange={(e) => setFilters({ ...filters, ageRange: e.target.value })}
              style={{
                padding: '0.8rem 1rem',
                borderRadius: '10px',
                border: 'none',
                background: 'rgba(255,255,255,0.1)',
                color: '#FFF',
                fontSize: '1rem',
                width: '150px',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer'
              }}
            >
              <option value="" style={{ background: '#2C2C2C' }}>Any Age</option>
              <option value="youth" style={{ background: '#2C2C2C' }}>Youth (6-12)</option>
              <option value="teen" style={{ background: '#2C2C2C' }}>Teen (13-17)</option>
              <option value="adult" style={{ background: '#2C2C2C' }}>Adult (18+)</option>
              <option value="senior" style={{ background: '#2C2C2C' }}>Senior (50+)</option>
            </select>
          </div>

          {/* Workout Type Filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
              Workout Type
            </label>
            <select
              value={filters.workoutType}
              onChange={(e) => setFilters({ ...filters, workoutType: e.target.value })}
              style={{
                padding: '0.8rem 1rem',
                borderRadius: '10px',
                border: 'none',
                background: 'rgba(255,255,255,0.1)',
                color: '#FFF',
                fontSize: '1rem',
                width: '180px',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer'
              }}
            >
              <option value="" style={{ background: '#2C2C2C' }}>Any Type</option>
              <option value="shooting" style={{ background: '#2C2C2C' }}>Shooting</option>
              <option value="skills" style={{ background: '#2C2C2C' }}>Skills</option>
              <option value="all around" style={{ background: '#2C2C2C' }}>All Around</option>
              <option value="live play" style={{ background: '#2C2C2C' }}>Live Play</option>
              <option value="strength and conditioning" style={{ background: '#2C2C2C' }}>Strength & Conditioning</option>
            </select>
          </div>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={applyFilters}
            style={{
              background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
              color: '#FFF',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 600,
              boxShadow: '0 4px 15px rgba(255,107,107,0.3)'
            }}
          >
            Show Results
          </button>
          <button
            onClick={clearFilters}
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#FFF',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '1rem 2rem',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 600,
              backdropFilter: 'blur(10px)'
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results */}
      <div style={{ 
        padding: '2rem',
        height: 'calc(100vh - 300px)',
        overflow: 'auto',
        position: 'relative',
        zIndex: 5
      }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 600, 
          color: 'rgba(255,255,255,0.9)',
          marginBottom: '2rem'
        }}>
          {filteredTrainers.length} trainer{filteredTrainers.length !== 1 ? 's' : ''} found
        </h2>

        <div style={{ 
          display: 'flex', 
          gap: '1.5rem', 
          flexWrap: 'wrap', 
          justifyContent: 'center' 
        }}>
          {filteredTrainers.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              color: 'rgba(255,255,255,0.7)', 
              fontSize: '1.2rem',
              padding: '3rem'
            }}>
              No trainers match your search criteria. Try adjusting your filters.
            </div>
          ) : (
            filteredTrainers.map((trainer, idx) => {
              try {
                return (
                  <div 
                    key={trainer.id || idx}
                    style={{
                      background: 'linear-gradient(135deg, #2C2C2C, #1A1A1A)',
                      color: '#FFF',
                      borderRadius: '15px',
                      padding: '1.5rem',
                      margin: '0.5rem',
                      minWidth: '280px',
                      maxWidth: '320px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <img 
                      src={trainer.photo} 
                      alt={trainer.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        marginBottom: '1rem',
                        border: '3px solid #4ECDC4'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <h3 style={{
                      margin: '0.5rem 0',
                      fontWeight: 700,
                      fontSize: '1.3rem',
                      textAlign: 'center'
                    }}>
                      {trainer.name}
                    </h3>
                    <div style={{
                      fontSize: '1rem',
                      marginBottom: '0.5rem',
                      color: '#4ECDC4',
                      fontWeight: 500,
                      textAlign: 'center'
                    }}>
                      {trainer.specialties}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      marginBottom: '0.5rem',
                      color: 'rgba(255,255,255,0.8)',
                      textAlign: 'center',
                      lineHeight: 1.4
                    }}>
                      {trainer.bio && trainer.bio.length > 100 ? 
                        trainer.bio.substring(0, 100) + '...' : 
                        trainer.bio
                      }
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      marginBottom: '0.5rem',
                      color: 'rgba(255,255,255,0.8)'
                    }}>
                      📍 {trainer.location}
                    </div>
                    <div style={{
                      fontSize: '1.1rem',
                      marginBottom: '1rem',
                      color: '#4ECDC4',
                      fontWeight: 600
                    }}>
                      ${trainer.rate}/hr
                    </div>
                    <button
                      onClick={() => onBookClick(trainer)}
                      style={{
                        background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                        color: '#FFF',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '0.8rem 1.5rem',
                        fontWeight: 600,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(78,205,196,0.3)',
                        transition: 'all 0.3s ease',
                        width: '100%'
                      }}
                    >
                      Book Session
                    </button>
                  </div>
                );
              } catch (error) {
                console.error('Error rendering trainer card:', error);
                return (
                  <div key={trainer.id || idx} style={{
                    background: '#ff4444',
                    color: '#FFF',
                    padding: '1rem',
                    borderRadius: '10px'
                  }}>
                    Error loading trainer: {trainer.name}
                  </div>
                );
              }
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;