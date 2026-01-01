import { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { motion } from 'framer-motion';

const PlayerCard = forwardRef(({ player, onChange, height, onEditPlayer }, ref) => {
  const holdTimeoutRef = useRef(null);
  const repeatIntervalRef = useRef(null);
  const hasChangedRef = useRef(false);
  const currentSpeedRef = useRef(100);
  const [tempScore, setTempScore] = useState(0);

  const repeatWithAcceleration = (value) => {
    setTempScore(prev => prev + value);
    
    // Gradually decrease speed from 100ms to 20ms
    currentSpeedRef.current = Math.max(20, currentSpeedRef.current - 2);
    
    repeatIntervalRef.current = setTimeout(() => {
      repeatWithAcceleration(value);
    }, currentSpeedRef.current);
  };

  const handleMouseDown = (e, value) => {
    e.preventDefault();
    console.log('Mouse down', value);
    hasChangedRef.current = false;
    currentSpeedRef.current = 100;
    
    // Set timeout for 0.6 seconds before starting repeat
    holdTimeoutRef.current = setTimeout(() => {
      console.log('Hold timeout triggered');
      hasChangedRef.current = true;
      repeatWithAcceleration(value);
    }, 600);
  };

  const handleMouseUp = (e, value) => {
    e.preventDefault();
    console.log('Mouse up', value, 'hasChanged:', hasChangedRef.current);
    // Clear timeout and interval
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    if (repeatIntervalRef.current) {
      clearTimeout(repeatIntervalRef.current);
      repeatIntervalRef.current = null;
    }
    
    // If we didn't enter fast mode, it's a single press
    if (!hasChangedRef.current) {
      console.log('Single press detected');
      setTempScore(prev => prev + value);
    }
  };

  const handleMouseLeave = () => {
    console.log('Mouse leave');
    // Clear everything when mouse leaves button
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    if (repeatIntervalRef.current) {
      clearTimeout(repeatIntervalRef.current);
      repeatIntervalRef.current = null;
    }
  };

  const handleSubmit = () => {
    onChange(tempScore);
    setTempScore(0);
  };

  const handleReset = () => {
    setTempScore(0);
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
    reset: handleReset,
    getTempScore: () => tempScore
  }));

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
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="player-card-container"
        style={{ 
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
      <div style={{ width: '33.33%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <h2 
          onClick={onEditPlayer}
          style={{ 
            cursor: 'pointer',
            fontWeight: 'bold',
            color: 'black',
            margin: 0,
            paddingLeft: 8,
            fontSize: 40
          }}
        >
          {player.name}
        </h2>
      </div>

      <div style={{ width: '33.33%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, minHeight: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
          <h1 style={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: 40,
            margin: 0,
            lineHeight: 1
          }}>
            {player.score}
          </h1>
        </div>
        <div style={{ flex: 1, minHeight: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <h2 style={{
            fontWeight: 'bold',
            color: tempScore >= 0 ? 'green' : 'red',
            margin: 0,
            lineHeight: 1,
            textShadow: '1px 1px 2px white, -1px -1px 2px white, 1px -1px 2px white, -1px 1px 2px white'
          }}>
            {tempScore >= 0 ? '+' : ''}{tempScore}
          </h2>
        </div>
      </div>

      <div style={{ width: '33.33%', height: '100%', display: "flex" }}>
        <button 
          className="player-card-button" 
          style={{ flex: 1, fontSize: 24, backgroundColor: 'transparent', border: '2px solid black', color: 'black', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
          onMouseDown={(e) => handleMouseDown(e, -1)}
          onMouseUp={(e) => handleMouseUp(e, -1)}
          onTouchStart={(e) => handleMouseDown(e, -1)}
          onTouchEnd={(e) => handleMouseUp(e, -1)}
          onMouseLeave={handleMouseLeave}
          onContextMenu={(e) => e.preventDefault()}
        >
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ pointerEvents: 'none' }}>
            <path d="M3 12H21" stroke="black" strokeWidth="6" strokeLinecap="round"/>
          </svg>
        </button>
        <button 
          className="player-card-button" 
          style={{ flex: 1, fontSize: 24, backgroundColor: 'transparent', border: '2px solid black', color: 'black', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
          onMouseDown={(e) => handleMouseDown(e, 1)}
          onMouseUp={(e) => handleMouseUp(e, 1)}
          onTouchStart={(e) => handleMouseDown(e, 1)}
          onTouchEnd={(e) => handleMouseUp(e, 1)}
          onMouseLeave={handleMouseLeave}
          onContextMenu={(e) => e.preventDefault()}
        >
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ pointerEvents: 'none' }}>
            <path d="M12 3V21M3 12H21" stroke="black" strokeWidth="6" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </motion.div>
    </>
  );
});

export default PlayerCard;
