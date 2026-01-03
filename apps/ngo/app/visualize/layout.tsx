import { Metadata } from 'next';
import './visualize.css';

export const metadata: Metadata = {
  title: 'Intelligence Dashboard | PurplePages',
  description: 'Real-time intelligence and analytics for the social sector ecosystem',
};

export default function VisualizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="visualize-theme min-h-screen bg-white text-slate-900">
      {children}
    </div>
  );
}
