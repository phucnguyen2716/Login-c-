import React, { useRef, useEffect, useState } from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Footer from '../Footer';

function Home() {
  const audioRef = useRef(new Audio('/PianoBGM.mp3')); // ✅ Không dùng import
  audioRef.current.loop = true;
  audioRef.current.volume = 0.4;

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    return () => {
      audioRef.current.pause(); // cleanup
    };
  }, [isPlaying]);

  return (
    <>
      <HeroSection />
      <Cards />

      {/* Nút bật/tắt nhạc */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 9999,
      }}>
        <img
          src={isPlaying ? '/soundon.png' : '/soundoff.png'} 
          alt="toggle-sound"
          onClick={() => setIsPlaying(!isPlaying)}
          style={{ width: '40px', height: '40px', cursor: 'pointer' }}
        />
      </div>

      <Footer />
    </>
  );
}

export default Home;
