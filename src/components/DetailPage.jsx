import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import "./DetailPage.css";
import { FaHeart } from "react-icons/fa";

function DetailPage() {
  const { name } = useParams();
  const [opacity, setOpacity] = useState(0);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const listRef = useRef(null);

  const gameDetails = {
    "dead-space-2": {
      src: "https://i.imgur.com/4AiXzf8.jpeg",
      title: "Dead Space 2",
      desc: "Game sinh tồn trong chiến tranh với yếu tố kinh dị.",
      category: "Survival Horror",
      type: "Horror, Survival",
      tags: "Dead Space, Sci-Fi, Việt Hóa",
      initialLikes: 15,
      description: "là một trò chơi hấp dẫn với cốt truyện và kinh dị"
    },
    "league-of-legend": {
      src: "https://i.imgur.com/tGbaZCY.jpeg",
      title: "League of Legend",
      desc: "Một tựa game MOBA hấp dẫn nhiều người chơi.",
      category: "Survival Horror",
      type: "MOBA, Multiplayer",
      tags: "LoL, Riot Games, Việt Hóa",
      initialLikes: 25,
      description: "là một trò chơi MOBA nhiều người chơi hấp dẫn"
    },
    "arena-of-avalor": {
      src: "https://i.imgur.com/2nCt3Sbl.jpg",
      title: "Arena of Avalor",
      desc: "Game phiêu lưu hành động đầy kịch tính.",
      category: "Survival Horror",
      type: "Arcane, Open World, Roguelike",
      tags: "cánh cụt team, Dungeon Crawler, Việt Hóa",
      initialLikes: 10,
      description: "là một trò chơi phiêu lưu hành động"
    },
    "resident-evil-3": {
      src: "https://i.imgur.com/MpQ0QbP.jpeg",
      title: "Resident Evil 3",
      desc: "Survival Horror kinh điển.",
      category: "Survival Horror",
      type: "Horror, Survival",
      tags: "RE3, Capcom, Việt Hóa",
      initialLikes: 18,
      description: "là trò chơi kinh điển về sinh tồn và kinh dị"
    },
    "silent-hill-2": {
      src: "https://i.imgur.com/hR5hO5D.jpeg",
      title: "Silent Hill 2",
      desc: "Kinh dị tâm lý vượt thời gian.",
      category: "Survival Horror",
      type: "Horror, Psychological",
      tags: "Silent Hill, Konami, Việt Hóa",
      initialLikes: 12,
      description: "trò chơi kinh dị tâm lý nổi tiếng"
    },
    "amnesia-the-dark-descent": {
      src: "https://i.imgur.com/PlD2Wox.jpeg",
      title: "Amnesia: The Dark Descent",
      desc: "Sinh tồn trong bóng tối.",
      category: "Survival Horror",
      type: "Horror, Survival",
      tags: "Amnesia, Frictional Games, Việt Hóa",
      initialLikes: 20,
      description: "trải nghiệm sinh tồn trong bóng tối đáng sợ"
    },
    "cyberpunk-2077": {
      src: "https://i.imgur.com/x6hRppl.jpeg",
      title: "Cyberpunk 2077",
      desc: "Thành phố Night City hỗn loạn và đầy nguy hiểm.",
      category: "Survival Horror",
      type: "Open World, Sci-Fi",
      tags: "CDPR, Việt Hóa",
      initialLikes: 35,
      description: "RPG thế giới mở với đồ họa đỉnh cao"
    },
    "the-witcher-3": {
      src: "https://i.imgur.com/xGepnmr.jpeg",
      title: "The Witcher 3",
      desc: "Hành trình của Geralt trong thế giới fantasy.",
      category: "Survival Horror",
      type: "Action RPG, Open World",
      tags: "CDPR, Việt Hóa",
      initialLikes: 42,
      description: "Siêu phẩm RPG nhập vai thế giới mở"
    },
    "minecraft": {
      src: "https://i.imgur.com/ko7hXwD.jpeg",
      title: "Minecraft",
      desc: "Xây dựng và sinh tồn trong thế giới khối vuông.",
      category: "Survival Horror",
      type: "Creative, Survival",
      tags: "Mojang, Multiplayer, Việt Hóa",
      initialLikes: 50,
      description: "Game sandbox sáng tạo kinh điển"
    },
    "valorant": {
      src: "https://i.imgur.com/yX1lMf1.jpeg",
      title: "Valorant",
      desc: "FPS chiến thuật 5v5.",
      category: "Survival Horror",
      type: "Shooter, Multiplayer",
      tags: "Riot Games, Việt Hóa",
      initialLikes: 30,
      description: "Game bắn súng eSports hấp dẫn"
    },
    "csgo": {
      src: "https://i.imgur.com/mRj8mBn.jpeg",
      title: "CS:GO",
      desc: "Counter-Strike huyền thoại.",
      category: "Survival Horror",
      type: "Shooter, Multiplayer",
      tags: "Valve, Việt Hóa",
      initialLikes: 45,
      description: "Game FPS huyền thoại nhiều người chơi"
    },
    "genshin-impact": {
      src: "https://i.imgur.com/b6oQ1Lx.jpeg",
      title: "Genshin Impact",
      desc: "Thế giới anime mở rộng với nhiều nhân vật.",
      category: "Survival Horror",
      type: "Action RPG, Open World",
      tags: "miHoYo, Việt Hóa",
      initialLikes: 38,
      description: "Game nhập vai thế giới mở phong cách anime"
    },
    "elden-ring": {
      src: "https://i.imgur.com/6QfMM3Q.jpeg",
      title: "Elden Ring",
      desc: "Tác phẩm đỉnh cao của FromSoftware.",
      category: "Survival Horror",
      type: "Soulslike, Open World",
      tags: "FromSoftware, Bandai Namco",
      initialLikes: 55,
      description: "Game nhập vai thử thách với thế giới mở rộng lớn"
    }
  };

  const game = gameDetails[name];

  // Scroll overlay effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.min(scrollY / 300, 0.8);
      setOpacity(newOpacity);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset likes and liked state when game changes
  useEffect(() => {
    if (game && game.initialLikes !== undefined) {
      setLikes(game.initialLikes);
      setLiked(false);
    }
  }, [name]);

  if (!game) return <h2>Không tìm thấy game</h2>;

  const handleLike = () => {
    if (!liked) {
      setLikes(prev => prev + 1);
    } else {
      setLikes(prev => prev - 1);
    }
    setLiked(prev => !prev);
  };

  // Scroll theo chuột (hover)
  const handleMouseMove = (e) => {
    const container = listRef.current;
    if (!container) return;

    const { left, width } = container.getBoundingClientRect();
    const x = e.clientX - left;

    // Tỉ lệ vị trí chuột (0 -> 1)
    const ratio = x / width;

    // Tính scroll max
    const maxScroll = container.scrollWidth - container.clientWidth;
    container.scrollLeft = maxScroll * ratio;
  };

  return (
    <div>
      {/* Hero Banner */}
      <div className="hero">
        <img src={game.src} alt="banner" className="hero-img" />
        <div className="hero-overlay" style={{ opacity }}></div>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/games">Tất Cả Game Việt Hóa</Link>
        <span>/</span>
        <Link to={`/category/${game.category.toLowerCase().replace(" ", "-")}`}>
          {game.category}
        </Link>
        <span>/</span>
        <span className="active">{game.title}</span>
      </div>

      {/* Main Content */}
      <div className="main-content-box">
        <div className="main-image-wrapper">
          <img src={game.src} alt="banner" className="main-image" />
        </div>
        <div className="content">
          <p><strong>Thể Loại:</strong> {game.type}</p>
          <p><strong>Tags:</strong> {game.tags}</p>
          <p>
            <strong>Likes:</strong>{" "}
            <span
              style={{
                cursor: "pointer",
                color: liked ? "red" : "white",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontWeight: "bold",
                transition: "color 0.3s ease"
              }}
              onClick={handleLike}
            >
              <FaHeart /> {likes}
            </span>
          </p>
        </div>
      </div>

      {/* Mô tả chi tiết */}
      <div className="description">
        <h2>Mô tả</h2>
        <p>{game.title} {game.description}</p>
      </div>

      {/* Thông tin thêm */}
      <div className="info-box">
        <h2>Thông Tin Thêm</h2>
        <ul>
          <li><strong>Nhà Sản Xuất:</strong> Stray Fawn Studio</li>
          <li><strong>Nền Tảng:</strong> PC</li>
          <li><strong>Ngôn Ngữ:</strong> Tiếng Anh, Tiếng Việt</li>
          <li><strong>Trạng Thái:</strong> Miễn phí</li>
        </ul>
      </div>

      {/* Game cùng thể loại - Carousel */}
      <div className="related-games">
        <h2>Game cùng thể loại</h2>
        <div className="game-list-container">
          <div
            className="game-list"
            ref={listRef}
            onMouseMove={handleMouseMove}  // ✅ hover là scroll
          >
            {Object.entries(gameDetails)
              .filter(([key, g]) => g.category === game.category && g.title !== game.title)
              .map(([key, g]) => (
                <Link
                  key={key}
                  to={`/detail/${key}`}
                  className="game-card"
                >
                  <div className="game-card-img">
                    <img src={g.src} alt={g.title} />
                  </div>
                  <div className="game-card-body">
                    <p className="game-title">{g.title}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
