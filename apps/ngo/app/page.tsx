import { Metadata } from "next";
import { Suspense } from 'react';
import { SplitViewConsole } from './components/purple-pages/SplitViewConsole';

export const metadata: Metadata = {
  title: "Discover 1,300+ Disability NGOs in Bengaluru",
  description:
    "Search the PurplePages directory of 1,300+ disability and social sector organizations in Bengaluru. Filter by sector, explore grassroots NGOs, and find services near you.",
  keywords: [
    "NGO directory",
    "disability NGOs Bengaluru",
    "search NGOs India",
    "social sector organizations",
    "grassroots NGOs Bengaluru",
    "purple pages directory",
  ],
};

export default function Page() {
  return (
    <main className="min-h-screen w-full bg-gray-50">
      <Suspense fallback={<div>Loading...</div>}>
        <SplitViewConsole />
      </Suspense>
    </main>
  );
}
