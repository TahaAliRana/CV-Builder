import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export default function MinimalTemplate({ data }) {
  const { personal, summary, experience, education, skills } = data;

  return (
    <div className="p-8 min-h-full font-sans text-gray-800">
      {/* Header */}
      <header className="border-b-2 border-gray-800 pb-6 mb-6">
        <div className="flex items-center gap-6">
          {personal.photo && (
            <img
              src={personal.photo}
              alt={personal.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-800"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wide">
              {personal.name || 'Your Name'}
            </h1>
            <p className="text-xl text-gray-600 mt-1">{personal.role || 'Job Title'}</p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
              {personal.email && (
                <span className="rigid-flex gap-1">
                  <div className="icon-container"><Mail size={14} /></div> {personal.email}
                </span>
              )}
              {personal.phone && (
                <span className="rigid-flex gap-1">
                  <div className="icon-container"><Phone size={14} /></div> {personal.phone}
                </span>
              )}
              {personal.location && (
                <span className="rigid-flex gap-1">
                  <div className="icon-container"><MapPin size={14} /></div> {personal.location}
                </span>
              )}
            </div>
            <div className="flex gap-3 mt-2">
              {personal.linkedin && (
                <a href={personal.linkedin} className="text-blue-600 hover:underline text-sm break-all">
                  {personal.linkedin}
                </a>
              )}
              {personal.github && (
                <a href={personal.github} className="text-blue-600 hover:underline text-sm break-all">
                  {personal.github}
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 pb-1 mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-800">{exp.role}</h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-700 font-medium">{exp.company}</p>
                <p className="text-gray-600 text-sm mt-1 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-gray-800">{edu.institution}</h3>
                  <span className="text-sm text-gray-600">{edu.endDate}</span>
                </div>
                <p className="text-gray-700">{edu.degree} in {edu.field}</p>
                {edu.description && (
                  <p className="text-gray-600 text-sm mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 pb-1 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2 items-center">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="skill-tag px-3 bg-gray-100 text-gray-800 rounded text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
      {/* Custom Sections */}
      {data.customSections?.map(section => (
        <section key={section.id} className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 pb-1 mb-3">
            {section.title}
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>
        </section>
      ))}
    </div>
  );
}