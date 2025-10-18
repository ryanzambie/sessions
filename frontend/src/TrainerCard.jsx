import React from 'react';


const TrainerCard = ({ trainer, onBook, small }) => {
  const cardStyle = small
    ? { background: '#222', color: '#FFF', borderRadius: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', padding: '1rem', margin: '0.7rem', minWidth: '180px', maxWidth: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.12s', }
    : { background: '#222', color: '#FFF', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', padding: '1.5rem', margin: '1rem', minWidth: '280px', maxWidth: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center' };
  const imgStyle = small
    ? { width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', marginBottom: '0.7rem', border: '2px solid #FFF' }
    : { width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem', border: '3px solid #FFF' };
  const nameStyle = small
    ? { margin: '0.3rem 0', fontWeight: 700, fontSize: '1.05rem' }
    : { margin: '0.5rem 0', fontWeight: 700 };
  const bioStyle = small
    ? { fontSize: '0.92rem', margin: '0.3rem 0', textAlign: 'center', minHeight: 0, maxHeight: 36, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
    : { fontSize: '1rem', margin: '0.5rem 0', textAlign: 'center' };
  const infoStyle = small
    ? { margin: '0.2rem 0', fontSize: '0.88rem' }
    : { margin: '0.5rem 0', fontSize: '0.95rem' };
  const buttonStyle = small
    ? { background: '#FFF', color: '#181818', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, marginTop: '0.7rem', fontSize: '0.98rem' }
    : { background: '#FFF', color: '#181818', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, marginTop: '1rem' };
  return (
    <div style={cardStyle}>
      <img src={trainer.photo} alt={trainer.name} style={imgStyle} />
      <h3 style={nameStyle}>{trainer.name}</h3>
      <p style={bioStyle}>{trainer.bio}</p>
  <div style={{ ...infoStyle, color: '#FFF' }}>{trainer.specialties.join(', ')}</div>
      <div style={infoStyle}>Experience: {trainer.experience} years</div>
      <div style={infoStyle}>Location: {trainer.location}</div>
      <div style={infoStyle}>Rate: ${trainer.rate}/hr</div>
      <button onClick={onBook} style={buttonStyle}>Book Session</button>
    </div>
  );
};

export default TrainerCard;
