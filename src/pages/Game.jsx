import PlayerCard from "../components/PlayerCard";

export default function Game({ players, setPlayers, onReset }) {
  const padding = 16;
  const gap = 16;
  const totalPadding = padding * 2; // top + bottom
  const totalGap = gap * (players.length - 1); // gaps between cards
  const cardHeight = `calc((100vh - ${totalPadding}px - ${totalGap}px) / ${players.length})`;

  const updateScore = (index, delta) => {
    setPlayers(players =>
      players.map((p, i) =>
        i === index ? { ...p, score: p.score + delta } : p
      )
    );
  };

  return (
    <>
      {/* Top-left corner button */}
      <button style={{
        position: 'fixed',
        top: 16,
        left: 16,
        backgroundColor: 'grey',
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Corner
      </button>

      {/* Top-right corner button */}
      <button style={{
        position: 'fixed',
        top: 16,
        right: 16,
        backgroundColor: 'grey',
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Corner
      </button>

      {/* Bottom-left corner button */}
      <button style={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        backgroundColor: 'grey',
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Corner
      </button>

      {/* Bottom-right corner button */}
      <button style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        backgroundColor: 'grey',
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Corner
      </button>

      <div style={{ 
        padding: 16,
        marginLeft: '10vw',
        marginRight: '10vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '80vw',
        boxSizing: 'border-box'
      }}>
        {players.map((player, i) => (
          <PlayerCard
            key={i}
            player={player}
            onChange={delta => updateScore(i, delta)}
            height={cardHeight}
          />
        ))}
      </div>
    </>
  );
}
