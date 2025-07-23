import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { experiences } from "../../constants/experiences";

const WorkExperience = () => {
  return (
    <section className='py-16 px-4'>
      <h3 className='text-2xl font-bold mb-4'>Work Experience</h3>

      <VerticalTimeline>
        {experiences.map((experience, index) => (
          <VerticalTimelineElement
            key={experience.company_name + index}
            date={experience.date}
            iconStyle={{ background: experience.iconBg }}
            icon={
              <div className='flex justify-center items-center w-full h-full'>
                <img
                  src={experience.icon}
                  alt={experience.company_name}
                  className='w-[60%] h-[60%] object-contain'
                />
              </div>
            }
            contentStyle={{
              borderBottom: "6px solid " + experience.iconBg,
              boxShadow: "none",
            }}
          >
            <h3 className='text-lg font-semibold'>{experience.title}</h3>
            <p className='text-sm text-gray-600'>{experience.company_name}</p>
            <ul className='mt-3 list-disc list-inside space-y-1 text-sm text-gray-700'>
              {experience.points.map((point, i) => (
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
