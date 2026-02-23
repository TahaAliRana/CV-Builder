import React from 'react';
import { Upload, User, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

export default function PersonalInfo({ data, update }) {
  const { personal } = data;

  const handleChange = (field, value) => {
    update(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold dark:text-white">Personal Information</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Let's start with the basics. This information will appear at the top of your CV.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Profile Photo Upload */}
        <div className="col-span-full flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-400">
            {personal.photo ? (
              <img src={personal.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={32} className="text-gray-400" />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 mb-1">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => handleChange('photo', reader.result);
                  reader.readAsDataURL(file);
                }
              }}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {personal.photo && (
              <button
                onClick={() => handleChange('photo', '')}
                className="mt-2 text-xs text-red-500 hover:text-red-700 font-medium underline block"
              >
                Remove Photo
              </button>
            )}
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={personal.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="John Doe"
            />
          </div>
        </div>

        {/* Job Role */}
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 mb-1">Job Title</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={personal.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Software Engineer"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              value={personal.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="john@example.com"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 mb-1">Phone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="tel"
              value={personal.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 mb-1">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={personal.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="New York, USA"
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 mb-1">LinkedIn URL</label>
          <div className="relative">
            <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="url"
              value={personal.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 mb-1">GitHub URL</label>
          <div className="relative">
            <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="url"
              value={personal.github}
              onChange={(e) => handleChange('github', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="https://github.com/johndoe"
            />
          </div>
        </div>
      </div>
    </div>
  );
}