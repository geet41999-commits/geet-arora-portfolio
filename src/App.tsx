import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { SelectedWorkSection } from './components/SelectedWorkSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { BookingModal } from './components/BookingModal';
import { Project } from './types';

export default function App() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenInquiry = () => {
    setIsInquiryOpen(true);
  };

  const handleCloseInquiry = () => {
    setIsInquiryOpen(false);
  };

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-[#F5F4F0] selection:bg-brand-accent selection:text-brand-bg relative bg-grain">
      {/* Top Header Navigation */}
      <Navigation onOpenInquiry={handleOpenInquiry} />

      {/* Main Content Sections */}
      <main>
        <HeroSection onOpenInquiry={handleOpenInquiry} />
        <SelectedWorkSection onSelectProject={handleSelectProject} />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <ContactSection
          onOpenInquiry={handleOpenInquiry}
          onOpenBooking={handleOpenBooking}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Dialog Modals */}
      <ProjectInquiryModal
        isOpen={isInquiryOpen}
        onClose={handleCloseInquiry}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={handleCloseProjectModal}
        onOpenInquiry={() => {
          handleCloseProjectModal();
          handleOpenInquiry();
        }}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
      />
    </div>
  );
}
