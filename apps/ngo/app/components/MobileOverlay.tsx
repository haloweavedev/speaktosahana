'use client';

import React from 'react';
import { Monitor, Smartphone, ArrowRight } from 'lucide-react';

export function MobileOverlay() {
  return (
    <div className="lg:hidden fixed inset-0 z-[9999] bg-white flex items-center justify-center p-8 text-center">
      <div className="max-w-sm space-y-8 animate-in fade-in zoom-in duration-500 fill-mode-both">
        
        {/* Visual */}
        <div className="relative mx-auto w-32 h-32">
            <div className="absolute inset-0 bg-purple-100/50 rounded-full animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                    <Smartphone className="w-10 h-10 text-slate-400 absolute -left-6 top-1/2 -translate-y-1/2 rotate-[-10deg]" />
                    <ArrowRight className="w-6 h-6 text-purple-400 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                    <Monitor className="w-16 h-16 text-purple-600 absolute -right-6 top-1/2 -translate-y-1/2 rotate-[5deg]" />
                </div>
            </div>
        </div>
        
        {/* Content */}
        <div className="space-y-4">
            <h2 className="text-3xl font-bold font-heading text-slate-900 tracking-tight">
                View on Desktop
            </h2>
            <p className="text-base text-slate-600 font-sans leading-relaxed">
                The Purple Pages experience is designed for larger screens to help you visualize and explore NGO data effectively.
            </p>
        </div>

        {/* Action/Badge */}
        <div className="pt-2">
             <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-semibold shadow-lg shadow-purple-900/10">
                <Monitor className="w-4 h-4" />
                Open on your computer
             </span>
        </div>
      </div>
    </div>
  );
}
