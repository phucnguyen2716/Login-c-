import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import { experiences } from "../../constants/experience";

const WorkExperience = () => {
  return (
    <section className="max-container py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Work Experience</h2>

      <VerticalTimeline layout="2-columns" lineColor="#d1d5db">
        {experiences.map((exp, index) => (
          <VerticalTimelineElement
            key={index}
            date={exp.date}
            iconStyle={{
              background: exp.iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            icon={
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={exp.icon}
                  alt={exp.company_name}
                  style={{
                    width: "60%",
                    height: "60%",
                    objectFit: "contain",
                  }}
                />
              </div>
            }
            contentStyle={{
              background: "#fff",
              color: "#333",
              border: "1px solid #ccc",
              borderBottom: `6px solid ${exp.iconBg}`,
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
            contentArrowStyle={{ borderRight: "7px solid #ccc" }}
          >
            <h3 className="text-lg font-bold">{exp.title}</h3>
            <p className="text-sm text-gray-600 font-medium mb-2">
              {exp.company_name}
            </p>
            <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
              {exp.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </section>
  );
};

export default WorkExperience;
