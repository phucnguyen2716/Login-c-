import React, { useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import '../../App.css';

ChartJS.register(ArcElement, Tooltip, CategoryScale, LinearScale, BarElement);

// Dữ liệu team
const teamMembers = [
  {
    id: 1,
    name: 'An',
    role: 'UX-UI',
    avatar: 'https://i.pravatar.cc/100?img=1',
    progress: 70,
    tasks: [
      { task: 'Lên kế hoạch', completion: 'Hoàn thành', score: 10 },
      { task: 'Thiết kế UI', completion: 'Chưa hoàn thành', score: 5 },
    ],
  },
  {
    id: 2,
    name: 'Bình',
    role: 'Backend',
    avatar: 'https://i.pravatar.cc/100?img=2',
    progress: 80,
    tasks: [
      { task: 'Backend API', completion: 'Hoàn thành', score: 9 },
      { task: 'Database', completion: 'Hoàn thành', score: 10 },
    ],
  },
  {
    id: 3,
    name: 'Chi',
    role: 'BA',
    avatar: 'https://i.pravatar.cc/100?img=3',
    progress: 60,
    tasks: [
      { task: 'Phân tích yêu cầu', completion: 'Hoàn thành', score: 8 },
      { task: 'Báo cáo', completion: 'Chưa hoàn thành', score: 4 },
    ],
  },
  {
    id: 4,
    name: 'Dũng',
    role: 'Tester',
    avatar: 'https://i.pravatar.cc/100?img=4',
    progress: 85,
    tasks: [
      { task: 'Tích hợp', completion: 'Hoàn thành', score: 10 },
      { task: 'Test', completion: 'Chưa hoàn thành', score: 6 },
    ],
  },
  {
    id: 5,
    name: 'Emmy',
    role: 'PM',
    avatar: 'https://i.pravatar.cc/100?img=5',
    progress: 90,
    tasks: [
      { task: 'Viết tài liệu', completion: 'Hoàn thành', score: 9 },
      { task: 'Trình bày', completion: 'Hoàn thành', score: 10 },
    ],
  },
];

// Plugin vẽ text giữa Doughnut
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: (chart) => {
    const { width, height, config } = chart;
    const ctx = chart.ctx;
    const text = config.options.plugins.centerText.text;

    ctx.restore();
    const fontSize = (height / 114).toFixed(2);
    ctx.font = `${fontSize}em Arial`;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#333';
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;
    ctx.fillText(text, textX, textY);
    ctx.save();
  },
};

export default function MyTeam() {
  const [selectedMember, setSelectedMember] = useState(null);

  const renderDoughnut = (member) => {
    const data = {
      labels: ['Hoàn thành', 'Chưa hoàn thành'],
      datasets: [
        {
          data: [member.progress, 100 - member.progress],
          backgroundColor: ['#4CAF50', '#e0e0e0'],
          borderWidth: 0,
          cutout: '60%',
        },
      ],
    };

    const options = {
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
        centerText: {
          text: `${member.progress}%`,
        },
      },
      maintainAspectRatio: false,
    };

    return (
      <div style={{ width: '220px', height: '220px' }}>
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
      </div>
    );
  };

  const renderTaskTable = (tasks) => (
    <table className="task-table">
      <thead>
        <tr>
          <th>Nhiệm vụ</th>
          <th>Hoàn thành</th>
          <th>Điểm</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index}>
            <td>{task.task}</td>
            <td>{task.completion}</td>
            <td>{task.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderBarChart = () => {
    const colors = ['#4CAF50', '#FF9800', '#2196F3', '#9C27B0', '#E91E63'];

    const data = {
      labels: teamMembers.map((m) => m.name),
      datasets: [
        {
          label: 'Tiến độ (%)',
          data: teamMembers.map((m) => m.progress),
          backgroundColor: colors,
          borderRadius: 6,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.parsed.y}%`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: (val) => `${val}%`,
          },
        },
      },
    };

    return (
      <div style={{ maxWidth: '600px', margin: '40px auto' }}>
        <h2 style={{ textAlign: 'center' }}>Tiến độ tổng thể</h2>
        <Bar data={data} options={options} />
      </div>
    );
  };

  return (
    <div className="services-page">
      <h1 className="services-title">PROJECT TEAM</h1>

      <div className="avatar-row">
        {teamMembers.map((member) => (
          <div key={member.id} className="avatar-card">
            <img src={member.avatar} alt={member.name} className="avatar-img" />
            <p className="member-name">{member.name}</p>
            <p className="member-role">{member.role}</p>
            <button onClick={() => setSelectedMember(member)}>Chi tiết</button>
          </div>
        ))}
      </div>

      {/* Chỉ hiện biểu đồ tổng khi chưa xem chi tiết */}
      {!selectedMember && renderBarChart()}

      {/* Hiện chi tiết thành viên nếu được chọn */}
      {selectedMember && (
        <div className="member-detail">
          <button
            onClick={() => setSelectedMember(null)}
            style={{
              marginBottom: '20px',
              backgroundColor: '#e0e7ff', // màu xanh nhạt (Tailwind: indigo-100)
              border: '1px solid #c7d2fe',
              padding: '10px 16px',
              borderRadius: '8px',
              color: '#1e40af', // xanh đậm (indigo-900)
              fontWeight: '500',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#c7d2fe';
              e.currentTarget.style.transform = 'scale(1.03)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#e0e7ff';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ← Quay lại
          </button>
          <h2>Chi tiết: {selectedMember.name}</h2>
          <div className="detail-content">
            <div className="chart-container">{renderDoughnut(selectedMember)}</div>
            <div className="table-container">{renderTaskTable(selectedMember.tasks)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
