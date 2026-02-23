import React from 'react';
import { Plus, Trash2, Globe, Github } from 'lucide-react';

const Projects = ({ data, update }) => {
    const projects = data.projects || [];

    const addProject = () => {
        const newProject = {
            id: Date.now(),
            name: '',
            link: '',
            github: '',
            description: ''
        };
        update(prev => ({ ...prev, projects: [...projects, newProject] }));
    };

    const removeProject = (id) => {
        update(prev => ({
            ...prev,
            projects: projects.filter(p => p.id !== id)
        }));
    };

    const handleChange = (id, field, value) => {
        update(prev => ({
            ...prev,
            projects: projects.map(p => p.id === id ? { ...p, [field]: value } : p)
        }));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold dark:text-white">Projects</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Showcase your best work and personal projects.</p>
                </div>
                <button
                    onClick={addProject}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md whitespace-nowrap"
                >
                    <Plus size={18} /> Add Project
                </button>
            </div>

            <div className="grid gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700 space-y-4 relative group">
                        <button
                            onClick={() => removeProject(project.id)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Project Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. CV Builder Pro"
                                    className="w-full p-2.5 bg-white dark:bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-white"
                                    value={project.name}
                                    onChange={(e) => handleChange(project.id, 'name', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Live Link</label>
                                <div className="relative">
                                    <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="https://..."
                                        className="w-full pl-10 p-2.5 bg-white dark:bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-white"
                                        value={project.link}
                                        onChange={(e) => handleChange(project.id, 'link', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">GitHub Repository</label>
                            <div className="relative">
                                <Github size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="https://github.com/..."
                                    className="w-full pl-10 p-2.5 bg-white dark:bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-white"
                                    value={project.github}
                                    onChange={(e) => handleChange(project.id, 'github', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Description</label>
                            <textarea
                                placeholder="Describe what you built and the technologies used..."
                                className="w-full h-24 p-3 bg-white dark:bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-white resize-none"
                                value={project.description}
                                onChange={(e) => handleChange(project.id, 'description', e.target.value)}
                            />
                        </div>
                    </div>
                ))}

                {projects.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl">
                        <p className="text-gray-500 dark:text-gray-400">No projects added yet. Click 'Add Project' to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;
