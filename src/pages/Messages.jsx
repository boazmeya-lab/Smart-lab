import React from 'react';

export default function Messages() {
  const mockConversations = [
    { id: 1, name: "Paul Mpoyi", lastMsg: "Est-ce toujours disponible ?", time: "12:30", unread: 2, item: "Toyota RAV4" },
    { id: 2, name: "Sarah K.", lastMsg: "Je peux passer le prendre à 15h.", time: "Hier", unread: 0, item: "iPhone 13 Pro" },
  ];

  return (
    <div className="px-4 py-2 space-y-4">
      <h1 className="text-lg font-bold text-slate-900">Messages</h1>

      {/* Recherche */}
      <div className="bg-white border border-slate-200 rounded-2xl px-3 py-2 flex items-center">
        <span className="mr-2">🔍</span>
        <input 
          type="text" 
          placeholder="Rechercher une discussion..." 
          className="bg-transparent text-xs text-slate-900 focus:outline-none w-full"
        />
      </div>

      {/* Liste des conversations */}
      <div className="space-y-2">
        {mockConversations.map(conv => (
          <div 
            key={conv.id}
            onClick={() => alert(`Ouvrir la discussion avec ${conv.name}`)}
            className="p-3 bg-white rounded-card border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                👤
              </div>
              <div>
                <h3 className="font-bold text-xs text-slate-900">{conv.name}</h3>
                <p className="text-[11px] text-slate-500 font-medium">{conv.item}</p>
                <p className="text-[11px] text-slate-400 line-clamp-1">{conv.lastMsg}</p>
              </div>
            </div>

            <div className="text-right flex flex-col items-end space-y-1">
              <span className="text-[10px] text-slate-400">{conv.time}</span>
              {conv.unread > 0 && (
                <span className="w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {conv.unread}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

