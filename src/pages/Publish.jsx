import React, { useState } from 'react';

export default function Publish({ onSuccess }) {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    categorie: '',
    prix: '',
    devise: 'USD',
    estNegociable: false,
    ville: 'Kinshasa',
    adresse: '',
    telephone: '',
    whatsapp: '',
    etat: 'Occasion',
    livraison: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titre || !formData.prix) {
      alert("Veuillez remplir le titre et le prix.");
      return;
    }
    alert("Annonce publiée avec succès sur SmarShop !");
    onSuccess();
  };

  return (
    <div className="px-4 py-2 space-y-4">
      <h1 className="text-lg font-bold text-slate-900">Publier une annonce</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-card border border-slate-100 shadow-sm">
        {/* Upload Photos */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Photos (Jusqu'à 15 photos)
          </label>
          <div className="h-28 border-2 border-dashed border-slate-300 rounded-card flex flex-col items-center justify-center bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
            <span className="text-2xl">📸</span>
            <span className="text-xs text-slate-500 font-medium mt-1">Ajouter des photos</span>
          </div>
        </div>

        {/* Titre */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Titre de l'annonce *</label>
          <input 
            type="text" 
            placeholder="Ex: iPhone 13 Pro Max" 
            value={formData.titre}
            onChange={e => setFormData({...formData, titre: e.target.value})}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-primary"
          />
        </div>

        {/* Catégorie & État */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Catégorie</label>
            <select 
              value={formData.categorie}
              onChange={e => setFormData({...formData, categorie: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
            >
              <option value="">Choisir</option>
              <option value="vehicules">Vehicules</option>
              <option value="telephones">Téléphones</option>
              <option value="immobilier">Immobilier</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">État</label>
            <select 
              value={formData.etat}
              onChange={e => setFormData({...formData, etat: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
            >
              <option value="Occasion">Occasion</option>
              <option value="Neuf">Neuf</option>
            </select>
          </div>
        </div>

        {/* Prix & Devise */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Prix *</label>
          <div className="flex space-x-2">
            <input 
              type="number" 
              placeholder="0.00" 
              value={formData.prix}
              onChange={e => setFormData({...formData, prix: e.target.value})}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-primary"
            />
            <select 
              value={formData.devise}
              onChange={e => setFormData({...formData, devise: e.target.value})}
              className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold"
            >
              <option value="USD">USD ($)</option>
              <option value="CDF">CDF (FC)</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
          <textarea 
            rows="3"
            placeholder="Décrivez votre produit..." 
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-primary"
          ></textarea>
        </div>

        {/* Localisation & WhatsApp */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Ville</label>
            <input 
              type="text" 
              value={formData.ville}
              onChange={e => setFormData({...formData, ville: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Numéro WhatsApp</label>
            <input 
              type="text" 
              placeholder="+243..."
              value={formData.whatsapp}
              onChange={e => setFormData({...formData, whatsapp: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
            />
          </div>
        </div>

        {/* Bouton de soumission */}
        <button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-2xl text-sm shadow-md transition-colors"
        >
          Publier l'annonce
        </button>
      </form>
    </div>
  );
}
