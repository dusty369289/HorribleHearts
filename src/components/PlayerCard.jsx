export default function PlayerCard({ player, onChange, height }) {
  return (
    <div style={{ 
      border: "1px solid #ddd", 
      padding: 16, 
      borderRadius: 12,
      width: '100%',
      height: height,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 24
    }}>
      <h2>{player.name}</h2>
      <h1>{player.score}</h1>

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={() => onChange(-1)}>-</button>
        <button onClick={() => onChange(1)}>+</button>
      </div>
    </div>
  );
}
