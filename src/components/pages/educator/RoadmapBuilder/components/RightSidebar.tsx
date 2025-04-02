"use client";

// components/RightSidebar.tsx
import { PropertiesPanel } from './PropertiesPanel';
import { AISuggestions } from './AISuggestions';
import { Collaborators } from './Collaborators';

export const RightSidebar: React.FC = () => {
  return (
    <div className="lg:col-span-1">
      <div className="space-y-6">
        <PropertiesPanel />
        <AISuggestions />
        <Collaborators />
      </div>
    </div>
  );
};