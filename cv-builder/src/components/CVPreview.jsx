import React from 'react';
import { Eye, Download, Share2 } from 'lucide-react';

export default function CVPreview({ data, template: Template }) {
  return (
    <div className="bg-white shadow-2xl w-full max-w-[210mm] min-h-[297mm] mx-auto print:shadow-none">
      <Template data={data} />
    </div>
  );
}