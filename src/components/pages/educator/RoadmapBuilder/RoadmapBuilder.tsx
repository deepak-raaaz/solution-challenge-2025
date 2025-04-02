// components/RoadmapBuilder.tsx
import { Header } from './components/Header';
import { ComponentLibrary } from './components/ComponentLibrary';
import { CanvasArea } from './components/CanvasArea';
import { RightSidebar } from './components/RightSidebar';

export const RoadmapBuilder: React.FC = () => {
  return (
    <section id="roadmap-builder" className="page-section p-4 md:p-6 lg:p-8 min-h-screen">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <ComponentLibrary />
        <CanvasArea />
        <RightSidebar />
      </div>
    </section>
  );
};