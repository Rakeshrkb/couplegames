'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { InteractivePlayground } from '@/components/InteractivePlayground';
import { GameCatalog } from '@/components/GameCatalog';
import { HotFantasiesCallout } from '@/components/HotFantasiesCallout';
import { GameModal } from '@/components/GameModal';
import { GameMenuDrawer } from '@/components/GameMenuDrawer';
import { FeaturesSection } from '@/components/FeaturesSection';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';
import { GameItem } from '@/types/game';

export default function HomePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleSelectGame = (game: GameItem) => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      {/* Sticky Header */}
      <Navbar onOpenGamesDrawer={handleOpenDrawer} />

      {/* Main Page Content */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <HeroSection onExploreClick={handleOpenDrawer} />

        {/* Featured Interactive Teaser Playground */}
        <InteractivePlayground />

        {/* Categorized Game Catalog */}
        <GameCatalog onSelectGame={handleSelectGame} />

        {/* Special 18+ Category Banner: Hot Fantasies */}
        <HotFantasiesCallout />

        {/* Why Couples Love Us */}
        <FeaturesSection />

        {/* FAQ Section */}
        <FAQSection />

      </main>

      {/* Romantic Footer */}
      <Footer onOpenGamesDrawer={handleOpenDrawer} />

      {/* Game Details Popup Modal */}
      <GameModal 
        game={selectedGame} 
        onClose={handleCloseModal} 
      />

      {/* Full Catalog Menu Slide-over Drawer */}
      <GameMenuDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onSelectGame={handleSelectGame}
      />

    </div>
  );
}
