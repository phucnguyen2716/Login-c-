import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiences } from "../../constants/experience";
import { skills } from "../../constants/skill"
const WorkExperience = () => {
  return (
    
    <section className='max-container'>
      <h1 className='head-text'>
        Hello, I'm{" "}
        <span className='blue-gradient_text font-semibold drop-shadow'>
          Adrian
        </span>{" "}
        👋
      </h1>

      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p>
          Software Engineer based in Croatia, specializing in technical
          education through hands-on learning and building applications.
        </p>
      </div>

      {/* My Skills */}
      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>My Skills</h3>

        <div className='mt-16 flex flex-wrap gap-12'>
          {skills.map((skill) => (
            <div className='block-container w-20 h-20' key={skill.name}>
              <div className='btn-back rounded-xl' />
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      

      {/* Work Experience */}
      <div className='py-16'>
        <h3 className='subhead-text'>Work Experience</h3>

        <div className='mt-5 flex flex-col gap-3 text-slate-500'>
          <p>
            I've worked with all sorts of companies, leveling up my skills and
            teaming up with smart people. Here's the rundown:
          </p>
        </div>

        <div className='max-container py-10'>
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
        </div>
      </div>
    </section>
    
    
  );
};

export default WorkExperience;
