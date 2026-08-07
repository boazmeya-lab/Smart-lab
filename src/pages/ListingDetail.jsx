import React, { useState } from 'react';

export default function ListingDetail({ item, onBack }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-white min-h-screen pb-24 relative">
      {/* Barre supérieure d'action (Retour, Partager, Favori) */}
      <div className="fixed top-0 left-0 right-0 max-w-md mx-auto z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent text-white">
        <button 
          onClick={onBack}
          className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors"
        >
          ⬅️
        </button>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => alert("Lien copié dans le presse-papier !")}
            className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors"
          >
            🔗
          </button>
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors"
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </div>

      {/* Image / Carrousel */}
      <div className="relative aspect-square w-full bg-slate-100">
        <img 
          src={item.photo} 
          alt={item.titre} 
          className="w-full h-full object-cover"
        />
        {item.est_pro && (
          <span className="absolute bottom-3 left-4 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md uppercase">
            Vendeur PRO
          </span>
        )}
      </div>

      {/* Informations produit */}
      <div className="p-4 space-y-4">
        {/* En-tête : Prix et Titre */}
        <div>
          <p className="text-2xl font-black text-primary">
            {item.prix.toLocaleString()} {item.devise}
          </p>
          <h1 className="text-lg font-bold text-slate-900 mt-1 leading-snug">
            {item.titre}
          </h1>
          <div className="flex items-center space-x-3 mt-2 text-xs text-slate-500">
            <span>📍 {item.ville}</span>
            <span>•</span>
            <span>🕒 {item.temps_publication}</span>
            <span>•</span>
            <span className="font-semibold text-slate-700">État: {item.etat || 'Occasion'}</span>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Profil Vendeur */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
              👤
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-bold text-slate-900 text-sm">SmarShop Seller</span>
                <span className="text-xs">✅</span>
              </div>
              <p className="text-xs text-amber-500 font-medium">⭐⭐⭐⭐⭐ (4.9/5)</p>
            </div>
          </div>
          <button className="text-xs font-bold text-primary bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
            Voir profil
          </button>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <h2 className="text-sm font-bold text-slate-900">Description</h2>
          <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
            {item.description || "Article en excellent état, disponible immédiatement. Possibilité de discuter légèrement du prix selon les modalités de paiement et de livraison."}
          </p>
        </div>

        {/* Localisation */}
        <div className="space-y-2 pt-2">
          <h2 className="text-sm font-bold text-slate-900">Localisation</h2>
          <div className="h-28 bg-slate-100 rounded-card flex items-center justify-center text-xs text-slate-500 border border-slate-200">
            📍 Carte interactive ({item.ville})
          </div>
        </div>

        {/* Bouton Signaler */}
        <div className="text-center pt-2">
          <button 
            onClick={() => alert("Annonce signalée à l'équipe de modération.")}
            className="text-xs text-red-500 hover:underline font-medium"
          >
            🚩 Signaler cette annonce
          </button>
        </div>
      </div>

      {/* Barre d'action fixe en bas (Contact) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 p-3 flex items-center space-x-2 z-40">
        <button 
          onClick={() => window.open(`https://wa.me/243000000000`, '_blank')}
          className="flex-1 bg-secondary hover:bg-secondary-hover text-white py-3 rounded-2xl font-bold text-xs flex items-center justify-center space-x-1 shadow-sm"
        >
          <span>💬</span>
          <span>WhatsApp</span>
        </button>
        <button 
          onClick={() => window.location.href = 'tel:+243000000000'}
          className="flex-1 bg-primary hover:bg-primary-hover text-white py-3 rounded-2xl font-bold text-xs flex items-center justify-center space-x-1 shadow-sm"
        >
          <span>📞</span>
          <span>Appeler</span>
        </button>
      </div>
    </div>
  );
          }
              
