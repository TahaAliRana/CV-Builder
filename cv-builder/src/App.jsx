import React from 'react';
import CVBuilderContent from './CVBuilderContent';
import { ToastProvider } from './components/ui/Toast';

/**
 * App Entry Point
 * 
 * We use ToastProvider to wrap the entire CVBuilderContent
 * to allow toasty notifications across the app.
 */
export default function App() {
  return (
    <ToastProvider>
      <CVBuilderContent />
    </ToastProvider>
  );
}