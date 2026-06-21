"use client";

import { useEffect, useState } from 'react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export function InquiryModal({ isOpen, onClose, productName }: InquiryModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-canvas/80 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-lg bg-surface border border-border-hairline rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform ${
          isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-border-hairline bg-surface-2/50">
          <h2 className="text-h3 font-semibold text-text-primary tracking-tight">Request Inquiry</h2>
          <button 
            onClick={onClose}
            className="text-text-muted hover:text-text-primary p-1 rounded-md transition-colors focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-small text-text-secondary mb-6">
            You are inquiring about: <span className="font-medium text-text-primary">{productName}</span>. Please fill out the form below.
          </p>
          
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-micro font-medium text-text-muted uppercase tracking-wide">Full Name</label>
              <input type="text" className="bg-base border border-border-hairline rounded-lg px-4 py-2.5 text-small text-text-primary focus:outline-none focus:border-accent" placeholder="John Doe" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-micro font-medium text-text-muted uppercase tracking-wide">Email</label>
              <input type="email" className="bg-base border border-border-hairline rounded-lg px-4 py-2.5 text-small text-text-primary focus:outline-none focus:border-accent" placeholder="john@example.com" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-micro font-medium text-text-muted uppercase tracking-wide">Quantity Needed</label>
              <input type="text" className="bg-base border border-border-hairline rounded-lg px-4 py-2.5 text-small text-text-primary focus:outline-none focus:border-accent" placeholder="e.g. 1x20ft Container" />
            </div>

            <button 
              type="button" 
              onClick={onClose}
              className="mt-4 bg-text-primary text-base hover:opacity-90 font-bold py-3 rounded-lg transition-opacity flex justify-center items-center"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
