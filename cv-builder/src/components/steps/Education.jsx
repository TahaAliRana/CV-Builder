import React from 'react';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

export default function Education({ data, update }) {
  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    update(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id, field, value) => {
    update(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id) => {
    update(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Education</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Add your educational background, starting with the most recent.
          </p>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} /> Add
        </button>
      </div>

      <div className="space-y-6">
        {data.education.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
            <GraduationCap className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 dark:text-gray-400">No education added yet.</p>
            <button
              onClick={addEducation}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Add your first education
            </button>
          </div>
        ) : (
          data.education.map((edu, index) => (
            <div key={edu.id} className="p-4 border rounded-xl bg-gray-50 dark:bg-gray-700/50 dark:border-gray-600">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold dark:text-white">Education #{index + 1}</h3>
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 mb-1">Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Stanford University"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 mb-1">Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Bachelor of Science"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 mb-1">Field of Study</label>
                  <input
                    type="text"
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Computer Science"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 mb-1">Graduation Year</label>
                  <input
                    type="text"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="2024"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium dark:text-gray-300 mb-1">Description (Optional)</label>
                <textarea
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white h-20 resize-none"
                  placeholder="GPA, honors, relevant coursework..."
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}