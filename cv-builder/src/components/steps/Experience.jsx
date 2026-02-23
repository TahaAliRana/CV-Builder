import React, { useState } from 'react';
import { Plus, Trash2, Briefcase, Calendar } from 'lucide-react';

export default function Experience({ data, update }) {
  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false,
    };
    update(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (id, field, value) => {
    update(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id) => {
    update(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Work Experience</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Add your relevant work history. Start with your most recent position.
          </p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} /> Add
        </button>
      </div>

      <div className="space-y-6">
        {data.experience.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
            <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 dark:text-gray-400">No work experience added yet.</p>
            <button
              onClick={addExperience}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Add your first experience
            </button>
          </div>
        ) : (
          data.experience.map((exp, index) => (
            <div key={exp.id} className="p-4 border rounded-xl bg-gray-50 dark:bg-gray-700/50 dark:border-gray-600">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold dark:text-white">Experience #{index + 1}</h3>
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 mb-1">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Google Inc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 mb-1">Role</label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Senior Developer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Jan 2020"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 mb-1">End Date</label>
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Present"
                    disabled={exp.current}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm dark:text-gray-300">I currently work here</span>
                </label>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium dark:text-gray-300 mb-1">Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white h-24 resize-none"
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}