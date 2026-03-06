import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

const DebounceSearchDemo: React.FC = () => {
  const [delay, setDelay] = useState(500);
  const [inputValue, setInputValue] = useState("");

  const debouncedValue = useDebounce(inputValue, delay);

  useEffect(() => {
    if (debouncedValue) {
      console.log(`Searching for: ${debouncedValue}`);
    }
  }, [debouncedValue]);

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        maxWidth: 600,
        margin: "20px auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: 20 }}>
        Debounce Search Demo
      </h3>

      <div style={{ marginBottom: 15 }}>
        <label htmlFor="delayInput">Debounce Delay (ms): </label>
        <input
          type="number"
          id="delayInput"
          min={0}
          step={100}
          style={{ padding: 8, width: 80 }}
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
        />
      </div>

      <input
        type="text"
        placeholder="Type to search..."
        style={{
          width: "calc(100% - 16px)",
          padding: 10,
          marginBottom: 10,
          border: "1px solid #ddd",
          borderRadius: 4,
        }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <div style={{ marginBottom: 5 }}>
        <strong>Current Input:</strong> {inputValue}
      </div>

      <div style={{ marginBottom: 15, fontStyle: "italic" }}>
        <strong>Debounced Value (after {delay}ms):</strong> {debouncedValue}
      </div>

      <div>
        <h4>Simulated Search Results:</h4>
        <p>Type to see results.</p>
      </div>
    </div>
  );
};

export default DebounceSearchDemo;
