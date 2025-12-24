import { Suspense } from 'react';
import { SplitViewConsole } from './components/purple-pages/SplitViewConsole';

export default function Page() {
  return (
    <main className="min-h-screen w-full bg-gray-50">
      <Suspense fallback={<div>Loading...</div>}>
        <SplitViewConsole />
      </Suspense>
    </main>
  );
}
