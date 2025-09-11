import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

function SidebarGallery() {
  const navigate = useNavigate();

  const images = [
    {
      id: 1,
      src: "https://i.imgur.com/4AiXzf8.jpeg",
      name: "dead-space-2"
    },
    {
      id: 2,
      src: "https://i.imgur.com/tGbaZCY.jpeg",
      name:"league-of-legend"
    },
    {
      id: 3,
      src: "https://i.imgur.com/2nCt3Sbl.jpg",
      name: "arena-of-avalor"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto chuyển ảnh sau 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Bắt phím < >
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  const handleViewDetail = () => {
    const currentImg = images[currentIndex];
    navigate(`/detail/${currentImg.name}`);
  };

  return (
    <div className="gallery-container">
      <img src="/images/blue.jpg" className="background-img" />
      {images.map((img, index) => {
        let position = "next";
        if (index === currentIndex) position = "active";
        else if (index === (currentIndex - 1 + images.length) % images.length)
          position = "prev";

        return (
          <div key={img.id} className={`slide ${position}`}>
            <img src={img.src} alt={img.desc} className="slide-img" />
            {position === "active" && (
              <div className="overlay-text" onClick={handleViewDetail}>
                XEM THÔNG TIN
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default SidebarGallery;
