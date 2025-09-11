import React from 'react';
import { BookOpen, GraduationCap, Lightbulb } from 'lucide-react';
import './Cards.css';

function Cards() {
  const items = [
    {
      icon: <BookOpen className="card-icon" />,
      title: "Kiến Thức Toàn Diện",
      desc: "Chúng tôi cung cấp nội dung học tập phong phú, từ cơ bản đến nâng cao, giúp người học dễ dàng tiếp cận tri thức."
    },
    {
      icon: <GraduationCap className="card-icon" />,
      title: "Phát Triển Bản Thân",
      desc: "Các khóa học được thiết kế để hỗ trợ sự tiến bộ cá nhân, nâng cao kỹ năng và định hướng sự nghiệp."
    },
    {
      icon: <Lightbulb className="card-icon" />,
      title: "Ý Tưởng Sáng Tạo",
      desc: "Khuyến khích học viên tư duy phản biện, phát triển ý tưởng sáng tạo và áp dụng kiến thức vào thực tế."
    }
  ];

  return (
    <div className='cards'>
      <h1 className="cards__title">Tại sao chọn chúng tôi?</h1>
      <div className='cards__container'>
        <div className='cards__wrapper features-grid'>
          {items.map((item, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{item.icon}</div>
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;
