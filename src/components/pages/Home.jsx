import React, { useRef, useEffect, useState } from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Footer from '../Footer';

function Home() {
  const audioRef = useRef(null); // Chỉ khởi tạo 1 lần
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Khởi tạo audio 1 lần sau khi component mount
    audioRef.current = new Audio('/PianoBGM.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((e) => {
        console.warn('Autoplay blocked:', e);
      });
    } else {
      audio.pause();
    }
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
