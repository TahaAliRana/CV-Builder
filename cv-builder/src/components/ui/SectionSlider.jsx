import React from 'react';
import {
    User,
    FileText,
    Briefcase,
    GraduationCap,
    Wrench,
    Layout,
    CheckCircle2,
    Code,
    LayoutPanelLeft
} from 'lucide-react';

const sectionIcons = {
    layout: LayoutPanelLeft,
    personal: User,
    summary: FileText,
    projects: Code,
    experience: Briefcase,
    education: GraduationCap,
    skills: Wrench,
    custom: Layout
};

const SectionSlider = ({ steps, currentStep, onStepClick }) => {
    return (
        <div className="w-full relative">
            <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth px-1">
                {steps.map((step, index) => {
                    const Icon = sectionIcons[step.id] || Layout;
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <button
                            key={step.id}
                            onClick={() => onStepClick(index)}
                            className={`flex-shrink-0 flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 border-2 relative overflow-hidden group ${isActive
                                ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200 dark:shadow-blue-900/40 scale-105 z-10'
                                : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg'
                                }`}
                        >
                            {/* Subtle background glow for active step */}
                            {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                            )}

                            {/* Icon Container */}
                            <div className={`p-2.5 rounded-xl transition-all duration-300 ${isActive
                                ? 'bg-white/20 text-white rotate-3'
                                : isCompleted
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 group-hover:-rotate-3'
                                }`}>
                                {isCompleted && !isActive ? <CheckCircle2 size={20} /> : <Icon size={20} />}
                            </div>

                            {/* Text Info */}
                            <div className="text-left relative z-10">
                                <p className={`text-[10px] uppercase tracking-widest font-black mb-0.5 transition-colors ${isActive ? 'text-blue-100' : 'text-gray-400 group-hover:text-blue-400'
                                    }`}>
                                    {isCompleted && !isActive ? 'Completed' : `Section ${index + 1}`}
                                </p>
                                <p className="font-bold text-sm whitespace-nowrap">
                                    {step.title}
                                </p>
                            </div>

                            {/* Status indicator for completed steps when not active */}
                            {!isActive && isCompleted && (
                                <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            )}

                            {/* Active Step Indicator Line */}
                            {isActive && (
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full"></div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Fade effects for indicating more content */}
            <div className="absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent pointer-events-none opacity-0 lg:opacity-100 transition-opacity"></div>
            <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent pointer-events-none opacity-0 lg:opacity-100 transition-opacity"></div>
        </div>
    );
};

export default SectionSlider;
