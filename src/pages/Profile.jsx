import React from 'react';

export default function Profile() {
  return (
    <div className="px-4 py-2 space-y-4">
      {/* Carte Utilisateur */}
      <div className="bg-white p-4 rounded-card border border-slate-100 shadow-sm flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl shadow-md">
          👤
        </div>
        <div>
          <div className="flex items-center space-x-1">
            <h2 className="font-bold text-base text-slate-900">Utilisateur SmarShop</h2>
            <span className="text-xs">✅</span>
          </div>
          <p className="text-xs text-amber-500 font-medium">⭐⭐⭐⭐⭐ (5.0)</p>
          <p className="text-[11px] text-slate-400 mt-0.5">3 Annonces actives</p>
        </div>
      </div>

      {/* Widget Portefeuille */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-card text-white shadow-md space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs opacity-80">Solde Portefeuille</span>
          <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">Mobile Money</span>
        </div>
        <p className="text-2xl font-black">50.00 $</p>
        <div className="flex space-x-2 pt-1">
          <button 
            onClick={() => alert("Option de rechargement via M-Pesa / Airtel Money / Visa")}
            className="flex-1 bg-white text-primary font-bold py-2 rounded-xl text-xs shadow-sm hover:bg-slate-100"
          >
            Recharger
          </button>
          <button 
            onClick={() => alert("Option de retrait")}
            className="flex-1 bg-white/20 text-white font-bold py-2 rounded-xl text-xs hover:bg-white/30"
          >
            Retirer
          </button>
        </div>
      </div>

      {/* Raccourcis principaux */}
      <div className="grid grid-cols-2 gap-2">
        <button className="bg-white p-3 rounded-card border border-slate-100 shadow-sm text-left font-bold text-xs text-slate-800 flex items-center space-x-2">
          <span>📦</span>
          <span>Mes annonces</span>
        </button>
        <button className="bg-white p-3 rounded-card border border-slate-100 shadow-sm text-left font-bold text-xs text-slate-800 flex items-center space-x-2">
          <span>❤️</span>
          <span>Mes Favoris</span>
        </button>
      </div>

      {/* Paramètres & Sécurité */}
      <div className="bg-white rounded-card border border-slate-100 shadow-sm overflow-hidden text-xs">
        <div className="p-3 font-bold text-slate-900 border-b border-slate-100 bg-slate-50">
          ⚙️ Paramètres
        </div>
        <div className="divide-y divide-slate-100">
          <div className="p-3 flex justify-between items-center cursor-pointer hover:bg-slate-50">
            <span>Modifier le profil</span>
            <span className="text-slate-400">➡️</span>
          </div>
          <div className="p-3 flex justify-between items-center cursor-pointer hover:bg-slate-50">
            <span>Vérification d'identité</span>
            <span className="text-primary font-bold">Vérifié</span>
          </div>
          <div className="p-3 flex justify-between items-center cursor-pointer hover:bg-slate-50">
            <span>Devise principale</span>
            <span className="text-slate-500 font-bold">USD ($)</span>
          </div>
          <div className="p-3 flex justify-between items-center cursor-pointer hover:bg-slate-50 text-red-500 font-bold">
            <span>Déconnexion</span>
            <span>🚪</span>
          </div>
        </div>
      </div>
    </div>
  );
}

