import React from 'react';
import CategoryBar from '../components/CategoryBar';
import ProductCard from '../components/ProductCard';

export default function Home({ 
  categories, 
  annonces, 
  selectedCategory, 
  onSelectCategory, 
  onSelectAnnonce,
  onSeeAllCategories
}) {
  // Filtrage fictif des sections
  const annoncesBoostees = annonces.filter(a => a.est_booste);
  const annoncesRecentes = annonces;

  return (
    <div className="space-y-4">
      {/* Bar des catégories */}
      <CategoryBar 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={onSelectCategory}
        onSeeAll={onSeeAllCategories}
      />

      <div className="px-4 space-y-6">
        {/* Section 🔥 Annonces à la une */}
        {annoncesBoostees.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-1">
                <span>🔥</span> Annonces à la une
              </h2>
              <span className="text-xs font-semibold text-accent bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Sponsorisé
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {annoncesBoostees.map(item => (
                <ProductCard 
                  key={`une-${item.id}`} 
                  item={item} 
                  onClick={() => onSelectAnnonce(item)} 
                />
              ))}
            </div>
          </section>
        )}

        {/* Section ⭐ Recommandées pour vous */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-1">
            <span>⭐</span> Recommandées pour vous
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            {annonces.slice(0, 2).map(item => (
              <ProductCard 
                key={`recom-${item.id}`} 
                item={item} 
                onClick={() => onSelectAnnonce(item)} 
              />
            ))}
          </div>
        </section>

        {/* Section 🕒 Annonces récentes */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-1">
            <span>🕒</span> Annonces récentes
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {annoncesRecentes.map(item => (
              <ProductCard 
                key={`recent-${item.id}`} 
                item={item} 
                onClick={() => onSelectAnnonce(item)} 
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

