import React, { useState } from 'react';
import { Plus, Trash2, Layout, GripVertical } from 'lucide-react';

export default function CustomSections({ data, update }) {
    const [newSectionTitle, setNewSectionTitle] = useState('');

    const addSection = () => {
        if (newSectionTitle.trim()) {
            const newSection = {
                id: Date.now(),
                title: newSectionTitle.trim(),
                content: ''
            };
            update(prev => ({
                ...prev,
                customSections: [...(prev.customSections || []), newSection]
            }));
            setNewSectionTitle('');
        }
    };

    const updateSection = (id, field, value) => {
        update(prev => ({
            ...prev,
            customSections: prev.customSections.map(section =>
                section.id === id ? { ...section, [field]: value } : section
            )
        }));
    };

    const removeSection = (id) => {
        update(prev => ({
            ...prev,
            customSections: prev.customSections.filter(section => section.id !== id)
        }));
    };

    const sections = data.customSections || [];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold dark:text-white">Custom Sections</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Add any additional sections you'd like to include, such as Certifications, Languages, or Projects.
                </p>
            </div>

            {/* Add New Section */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSection()}
                    className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="e.g. Certifications, Languages..."
                />
                <button
                    onClick={addSection}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                    <Plus size={20} /> Add Section
                </button>
            </div>

            <div className="space-y-6">
                {sections.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
                        <Layout className="mx-auto text-gray-400 mb-4" size={48} />
                        <p className="text-gray-500 dark:text-gray-400">No custom sections added yet.</p>
                    </div>
                ) : (
                    sections.map((section, index) => (
                        <div key={section.id} className="p-5 border rounded-xl bg-gray-50 dark:bg-gray-700/50 dark:border-gray-600">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    <GripVertical className="text-gray-400" size={18} />
                                    <h3 className="font-bold text-lg dark:text-white">{section.title}</h3>
                                </div>
                                <button
                                    onClick={() => removeSection(section.id)}
                                    className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <textarea
                                value={section.content}
                                onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white h-32 resize-none"
                                placeholder={`Tell us about your ${section.title.toLowerCase()}...`}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
