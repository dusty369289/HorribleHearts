export default function PlayerCard({ player, onChange, height, onEditPlayer }) {
  return (
    <>
      <style>{`
        .player-card-button {
          outline: none;
          transition: background-color 0.1s ease;
          cursor: pointer;
        }
        .player-card-button:active {
          background-color: rgba(0, 0, 0, 0.2) !important;
        }
      `}</style>
      <div style={{ 
      border: "none", 
      padding: 4,
      borderRadius: 12,
      width: '100%',
      height: height,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: player.color || '#f0f0f0',
      boxShadow: `0 0 10px rgba(0,0,0,0.3), 0 0 8px ${player.color || '#f0f0f0'}`
    }}>
      <div style={{ outline: '2px solid red', flex: 1, height: '100%' }}>
        <h2 
          onClick={onEditPlayer}
          style={{ 
            cursor: 'pointer',
            fontWeight: 'bold',
            color: 'black'
          }}
        >
          {player.name}
        </h2>
      </div>

      <div style={{ outline: '2px solid blue', flex: 1, height: '100%' }}>
        <h1 style={{
          fontWeight: 'bold',
          color: 'black'
        }}>
          {player.score}
        </h1>
      </div>

      <div style={{ outline: '2px solid green', flex: 1, height: '100%', display: "flex" }}>
        <button className="player-card-button" style={{ flex: 1, fontSize: 24, backgroundColor: 'transparent', border: '2px solid black', color: 'black', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => onChange(-1)}>
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="black" strokeWidth="6" strokeLinecap="round"/>
          </svg>
        </button>
        <button className="player-card-button" style={{ flex: 1, fontSize: 24, backgroundColor: 'transparent', border: '2px solid black', color: 'black', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => onChange(1)}>
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3V21M3 12H21" stroke="black" strokeWidth="6" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
    </>
  );
}
