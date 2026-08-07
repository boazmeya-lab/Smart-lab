import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Search from './pages/Search';
import Publish from './pages/Publish';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import ListingDetail from './pages/ListingDetail';
import { mockCategories, mockAnnonces } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCity, setSelectedCity] = useState('Kinshasa');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);

  // Gestion de la sélection d'une ville
  const handleCityClick = () => {
    const cities = ['Kinshasa', 'Lubumbashi', 'Goma', 'Matadi'];
    const nextIndex = (cities.indexOf(selectedCity) + 1) % cities.length;
    setSelectedCity(cities[nextIndex]);
  };

  // Rendu conditionnel des écrans
  const renderScreen = () => {
    // Si une annonce est sélectionnée, on affiche sa fiche détaillée
    if (selectedAnnonce) {
      return (
        <ListingDetail 
          item={selectedAnnonce} 
          onBack={() => setSelectedAnnonce(null)} 
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <Home
            categories={mockCategories}
            annonces={mockAnnonces}
            selectedCategory={selectedCategory}
            onSelectCategory={(slug) => {
              setSelectedCategory(slug);
              setActiveTab('search');
            }}
            onSelectAnnonce={(item) => setSelectedAnnonce(item)}
            onSeeAllCategories={() => setActiveTab('search')}
          />
        );
      case 'search':
        return (
          <Search 
            categories={mockCategories} 
            selectedCategory={selectedCategory}
            onSelectAnnonce={(item) => setSelectedAnnonce(item)} 
          />
        );
      case 'publish':
        return <Publish onSuccess={() => setActiveTab('home')} />;
      case 'messages':
        return <Messages />;
      case 'profile':
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 max-w-md mx-auto relative shadow-xl">
      {/* L'en-tête est masqué sur la fiche détail pour laisser place à la photo */}
      {!selectedAnnonce && (
        <Header 
          selectedCity={selectedCity}
          onCityClick={handleCityClick}
          onNotificationClick={() => alert("Aucune nouvelle notification")}
          onSearchClick={() => {
            setSelectedCategory(null);
            setActiveTab('search');
          }}
        />
      )}

      {/* Contenu de la page courante */}
      <main className="pt-2">
        {renderScreen()}
      </main>

      {/* Barre de navigation fixe en bas */}
      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setSelectedAnnonce(null); // Réinitialise le détail lors du changement d'onglet
          setActiveTab(tab);
        }} 
      />
    </div>
  );
}

