import { Metadata } from 'next';
import './visualize.css';

export const metadata: Metadata = {
  title: 'Intelligence Dashboard',
  description:
    'Real-time intelligence and analytics for the social sector ecosystem. Explore data on 1,300+ disability NGOs in Bengaluru.',
  keywords: [
    'NGO analytics',
    'social sector data',
    'disability services data Bengaluru',
    'NGO intelligence dashboard',
    'social sector analytics India',
  ],
  openGraph: {
    title: 'Intelligence Dashboard | PurplePages',
    description:
      'Real-time intelligence and analytics for the social sector ecosystem.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intelligence Dashboard | PurplePages',
    description:
      'Real-time intelligence and analytics for the social sector ecosystem.',
  },
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
