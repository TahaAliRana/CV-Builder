import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

export default function ModernTemplate({ data }) {
  const { personal, summary, experience, education, skills } = data;

  return (
    <div className="flex min-h-full font-sans">
      {/* Left Sidebar */}
      <aside className="w-1/3 bg-slate-800 text-white p-6">
        {/* Profile Photo */}
        <div className="mb-6">
          {personal.photo ? (
            <img
              src={personal.photo}
              alt={personal.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-600 mx-auto"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-slate-600 mx-auto flex items-center justify-center text-3xl font-bold">
              {personal.name?.charAt(0) || '?'}
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Contact</h3>
          <div className="space-y-3 text-sm">
            {personal.email && (
              <div className="rigid-flex gap-3 text-sm mb-3">
                <div className="icon-container"><Mail size={16} className="text-slate-400" /></div>
                <span className="break-words">{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="rigid-flex gap-3 text-sm mb-3">
                <div className="icon-container"><Phone size={16} className="text-slate-400" /></div>
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="rigid-flex gap-3 text-sm mb-3">
                <div className="icon-container"><MapPin size={16} className="text-slate-400" /></div>
                <span>{personal.location}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="rigid-flex gap-3 text-sm mb-3">
                <div className="icon-container"><Linkedin size={16} className="text-slate-400" /></div>
                <a href={personal.linkedin} className="hover:text-blue-300 break-all">{personal.linkedin}</a>
              </div>
            )}
            {personal.github && (
              <div className="rigid-flex gap-3 text-sm mb-3">
                <div className="icon-container"><Github size={16} className="text-slate-400" /></div>
                <a href={personal.github} className="hover:text-blue-300 break-all">{personal.github}</a>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2 items-center">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="skill-tag px-2 bg-slate-700 rounded text-xs"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-6 bg-white flex flex-col min-h-full">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 break-words leading-tight">
            {personal.name || 'Your Name'}
          </h1>
          <p className="text-xl text-blue-600 mt-1 break-words">{personal.role || 'Job Title'}</p>
        </header>

        {/* Summary */}
        {summary && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-800 border-b-2 border-blue-600 pb-2 mb-4 uppercase tracking-wide">
              Profile
            </h2>
            <p className="text-gray-600 leading-relaxed text-justify break-words">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-800 border-b-2 border-blue-600 pb-2 mb-4">
              Experience
            </h2>
            <div className="space-y-5">
              {experience.map(exp => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-gray-200">
                  <div className="absolute -left-[5px] top-2 w-2 h-2 bg-blue-600 rounded-full"></div>
                  <h3 className="font-bold text-slate-800">{exp.role}</h3>
                  <p className="text-blue-600 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                  <p className="text-gray-600 text-sm whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-slate-800 border-b-2 border-blue-600 pb-2 mb-4">
              Education
            </h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id}>
                  <h3 className="font-bold text-slate-800">{edu.institution}</h3>
                  <p className="text-gray-700">{edu.degree} in {edu.field}</p>
                  <p className="text-sm text-gray-500">Graduated: {edu.endDate}</p>
                  {edu.description && (
                    <p className="text-gray-600 text-sm mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {data.customSections?.map(section => (
          <section key={section.id} className="mt-8">
            <h2 className="text-lg font-bold text-slate-800 border-b-2 border-blue-600 pb-2 mb-4">
              {section.title}
            </h2>
            <p className="text-gray-600 text-sm whitespace-pre-line">{section.content}</p>
          </section>
        ))}
      </main>
    </div>
  );
}