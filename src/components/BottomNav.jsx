import React from 'react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', label: 'Accueil', icon: '🏠' },
    { id: 'search', label: 'Rechercher', icon: '🔍' },
    { id: 'publish', label: 'Publier', icon: '➕', isSpecial: true },
    { id: 'messages', label: 'Messages', icon: '💬' },
    { id: 'profile', label: 'Compte', icon: '👤' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-3 py-1.5 flex justify-around items-end z-50 shadow-lg">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        if (tab.isSpecial) {
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center -mt-6 focus:outline-none"
            >
              <div className="bg-primary hover:bg-primary-hover text-white p-3.5 rounded-full shadow-lg transition-transform active:scale-95 flex items-center justify-center">
                <span className="text-xl font-bold leading-none">+</span>
              </div>
              <span className="text-[11px] mt-1 font-semibold text-primary">{tab.label}</span>
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center py-1 px-2 focus:outline-none transition-colors ${
              isActive ? 'text-primary font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className="text-xl leading-none">{tab.icon}</span>
            <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

