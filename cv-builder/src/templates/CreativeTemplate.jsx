import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';

export default function CreativeTemplate({ data }) {
  const { personal, summary, experience, education, skills } = data;

  const getSkillLevel = (category) => {
    const catSkills = skills.filter(s => s.category === category);
    return catSkills.length;
  };

  return (
    <div className="min-h-full font-sans bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Color Bar */}
      <div className="h-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>

      <div className="flex">
        {/* Left Panel */}
        <aside className="w-1/3 bg-gray-900 text-white p-8">
          {/* Profile */}
          <div className="text-center mb-8">
            {personal.photo ? (
              <img
                src={personal.photo}
                alt={personal.name}
                className="w-36 h-36 rounded-full object-cover border-4 border-purple-500 mx-auto mb-4"
              />
            ) : (
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-4xl font-bold">
                {personal.name?.charAt(0) || '?'}
              </div>
            )}
            <h1 className="text-2xl font-bold">{personal.name || 'Your Name'}</h1>
            <p className="text-purple-300 mt-1">{personal.role || 'Job Title'}</p>
          </div>

          {/* Contact */}
          <div className="mb-8 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Contact</h2>
            {personal.email && (
              <div className="rigid-flex gap-3 text-sm">
                <div className="icon-container"><Mail size={16} className="text-purple-400" /></div>
                <span className="break-words">{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="rigid-flex gap-3 text-sm">
                <div className="icon-container"><Phone size={16} className="text-purple-400" /></div>
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="rigid-flex gap-3 text-sm">
                <div className="icon-container"><MapPin size={16} className="text-purple-400" /></div>
                <span>{personal.location}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="rigid-flex gap-3 text-sm">
                <div className="icon-container"><Linkedin size={16} className="text-purple-400" /></div>
                <a href={personal.linkedin} className="hover:text-purple-300 break-all">{personal.linkedin}</a>
              </div>
            )}
            {personal.github && (
              <div className="rigid-flex gap-3 text-sm">
                <div className="icon-container"><Github size={16} className="text-purple-400" /></div>
                <a href={personal.github} className="hover:text-purple-300 break-all">{personal.github}</a>
              </div>
            )}
          </div>

          {/* Skills Visual */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Skills</h2>
              <div className="space-y-3">
                {['technical', 'soft', 'tools'].map(category => {
                  const catSkills = skills.filter(s => s.category === category);
                  if (catSkills.length === 0) return null;
                  return (
                    <div key={category}>
                      <p className="text-xs text-purple-300 uppercase mb-2">{category}</p>
                      <div className="flex flex-wrap gap-2 items-center">
                        {catSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="skill-tag px-2 bg-gray-800 rounded text-xs border border-gray-700"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </aside>

        {/* Right Panel */}
        <main className="w-2/3 p-8">
          {/* Summary */}
          {summary && (
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <ExternalLink size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">About Me</h2>
              </div>
              <p className="text-gray-600 leading-relaxed bg-white p-4 rounded-lg shadow-sm">
                {summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <ExternalLink size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Experience</h2>
              </div>
              <div className="space-y-4">
                {experience.map(exp => (
                  <div key={exp.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-800">{exp.role}</h3>
                        <p className="text-purple-600 font-medium">{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <ExternalLink size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Education</h2>
              </div>
              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id} className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-bold text-gray-800">{edu.institution}</h3>
                    <p className="text-gray-700">{edu.degree} in {edu.field}</p>
                    <p className="text-sm text-gray-500 mt-1">{edu.endDate}</p>
                    {edu.description && (
                      <p className="text-gray-600 text-sm mt-2">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Custom Sections */}
          {data.customSections?.map(section => (
            <section key={section.id} className="mt-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <ExternalLink size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm whitespace-pre-line text-gray-600 leading-relaxed">
                {section.content}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}