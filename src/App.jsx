import { useState } from 'react';
import useLenis from './hooks/useLenis';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IngredientsSection from './components/IngredientsSection';
import ProcessSection from './components/ProcessSection';
import DecorationSection from './components/DecorationSection';
import SignatureCakes from './components/SignatureCakes';
import GallerySection from './components/GallerySection';
import SweetEnding from './components/SweetEnding';

export default function App() {
  const [ready, setReady] = useState(false);
  useLenis();

  return (
    <div className="grain relative">
      <Loader onDone={() => setReady(true)} />
      <CustomCursor />
      {ready && <ScrollProgress />}
      {ready && <Navbar />}
      <main>
        <Hero />
        <IngredientsSection />
        <ProcessSection />
        <DecorationSection />
        <SignatureCakes />
        <GallerySection />
        <SweetEnding />
      </main>
    </div>
  );
}
