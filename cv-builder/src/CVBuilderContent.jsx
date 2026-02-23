import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Download, Printer, Save, ChevronRight, ChevronLeft } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { CVDocument } from './components/CVDocument';

// Import Steps
import PersonalInfo from './components/steps/PersonalInfo';
import Experience from './components/steps/Experience';
import Education from './components/steps/Education';
import Skills from './components/steps/Skills';
import Projects from './components/steps/Projects';
import CustomSections from './components/steps/CustomSections';
import SectionManager from './components/steps/SectionManager';

// Import UI
import { ProgressBar, SectionSlider, useToast } from './components/ui';

// Import Templates
import MinimalTemplate from './templates/MinimalTemplate';
import ModernTemplate from './templates/ModernTemplate';
import CreativeTemplate from './templates/CreativeTemplate';

const INITIAL_STEPS = [
    { id: 'layout', title: 'Arrange' },
    { id: 'personal', title: 'Personal' },
    { id: 'summary', title: 'Summary' },
    { id: 'projects', title: 'Projects' },
    { id: 'experience', title: 'Experience' },
    { id: 'education', title: 'Education' },
    { id: 'skills', title: 'Skills' },
    { id: 'custom', title: 'Custom' },
];

const TEMPLATES = {
    minimal: MinimalTemplate,
    modern: ModernTemplate,
    creative: CreativeTemplate,
};

function CVBuilderContent() {
    const { addToast } = useToast();
    const [darkMode, setDarkMode] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    // Apply dark mode to entire document
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);
    const [steps, setSteps] = useState(INITIAL_STEPS);
    const [selectedTemplate, setSelectedTemplate] = useState('modern');
    const [isExporting, setIsExporting] = useState(false);
    const cvRef = useRef(null);

    const [cvData, setCvData] = useState({
        personal: { name: '', email: '', phone: '', linkedin: '', github: '', role: '', photo: '' },
        summary: '',
        projects: [],
        experience: [],
        education: [],
        skills: [],
        customSections: [],
    });

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('cvData');
        const savedSteps = localStorage.getItem('cvSteps');
        if (saved) {
            try {
                setCvData(JSON.parse(saved));
                if (savedSteps) setSteps(JSON.parse(savedSteps));
                addToast('CV loaded from saved data', 'success');
            } catch (e) {
                console.error('Failed to load CV', e);
            }
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('cvData', JSON.stringify(cvData));
        localStorage.setItem('cvSteps', JSON.stringify(steps));
    }, [cvData, steps]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const handleClearData = () => {
        if (window.confirm('Are you sure you want to clear all data?')) {
            setCvData({
                personal: { name: '', email: '', phone: '', linkedin: '', github: '', role: '', photo: '' },
                summary: '',
                projects: [],
                experience: [],
                education: [],
                skills: [],
                customSections: [],
            });
            setCurrentStep(0);
            localStorage.removeItem('cvData');
            addToast('All data cleared', 'info');
        }
    };

    // ---------- PRO-LEVEL PDF DOWNLOAD WITH @REACT-PDF/RENDERER ----------
    const handleDownloadPDF = async () => {
        setIsExporting(true);
        addToast('Designing pixel-perfect PDF document...', 'info');

        try {
            // Wait a tiny bit to ensure state is caught up
            await new Promise(resolve => setTimeout(resolve, 500));

            const doc = <CVDocument data={cvData} template={selectedTemplate} />;
            const blob = await pdf(doc).toBlob();

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${cvData.personal.name.replace(/\s+/g, '_') || 'Resume'}_CV_Pro_Fixed.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            addToast('Download complete!', 'success');
        } catch (err) {
            console.error('PDF Generation Error:', err);
            addToast('PDF generation failed. Checking data...', 'error');
        } finally {
            setIsExporting(false);
        }
    };

    const handlePrint = () => window.print();

    const renderStep = () => {
        const stepId = steps[currentStep]?.id;
        switch (stepId) {
            case 'layout': return <SectionManager steps={steps} setSteps={setSteps} currentStep={currentStep} setCurrentStep={setCurrentStep} />;
            case 'personal': return <PersonalInfo data={cvData} update={setCvData} />;
            case 'summary': return <SummaryStep data={cvData} update={setCvData} />;
            case 'projects': return <Projects data={cvData} update={setCvData} />;
            case 'experience': return <Experience data={cvData} update={setCvData} />;
            case 'education': return <Education data={cvData} update={setCvData} />;
            case 'skills': return <Skills data={cvData} update={setCvData} />;
            case 'custom': return <CustomSections data={cvData} update={setCvData} />;
            default: return null;
        }
    };

    const SelectedTemplateComponent = TEMPLATES[selectedTemplate];

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex flex-wrap justify-between items-center sticky top-0 z-50 gap-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        CV Builder Pro
                    </h1>
                    <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                        v2.1 PDF Engine
                    </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button onClick={handleClearData} title="Clear all data" className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <Save size={20} />
                    </button>

                    <button onClick={toggleDarkMode} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button onClick={handlePrint} className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        <Printer size={18} /> Print
                    </button>

                    <button onClick={handleDownloadPDF} disabled={isExporting} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
                        {isExporting ? <span className="animate-pulse">Generating...</span> : <><Download size={18} /> Export PDF</>}
                    </button>
                </div>
            </header>

            <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Left Panel */}
                <div className="w-full lg:w-1/2 flex flex-col bg-gray-50 dark:bg-gray-900 h-[calc(100vh-64px)] overflow-hidden border-r dark:border-gray-800">
                    {/* Fixed Top Navigation (Slider) */}
                    <div className="p-4 md:px-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border-b dark:border-gray-700 z-30">
                        <div className="max-w-3xl mx-auto">
                            <SectionSlider
                                currentStep={currentStep}
                                steps={steps}
                                onStepClick={setCurrentStep}
                            />
                        </div>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6 no-scrollbar scroll-smooth">
                        <div className="max-w-3xl mx-auto pb-6">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 min-h-[400px]">
                                {renderStep()}
                            </div>
                        </div>

                        {/* Sticky Bottom Navigation */}
                        <div className="sticky bottom-0 mt-6 py-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 shadow-lg dark:shadow-2xl z-20">
                            <div className="flex justify-between items-center gap-4">
                                <button
                                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                                    disabled={currentStep === 0}
                                    className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition dark:text-gray-300 text-gray-700 font-medium flex-1"
                                >
                                    <ChevronLeft size={20} /> Back
                                </button>

                                {currentStep < steps.length - 1 ? (
                                    <button
                                        onClick={() => setCurrentStep(currentStep + 1)}
                                        className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium shadow-md flex-1"
                                    >
                                        Next <ChevronRight size={20} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setCurrentStep(currentStep + 1)}
                                        className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-medium shadow-md flex-1"
                                    >
                                        Finish <ChevronRight size={20} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-full lg:w-1/2 bg-gray-200 dark:bg-gray-950 p-4 md:p-8 overflow-y-auto flex flex-col items-center custom-preview-panel">
                    <div className="mb-6 flex flex-wrap gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow sticky top-0 z-10">
                        {Object.keys(TEMPLATES).map(tmpl => (
                            <button
                                key={tmpl}
                                onClick={() => setSelectedTemplate(tmpl)}
                                className={`px-4 py-2 rounded-md capitalize text-sm font-medium transition-colors ${selectedTemplate === tmpl
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {tmpl}
                            </button>
                        ))}
                    </div>

                    <div className="preview-container w-full flex justify-center py-4">
                        <div className="bg-white shadow-2xl print:shadow-none" style={{ width: '794px', minHeight: '1123px' }}>
                            <div ref={cvRef} className="print-container">
                                <SelectedTemplateComponent data={cvData} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Summary Step
function SummaryStep({ data, update }) {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold dark:text-white">Professional Summary</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
                Write a brief overview of your career and key achievements.
            </p>
            <textarea
                className="w-full h-48 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none text-base leading-relaxed"
                placeholder="e.g. Senior Software Developer with 5+ years of experience..."
                value={data.summary || ''}
                onChange={e => update(prev => ({ ...prev, summary: e.target.value }))}
            />
            <div className="flex justify-end text-sm text-gray-500">{data.summary?.length || 0} characters</div>
        </div>
    );
}

export default CVBuilderContent;