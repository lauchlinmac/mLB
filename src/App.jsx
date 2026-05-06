// src/App.jsx

import { useEffect, useState } from "react";
import { fetchGames, fetchLiveGame } from "./API";
import "./App.css";

function App() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [liveData, setLiveData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liveLoading, setLiveLoading] = useState(false);

  // LOAD SCOREBOARD
  useEffect(() => {
    async function loadGames() {
      try {
        const data = await fetchGames();
        setGames(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadGames();

    const interval = setInterval(loadGames, 30000);

    return () => clearInterval(interval);
  }, []);

  // LOAD LIVE GAME
  async function openGame(gamePk) {
    setSelectedGame(gamePk);
    setLiveLoading(true);

    try {
      const data = await fetchLiveGame(gamePk);
      setLiveData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLiveLoading(false);
    }
  }

  // AUTO REFRESH LIVE GAME
  useEffect(() => {
    if (!selectedGame) return;

    async function refreshGame() {
      const data = await fetchLiveGame(selectedGame);

      if (data) {
