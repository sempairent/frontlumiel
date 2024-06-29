import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const MusicPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch all songs initially
    
    axios.get('https://lumielbackend-production.up.railway.app/songs')
      .then(response => {
        setSongs(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the songs!', error);
      });
  }, []);

  useEffect(() => {
    // Fetch songs based on search query
    if (searchQuery === '') {
      // If search query is empty, fetch all songs
      axios.get('https://lumielbackend-production.up.railway.app/songs')
        .then(response => {
          setSongs(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the songs!', error);
        });
    } else {
      // If search query is not empty, perform search
      axios.get(`https://lumielbackend-production.up.railway.app/search?query=${searchQuery}`)
        .then(response => {
          setSongs(response.data);
        })
        .catch(error => {
          console.error('There was an error searching for songs!', error);
        });
    }
  }, [searchQuery]);

  const playSong = (song) => {
    setCurrentSong(song);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Music Player</h1>
      <div className="max-w-md mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="¿Qué quieres reproducir?"
          className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-900 text-white"
        />
        <ul className="space-y-4">
          {songs.map(song => (
            <li key={song.id} className="bg-gray-800 p-4 rounded shadow-md flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{song.title}</p>
                <p className="text-gray-400">{song.artist}</p>
              </div>
              <button
                onClick={() => playSong(song)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Play
              </button>
            </li>
          ))}
        </ul>
        {currentSong && (
          <div className="mt-6 p-4 bg-gray-800 rounded shadow-md">
            <img src={currentSong.file_album} alt="Album cover" className=' mb-1'/>
            <h2 className="text-2xl font-semibold">{currentSong.title}</h2>
            <p className="text-lg">{currentSong.artist}</p>
            <audio controls src={currentSong.file_path} className="w-full mt-4" autoPlay />
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
