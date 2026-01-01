import { useState } from "react";

export default function EditPlayer({ player, onUpdatePlayer, onDeletePlayer, onCancel }) {
  const [name, setName] = useState(player.name);
  const [selectedColor, setSelectedColor] = useState(player.color || "#FF5555");

  const colors = [
    "#FF5555", "#FF8C42", "#FFFF55", "#55FF55", "#55FFFF",
    "#5555FF", "#C355FF", "#FF55FF", "#AAAAAA", "#FFFFFF"
  ];

  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "←"],
    ["Z", "X", "C", "V", "B", "N", "M"]
  ];

  const handleKeyPress = (key) => {
    if (key === "←") {
      setName(name.slice(0, -1));
    } else if (name.length < 10) {
      setName(name + key);
    }
  };

  const handleSubmit = () => {
    if (name.trim()) {
      onUpdatePlayer({ ...player, name: name.trim(), color: selectedColor });
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      boxSizing: "border-box",
      overflow: "hidden",
      gap: "1vh"
    }}>
      {/* Color picker */}
      <div style={{ display: "flex", gap: "0.8vw", width: "100%", justifyContent: "center" }}>
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            style={{
              width: "7vw",
              height: "13vh",
              backgroundColor: color,
              border: selectedColor === color ? "3px solid black" : "2px solid #333",
              cursor: "pointer",
              borderRadius: "8px"
            }}
          />
        ))}
      </div>

      {/* Name display and action buttons */}
      <div style={{ display: "flex", gap: "2vw", alignItems: "center", width: "90%", justifyContent: "center" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "2vw",
          backgroundColor: selectedColor,
          padding: "3vh 4vw",
          borderRadius: "12px",
          border: "3px solid #333",
          flex: 1,
          maxWidth: "700px",
          justifyContent: "space-between"
        }}>
          <div style={{ fontSize: "4vh" }}>👤</div>
          <div style={{
            fontSize: "5vh",
            fontWeight: "bold",
            flex: 1,
            textAlign: "center",
            color: "#000"
          }}>
            {name || " "}
          </div>
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            style={{
              fontSize: "4vh",
              background: "none",
              border: "none",
              cursor: name.trim() ? "pointer" : "not-allowed",
              opacity: name.trim() ? 1 : 0.3,
              WebkitTextStroke: "2px black",
              color: "white"
            }}
          >
            ✓
          </button>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5vh" }}>
          <button
            onClick={onCancel}
            style={{
              padding: "2.5vh 2.5vw",
              fontSize: "2.2vh",
              backgroundColor: "#AAAAAA",
              color: "white",
              border: "2px solid #333",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              whiteSpace: "nowrap"
            }}
          >
            Cancel
          </button>
          <button
            onClick={onDeletePlayer}
            style={{
              padding: "2.5vh 2.5vw",
              fontSize: "2.2vh",
              backgroundColor: "#FF5555",
              color: "white",
              border: "2px solid #333",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              whiteSpace: "nowrap"
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {/* On-screen keyboard */}
      <div style={{ width: "95%" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "2.2vh",
          padding: "3.5vh 1.5vw",
          backgroundColor: "#77DDAA",
          borderRadius: "12px",
          border: "3px solid #333"
        }}>
          {keyboardRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: "flex",
                gap: "0.8vw",
                justifyContent: "center"
              }}
            >
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  style={{
                    width: "7vw",
                    height: "13vh",
                    fontSize: "3.8vh",
                    fontWeight: "bold",
                    backgroundColor: "#AAFFDD",
                    border: "2px solid #333",
                    borderRadius: "8px",
                    cursor: "pointer",
                    color: "#000"
                  }}
                >
                  {key}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
