import React from 'react';

export default function Header({ selectedCity = "Kinshasa", onCityClick, onNotificationClick, onSearchClick }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm px-4 pt-3 pb-3">
      {/* Ligne supérieure : Logo + Sélecteur de ville + Cloche Notifications */}
      <div className="flex items-center justify-between mb-3">
        {/* Logo */}
        <div className="flex items-center space-x-1">
          <span className="text-2xl font-black tracking-tight text-primary">Smar<span className="text-accent">Shop</span></span>
        </div>

        {/* Action droite : Ville & Notifications */}
        <div className="flex items-center space-x-2">
          {/* Bouton choix de ville */}
          <button 
            onClick={onCityClick}
            className="flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-colors"
          >
            <span>📍</span>
            <span className="max-w-[90px] truncate">{selectedCity}</span>
          </button>

          {/* Bouton notifications */}
          <button 
            onClick={onNotificationClick}
            className="relative p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors"
          >
            <span className="text-base leading-none">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Barre de recherche (Cliquer redirige/ouvre la recherche) */}
      <div 
        onClick={onSearchClick}
        className="flex items-center bg-slate-100 hover:bg-slate-200/80 px-3.5 py-2.5 rounded-2xl cursor-pointer text-slate-400 text-sm transition-colors"
      >
        <span className="mr-2 text-base">🔍</span>
        <span className="flex-1 truncate">Rechercher une auto, un téléphone, une maison...</span>
      </div>
    </header>
  );
}

