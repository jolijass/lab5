import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";


export default function CyclingExercise() {
  const [count, setCount] = useState(0);
  const [terrain, setTerrain] = useState("Flat");
  const [timer, setTimer] = useState(30 * 60); // 30-minute timer in seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function startTimer() {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
  }

  function stopTimer() {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  }

  function countPlus() {
    setCount((number) => number + 1);
  }

  function countReset() {
    setCount(0);
    setTerrain("Flat");
    setTimer(30 * 60);
    stopTimer();
  }

  function handleTerrainChange(event) {
    setTerrain(event.target.value);
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  return (
    <div>
      <h1>Cycling Exercise</h1>
      <p>Welcome to the Cycling Exercise!</p>
      <p>{formatTime(timer)}</p>
      <div id="terry">
        <p id="terrain">{terrain}</p>
      </div>
      <p>Reps: {count}</p>
      <div id="label">
      <label>
        Terrain: 
        <select value={terrain} onChange={handleTerrainChange}>
          <option value="Flat">Flat</option>
          <option value="Hilly">Hilly</option>
          <option value="Mountainous">Mountainous</option>
        </select>
      </label>
      </div>
      <br />
      {!isRunning && (
        <button id="start" onClick={startTimer}>Start</button>
      )}
      {isRunning && (
        <button id="stop" onClick={stopTimer}>Stop</button>
      )}
      <button id="reps" onClick={countPlus}>Add Reps</button>
      <button id="reset" onClick={countReset}>Reset</button>
      <div id="mainmenu">
        <Link to="/">Main Menu</Link>
      </div>
    </div>
  );
}