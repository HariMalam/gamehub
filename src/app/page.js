"use client";
import { useEffect, useState } from 'react';
import { fetchGames } from '../services/api'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GameList from '@/components/GameList';

export default function Home() {
  const [games, setGames] = useState([]);
  const [filterGames, setFilterGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGames();
      setGames(data);
      setFilterGames(data);
    };
    fetchData();
  }, []);


  return (
    <>
      <Navbar
        games={games}
        setFilterGames = {setFilterGames}
      />
      <GameList games={filterGames} />
      <Footer />
    </>
  );
}
