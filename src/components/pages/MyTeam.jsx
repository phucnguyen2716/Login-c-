import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from 'chart.js';
import '../../App.css';

ChartJS.register(ArcElement, Tooltip);

// Dữ liệu có thêm `role`
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

// Plugin để vẽ text ở giữa doughnut
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

  return (
    <div className="services-page">
      <h1 className="services-title">MY TEAM</h1>
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

      {selectedMember && (
        <div className="member-detail">
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
