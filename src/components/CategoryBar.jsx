import React from 'react';

export default function CategoryBar({ categories, selectedCategory, onSelectCategory, onSeeAll }) {
  return (
    <div className="bg-white py-3 border-b border-slate-100">
      <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar px-4">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`flex flex-col items-center flex-shrink-0 space-y-1 group focus:outline-none`}
            >
              <div 
                className={`w-14 h-14 rounded-card flex items-center justify-center text-2xl transition-all ${
                  isSelected 
                    ? 'bg-primary text-white shadow-md shadow-blue-500/20 scale-105' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat.icone}
              </div>
              <span className={`text-xs font-medium ${isSelected ? 'text-primary font-bold' : 'text-slate-600'}`}>
                {cat.nom}
              </span>
            </button>
          );
        })}

        {/* Bouton Voir tout */}
        <button
          onClick={onSeeAll}
          className="flex flex-col items-center flex-shrink-0 space-y-1 focus:outline-none"
        >
          <div className="w-14 h-14 rounded-card bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-primary font-bold text-lg">
            ➕
          </div>
          <span className="text-xs font-medium text-slate-600">Voir tout</span>
        </button>
      </div>
    </div>
  );
}

