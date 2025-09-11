import React, { useState, useEffect, useRef } from "react";
import { Button } from "./Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  // setup nhạc
  useEffect(() => {
    audioRef.current = new Audio("/PianoBGM.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((e) => console.warn("Autoplay blocked:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    showButton();
  }, []);

  // 🔹 Mỗi lần đổi route thì tắt search
  useEffect(() => {
    setShowSearch(false);
  }, [location]);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            TRVL <i className="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/services"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/products"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/my-team"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Team Progress
              </Link>
            </li>
            <li>
              <Link
                to="/sign-in"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
            </li>
          </ul>

          {/* Music button + search + sign in */}
          <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            {/* Music Button */}
            <div
              className="music-bar-container"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {[1, 2, 3, 4, 5].map((bar, i) => (
                <span
                  key={i}
                  className={`music-bar ${isPlaying ? "playing" : "paused"}`}
                ></span>
              ))}
            </div>

            {/* Search Icon */}
            <div className="search-wrapper">
              <div
                className="search-icon"
                onClick={() => setShowSearch(!showSearch)}
              >
                <i className={showSearch ? "fas fa-times" : "fas fa-search"} />
              </div>
            </div>

            {button && <Button buttonStyle="btn--outline">SIGN IN</Button>}
          </div>
        </div>
      </nav>

      {/* Search Bar dưới navbar */}
      {showSearch && (
        <div className="search-bar">
          <div className="search-container">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const query = e.target.elements.searchInput.value.trim();
                if (query) {
                  navigate(`/search?s=${encodeURIComponent(query)}`);
                }
              }}
            >
              <i className="fas fa-search"></i>
              <input
                type="text"
                name="searchInput"
                placeholder="Search..."
                autoFocus
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
