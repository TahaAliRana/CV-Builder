import React from 'react';
import { GripVertical, MoveUp, MoveDown, Check, LayoutPanelLeft } from 'lucide-react';

const SectionManager = ({ steps, setSteps, currentStep, setCurrentStep }) => {
    const moveStep = (index, direction) => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === steps.length - 1) return;

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        const newSteps = [...steps];
        const [movedStep] = newSteps.splice(index, 1);
        newSteps.splice(newIndex, 0, movedStep);

        setSteps(newSteps);

        // Adjust current step if it was moved
        if (currentStep === index) {
            setCurrentStep(newIndex);
        } else if (currentStep === newIndex) {
            setCurrentStep(index);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl">
                    <LayoutPanelLeft size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold dark:text-white">Arrange Sections</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Drag or use arrows to change the order of your CV sections.</p>
                </div>
            </div>

            <div className="space-y-3">
                {steps.filter(s => s.id !== 'layout').map((step, index) => (
                    <div
                        key={step.id}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 ${step.id === 'personal'
                            ? 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30 opacity-75'
                            : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 shadow-sm'
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="text-gray-400">
                                <GripVertical size={20} />
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs font-bold text-gray-500">
                                    {index + 1}
                                </span>
                                <p className="font-bold text-gray-700 dark:text-gray-200">{step.title}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {step.id !== 'personal' && (
                                <>
                                    <button
                                        onClick={() => moveStep(steps.findIndex(s => s.id === step.id), 'up')}
                                        disabled={index === 0 || steps[steps.findIndex(s => s.id === step.id) - 1]?.id === 'personal'}
                                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 disabled:opacity-30 transition-colors"
                                        title="Move Up"
                                    >
                                        <MoveUp size={18} />
                                    </button>
                                    <button
                                        onClick={() => moveStep(steps.findIndex(s => s.id === step.id), 'down')}
                                        disabled={steps.findIndex(s => s.id === step.id) === steps.length - 1}
                                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 disabled:opacity-30 transition-colors"
                                        title="Move Down"
                                    >
                                        <MoveDown size={18} />
                                    </button>
                                </>
                            )}
                            {step.id === 'personal' && (
                                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest px-2 py-1 bg-blue-100 dark:bg-blue-900/40 rounded-md">
                                    Fixed Top
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 rounded-xl flex gap-3 text-orange-700 dark:text-orange-300 text-sm">
                <Check size={20} className="flex-shrink-0" />
                <p>The order you set here will be reflected in both the editor and the final generated PDF.</p>
            </div>
        </div>
    );
};

export default SectionManager;
