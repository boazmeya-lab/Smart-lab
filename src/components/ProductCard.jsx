import React, { useState } from 'react';

export default function ProductCard({ item, onClick }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Évite d'ouvrir l'annonce quand on clique sur le cœur
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-card border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer relative"
    >
      {/* Zone Image */}
      <div className="relative aspect-square bg-slate-100 overflow-hidden">
        <img 
          src={item.photo} 
          alt={item.titre} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
        />
        
        {/* Badge Pro ou Particulier */}
        <span 
          className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
            item.est_pro 
              ? 'bg-primary text-white shadow-sm' 
              : 'bg-slate-800/80 text-white backdrop-blur-sm'
          }`}
        >
          {item.est_pro ? 'PRO' : 'Particulier'}
        </span>

        {/* Bouton Favori */}
        <button 
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full text-slate-700 shadow-sm hover:scale-110 active:scale-95 transition-all"
        >
          <span className="text-sm leading-none">{isFavorite ? '❤️' : '🤍'}</span>
        </button>
      </div>

      {/* Détails du produit */}
      <div className="p-3 flex flex-col flex-1 justify-between">
        <div>
          {/* Prix */}
          <p className="text-primary font-black text-base">
            {item.prix.toLocaleString()} {item.devise}
          </p>
          
          {/* Titre */}
          <h3 className="font-medium text-slate-800 text-xs mt-1 line-clamp-2 leading-snug">
            {item.titre}
          </h3>
        </div>

        {/* Méta : Ville & Temps */}
        <div className="mt-3 pt-2 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-400">
          <span className="truncate max-w-[50%] font-medium text-slate-500">📍 {item.ville}</span>
          <span className="flex-shrink-0">{item.temps_publication}</span>
        </div>
      </div>
    </div>
  );
}

