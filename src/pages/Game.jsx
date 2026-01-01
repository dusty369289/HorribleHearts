import PlayerCard from "../components/PlayerCard";
import { useRef, useState } from 'react';
import AddUserIcon from '../assets/AddUser.svg';
import ResetIcon from '../assets/Reset.svg';
import CheckIcon from '../assets/Check.svg';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Game({ players, setPlayers, onReset, onAddPlayer, onEditPlayer }) {
  const padding = 16;
  const gap = 16;
  const minCardHeight = 75; // Minimum height in pixels for each card
  const maxCardHeight = 200; // Maximum height in pixels for each card
  const totalPadding = padding * 2; // top + bottom
  const totalGap = gap * (players.length - 1); // gaps between cards
  
  // Calculate card height with min and max constraints
  const availableHeight = window.innerHeight - totalPadding - totalGap;
  const calculatedCardHeight = availableHeight / players.length;
  const useMinHeight = calculatedCardHeight < minCardHeight;
  const useMaxHeight = calculatedCardHeight > maxCardHeight;
  
  let cardHeight;
  if (useMinHeight) {
    cardHeight = `${minCardHeight}px`;
  } else if (useMaxHeight) {
    cardHeight = `${maxCardHeight}px`;
  } else {
    cardHeight = `calc((100vh - ${totalPadding}px - ${totalGap}px) / ${players.length})`;
  }
  
  const playerCardRefs = useRef([]);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showSumWarning, setShowSumWarning] = useState(false);
  const [calculatedSum, setCalculatedSum] = useState(0);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [roundSum, setRoundSum] = useLocalStorage('RoundSum', 124);
  const [tempRoundSum, setTempRoundSum] = useState(0);
  const [sumCheckEnabled, setSumCheckEnabled] = useLocalStorage('SumCheckEnabled', true);

  const updateScore = (index, delta) => {
    setPlayers(players =>
      players.map((p, i) =>
        i === index ? { ...p, score: p.score + delta } : p
      )
    );
  };

  const handleSubmitAll = () => {
    // Calculate the sum of all temp scores
    const tempScoresSum = playerCardRefs.current.reduce((sum, ref) => {
      if (ref && ref.getTempScore) {
        return sum + ref.getTempScore();
      }
      return sum;
    }, 0);

    // Check if sum matches the expected roundSum (only if enabled)
    if (sumCheckEnabled && tempScoresSum !== roundSum) {
      setCalculatedSum(tempScoresSum);
      setShowSumWarning(true);
      return;
    }

    // If sum matches or check is disabled, submit directly
    submitScores();
  };

  const submitScores = () => {
    playerCardRefs.current.forEach(ref => {
      if (ref) {
        ref.submit();
      }
    });
    
    // Sort players by score after a brief delay to ensure scores are updated
    setTimeout(() => {
      sortPlayers();
    }, 50);
    
    setShowSumWarning(false);
  };

  const sortPlayers = () => {
    setPlayers(players => {
      const sorted = [...players].sort((a, b) => {
        return sortOrder === 'asc' ? a.score - b.score : b.score - a.score;
      });
      return sorted;
    });
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    // Sort immediately after changing order
    setTimeout(() => {
      setPlayers(players => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc'; // Use the new order
        const sorted = [...players].sort((a, b) => {
          return newOrder === 'asc' ? a.score - b.score : b.score - a.score;
        });
        return sorted;
      });
    }, 0);
  };

  const handleResetAll = () => {
    // Reset all player scores
    setPlayers(players =>
      players.map(p => ({ ...p, score: 0 }))
    );
    // Reset all temp scores
    playerCardRefs.current.forEach(ref => {
      if (ref) {
        ref.reset();
      }
    });
    // Save the round sum to localStorage
    setRoundSum(tempRoundSum);
    setShowResetConfirm(false);
  };

  return (
    <>
      {/* Left margin div - 10vw */}
      <div style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: '10vw',
        pointerEvents: 'none'
      }}>
        {/* Top-left corner button */}
        <button 
          onClick={onAddPlayer}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 'calc(50% - 8px)',
            backgroundColor: 'grey',
            color: 'white',
            padding: '8px',
            border: 'none',
            borderRadius: 0,
            cursor: 'pointer',
            fontSize: '11px',
            lineHeight: '1.2',
            wordWrap: 'break-word',
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img src={AddUserIcon} alt="Add Player" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </button>

        {/* Bottom-left corner button */}
        <button 
          onClick={() => {
            setTempRoundSum(roundSum);
            setShowResetConfirm(true);
          }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 'calc(50% - 8px)',
            backgroundColor: 'grey',
            color: 'white',
            padding: '8px',
            border: 'none',
            borderRadius: 0,
            cursor: 'pointer',
            fontSize: '11px',
            lineHeight: '1.2',
            wordWrap: 'break-word',
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img src={ResetIcon} alt="Reset" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </button>
      </div>

      {/* Right margin div - 10vw */}
      <div style={{
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        width: '10vw',
        pointerEvents: 'none'
      }}>
        {/* Top-right corner button */}
        <button 
          onClick={toggleSortOrder}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: 'calc(50% - 8px)',
            backgroundColor: 'grey',
            color: 'white',
            padding: '8px',
            border: 'none',
            borderRadius: 0,
            cursor: 'pointer',
            fontSize: '11px',
            lineHeight: '1.2',
            wordWrap: 'break-word',
            pointerEvents: 'auto'
          }}
        >
          Sort: {sortOrder === 'asc' ? 'Low→High' : 'High→Low'}
        </button>

        {/* Bottom-right corner button */}
        <button 
          onClick={handleSubmitAll}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '100%',
            height: 'calc(50% - 8px)',
            backgroundColor: 'grey',
            color: 'white',
            padding: '8px',
            border: 'none',
            borderRadius: 0,
            cursor: 'pointer',
            fontSize: '11px',
            lineHeight: '1.2',
            wordWrap: 'break-word',
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img src={CheckIcon} alt="Submit All" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
          zIndex: 1000
        }}>
          {/* Expected Sum Section with Label */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '30px'
          }}>
            <input
              type="number"
              value={tempRoundSum}
              onChange={(e) => setTempRoundSum(Number(e.target.value))}
              disabled={!sumCheckEnabled}
              style={{
                width: '12vw',
                height: '60px',
                fontSize: '32px',
                textAlign: 'center',
                borderRadius: '10px',
                border: '4px solid white',
                backgroundColor: sumCheckEnabled ? 'white' : '#cccccc',
                color: sumCheckEnabled ? 'black' : '#666666',
                cursor: sumCheckEnabled ? 'text' : 'not-allowed'
              }}
              placeholder="Round Sum"
            />
            {/* Sum Check Toggle */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: '10px 20px',
              borderRadius: '10px',
              border: '2px solid white'
            }}>
              <label style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                whiteSpace: 'nowrap'
              }}>
                Enable Sum Check
              </label>
              <input
                type="checkbox"
                checked={sumCheckEnabled}
                onChange={(e) => setSumCheckEnabled(e.target.checked)}
                style={{
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '40px' }}>
          {/* Cross button */}
          <button
            onClick={() => setShowResetConfirm(false)}
            style={{
              width: '200px',
              height: '200px',
              backgroundColor: 'red',
              border: '4px solid white',
              borderRadius: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="80%" height="80%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </button>
          
          {/* Tick button */}
          <button
            onClick={handleResetAll}
            style={{
              width: '200px',
              height: '200px',
              backgroundColor: 'green',
              border: '4px solid white',
              borderRadius: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="80%" height="80%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          </div>
        </div>
      )}

      {/* Sum Mismatch Warning Modal */}
      {showSumWarning && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '3vh',
          zIndex: 1000
        }}>
          {/* Warning Message */}
          <div style={{
            backgroundColor: 'white',
            padding: '2vw',
            borderRadius: '20px',
            border: '4px solid orange',
            textAlign: 'center'
          }}>
            <h2 style={{ margin: '0 0 10px 0', color: 'red' }}>Warning!</h2>
            <p style={{ margin: '0', fontSize: '20px', color: 'black' }}>
              Sum: <strong>{calculatedSum}</strong>
            </p>
            <p style={{ margin: '0', fontSize: '20px', color: 'black' }}>
              Expected sum: <strong>{roundSum}</strong>
            </p>
            <p style={{ margin: '0', fontSize: '20px', color: 'black' }}>
              <strong>Do you wish to continue anyway?</strong>
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '5vw' }}>
            {/* Cancel button */}
            <button
              onClick={() => setShowSumWarning(false)}
              style={{
                width: '20vw',
                height: '20vw',
                backgroundColor: 'red',
                border: '4px solid white',
                borderRadius: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="80%" height="80%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </button>
            
            {/* Submit Anyway button */}
            <button
              onClick={submitScores}
              style={{
                width: '20vw',
                height: '20vw',
                backgroundColor: 'green',
                border: '4px solid white',
                borderRadius: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="80%" height="80%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      <div style={{ 
        padding: 16,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '80vw',
        marginLeft: '10vw',
        boxSizing: 'border-box',
        overflowY: (useMinHeight || useMaxHeight) ? 'auto' : 'visible'
      }}>
        {players.map((player, i) => (
          <PlayerCard
            key={player.name}
            ref={el => playerCardRefs.current[i] = el}
            player={player}
            onChange={delta => updateScore(i, delta)}
            height={cardHeight}
            onEditPlayer={() => onEditPlayer(i)}
          />
        ))}
      </div>
    </>
  );
}
