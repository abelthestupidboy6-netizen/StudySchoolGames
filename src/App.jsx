/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Gamepad2, ArrowLeft, Play, Info, ExternalLink } from 'lucide-react';
import gamesData from './data/games.json';

// Types

export default function App() {
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedGame = useMemo(() => 
    gamesData.find(g => g.id === selectedGameId),
    [selectedGameId]
  );

  const filteredGames = useMemo(() => 
    gamesData.filter(g => 
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [searchQuery]
  );

  const handleBack = () => setSelectedGameId(null);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-orange-500 selection:text-white">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <AnimatePresence mode="wait">
          {!selectedGame ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto px-6 py-12 flex-grow w-full"
            >
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-500 rounded-lg shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                      <Gamepad2 className="w-6 h-6 text-black" />
                    </div>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-orange-500">Nexus Arcade</span>
                  </div>
                  <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase font-display">
                    Unblocked <br />
                    Unlimited.
                  </h1>
                </div>
                
                <div className="relative group max-w-md w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 outline-none focus:border-orange-500 focus:bg-white/10 transition-all text-sm font-medium"
                  />
                </div>
              </header>

              {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredGames.map((game, index) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedGameId(game.id)}
                      className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300 flex flex-col h-full active:scale-[0.98]"
                    >
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <img
                          src={game.thumbnail}
                          alt={game.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-[0_0_30px_rgba(249,115,22,0.6)]">
                            <Play className="w-7 h-7 text-black fill-current ml-1" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors font-display">{game.title}</h3>
                        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">{game.description}</p>
                        <div className="mt-auto pt-6 flex items-center justify-between">
                          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30">Free Play</span>
                          <div className="flex items-center gap-2 text-xs font-bold text-orange-500 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                            PLAY NOW
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-40 bg-white/5 rounded-3xl border border-dashed border-white/10">
                  <p className="text-2xl text-white/20 font-medium italic">No matches found for "{searchQuery}"</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 bg-[#111] border-b border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-6">
                  <button
                    onClick={handleBack}
                    className="p-3 hover:bg-white/10 rounded-full transition-all group active:scale-90"
                  >
                    <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <div>
                    <h2 className="text-xl font-black tracking-tight uppercase leading-none mb-1 font-display">{selectedGame.title}</h2>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">In-Session</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <a 
                    href={selectedGame.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hidden sm:flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Source
                  </a>
                  <button className="p-3 hover:bg-white/10 rounded-full transition-colors text-white/60">
                    <Info className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-grow bg-[#050505] relative">
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none bg-black"
                  title={selectedGame.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        {!selectedGame && (
          <footer className="w-full max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="flex items-center gap-3">
                  <Gamepad2 className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-bold tracking-[0.3em] uppercase">Nexus Arcade</span>
                </div>
                <p className="text-white/30 text-xs max-w-xs text-center md:text-left leading-relaxed">
                  The ultimate destination for unblocked gaming. Play anywhere, anytime, without restrictions.
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">
                <div className="flex flex-col gap-4">
                  <span className="text-white/60 mb-2">Platform</span>
                  <a href="#" className="hover:text-orange-500 transition-colors">Games</a>
                  <a href="#" className="hover:text-orange-500 transition-colors">Categories</a>
                  <a href="#" className="hover:text-orange-500 transition-colors">New</a>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-white/60 mb-2">Company</span>
                  <a href="#" className="hover:text-orange-500 transition-colors">About</a>
                  <a href="#" className="hover:text-orange-500 transition-colors">Contact</a>
                  <a href="#" className="hover:text-orange-500 transition-colors">Social</a>
                </div>
                <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
                  <span className="text-white/60 mb-2">Support</span>
                  <a href="#" className="hover:text-orange-500 transition-colors">Terms</a>
                  <a href="#" className="hover:text-orange-500 transition-colors">Privacy</a>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
