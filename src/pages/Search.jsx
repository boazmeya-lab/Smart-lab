import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { mockAnnonces } from '../data/mockData';

export default function Search({ categories, selectedCategory, onSelectAnnonce }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState(selectedCategory || '');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [condition, setCondition] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Filtrage simple
  const filteredAnnonces = mockAnnonces.filter(item => {
    const matchSearch = item.titre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = !currentCategory || item.categorie.toLowerCase() === currentCategory.toLowerCase();
    return matchSearch && matchCat;
  });

  return (
    <div className="px-4 py-2 space-y-4">
      {/* Barre de saisie de recherche */}
      <div className="flex items-center space-x-2">
        <div className="flex-1 flex items-center bg-white border border-slate-200 rounded-2xl px-3 py-2 shadow-sm">
          <span className="mr-2">🔍</span>
          <input 
            type="text"
            placeholder="Que cherchez-vous ?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-900 focus:outline-none"
          />
        </div>
        <button 
          onClick={() => setShowFilterModal(!showFilterModal)}
          className="p-2.5 bg-primary text-white rounded-2xl shadow-sm text-sm font-bold flex items-center justify-center"
        >
          ⚙️
        </button>
      </div>

      {/* Sélection rapide des catégories */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
        <button 
          onClick={() => setCurrentCategory('')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
            !currentCategory ? 'bg-primary text-white' : 'bg-slate-200 text-slate-700'
          }`}
        >
          Toutes
        </button>
        {categories.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setCurrentCategory(cat.slug)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              currentCategory === cat.slug ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {cat.icone} {cat.nom}
          </button>
        ))}
      </div>

      {/* Modal / Section Filtres */}
      {showFilterModal && (
        <div className="bg-white p-4 rounded-card border border-slate-200 shadow-lg space-y-3">
          <h3 className="font-bold text-sm text-slate-900">Filtres de recherche</h3>
          
          {/* Prix */}
          <div className="grid grid-cols-2 gap-2">
            <input 
              type="number" 
              placeholder="Prix min ($)" 
              value={priceMin} 
              onChange={e => setPriceMin(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
            />
            <input 
              type="number" 
              placeholder="Prix max ($)" 
              value={priceMax} 
              onChange={e => setPriceMax(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
            />
          </div>

          {/* État */}
          <div className="flex space-x-2">
            {['Neuf', 'Occasion'].map(cond => (
              <button 
                key={cond}
                onClick={() => setCondition(condition === cond ? '' : cond)}
                className={`flex-1 py-1.5 text-xs rounded-xl border ${
                  condition === cond ? 'bg-primary text-white border-primary' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                {cond}
              </button>
            ))}
          </div>

          {/* Trier par */}
          <select 
            value={sortBy} 
            onChange={e => setSortBy(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs text-slate-700"
          >
            <option value="recent">Plus récent</option>
            <option value="cheap">Moins cher</option>
            <option value="expensive">Plus cher</option>
          </select>
        </div>
      )}

      {/* Résultats */}
      <div>
        <p className="text-xs font-semibold text-slate-500 mb-2">
          {filteredAnnonces.length} annonce(s) trouvée(s)
        </p>
        <div className="grid grid-cols-2 gap-3">
          {filteredAnnonces.map(item => (
            <ProductCard 
              key={item.id} 
              item={item} 
              onClick={() => onSelectAnnonce(item)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

