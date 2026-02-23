import React, { useState } from 'react';
import { Plus, Trash2, Star, Zap } from 'lucide-react';

const skillCategories = {
  technical: ['JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'SQL', 'MongoDB', 'GraphQL'],
  soft: ['Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Time Management', 'Adaptability'],
  tools: ['Git', 'VS Code', 'Jira', 'Figma', 'Postman', 'Jenkins', 'Kubernetes']
};

export default function Skills({ data, update }) {
  const [newSkill, setNewSkill] = useState('');
  const [category, setCategory] = useState('technical');

  const addSkill = () => {
    if (newSkill.trim() && !data.skills.includes(newSkill.trim())) {
      update(prev => ({
        ...prev,
        skills: [...prev.skills, { name: newSkill.trim(), category }]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillName) => {
    update(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.name !== skillName)
    }));
  };

  const addSuggestedSkill = (skill) => {
    if (!data.skills.find(s => s.name === skill)) {
      update(prev => ({
        ...prev,
        skills: [...prev.skills, { name: skill, category: 'technical' }]
      }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const getSkillsByCategory = (cat) => data.skills.filter(s => s.category === cat);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold dark:text-white">Skills</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Add your key skills. You can type manually or choose from suggestions.
        </p>
      </div>

      {/* Add New Skill */}
      <div className="flex gap-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="technical">Technical</option>
          <option value="soft">Soft Skills</option>
          <option value="tools">Tools</option>
        </select>
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Type a skill and press Enter..."
        />
        <button
          onClick={addSkill}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Skill Suggestions */}
      <div>
        <h3 className="text-sm font-medium dark:text-gray-300 mb-2">Suggested Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skillCategories[category].filter(s => !data.skills.find(ds => ds.name === s)).map(skill => (
            <button
              key={skill}
              onClick={() => addSuggestedSkill(skill)}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900 transition"
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Added Skills Display */}
      <div className="space-y-4">
        {['technical', 'soft', 'tools'].map(cat => {
          const catSkills = getSkillsByCategory(cat);
          if (catSkills.length === 0) return null;
          
          return (
            <div key={cat}>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">
                {cat} Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {catSkills.map((skill, idx) => (
                  <span
                    key={`${skill.name}-${idx}`}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                  >
                    {skill.name}
                    <button
                      onClick={() => removeSkill(skill.name)}
                      className="hover:text-blue-900 dark:hover:text-blue-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {data.skills.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Zap className="mx-auto mb-2" size={32} />
          <p>No skills added yet. Start typing above!</p>
        </div>
      )}
    </div>
  );
}