import React from 'react';

const TrainerCard = ({ trainer }) => (
  <div style={{ background: '#222', color: '#FFF', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', padding: '1.5rem', margin: '1rem', minWidth: '280px', maxWidth: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <img src={trainer.photo} alt={trainer.name} style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem', border: '3px solid #FFF' }} />
    <h3 style={{ margin: '0.5rem 0', fontWeight: 700 }}>{trainer.name}</h3>
    <p style={{ fontSize: '1rem', margin: '0.5rem 0', textAlign: 'center' }}>{trainer.bio}</p>
    <div style={{ margin: '0.5rem 0', fontSize: '0.95rem', color: '#FFA726' }}>
      {trainer.specialties.join(', ')}
    </div>
    <div style={{ margin: '0.5rem 0', fontSize: '0.95rem' }}>Experience: {trainer.experience} years</div>
    <div style={{ margin: '0.5rem 0', fontSize: '0.95rem' }}>Location: {trainer.location}</div>
    <div style={{ margin: '0.5rem 0', fontSize: '0.95rem' }}>Rate: ${trainer.rate}/hr</div>
    <button style={{ background: '#FFF', color: '#181818', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, marginTop: '1rem' }}>Book Session</button>
  </div>
);

export default TrainerCard;
