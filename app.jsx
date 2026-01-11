import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  MapPin, 
  Search, 
  Zap, 
  Globe, 
  Star, 
  Filter, 
  Heart, 
  PlusCircle, 
  X, 
  ArrowLeft, 
  CheckCircle2, 
  Camera, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  User,
  Settings,
  Bell,
  CreditCard,
  Shield,
  HelpCircle,
  LogOut,
  Layers,
  List,
  ChevronRight
} from 'lucide-react';

// --- CONFIG & MOCK DATA ---
const SAT_TO_USD = 0.00065;
const CATEGORIES = ["All", "Food & Drink", "Electronics", "Travel", "Retail", "Services"];

const INITIAL_MERCHANTS = [
  {
    id: 1,
    name: "Satoshi's Coffee",
    category: "Food & Drink",
    lat: -1.286389,
    lng: 36.817223,
    address: "Koinange St, Nairobi, Kenya",
    rating: 4.8,
    reviews: [{ id: 101, user: "Alice", comment: "Perfect espresso!", rating: 5, date: "2d ago" }],
    lightning: true,
    onchain: true,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&fit=crop",
    description: "Pioneering coffee shop accepting Bitcoin since 2017."
  },
  {
    id: 2,
    name: "Lagos Tech Hub",
    category: "Services",
    lat: 6.5244,
    lng: 3.3792,
    address: "Yaba, Lagos, Nigeria",
    rating: 4.7,
    reviews: [],
    lightning: true,
    onchain: true,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&fit=crop",
    description: "Co-working space for Bitcoin developers."
  },
  {
    id: 3,
    name: "Cape Town Surf Shop",
    category: "Retail",
    lat: -33.9249,
    lng: 18.4241,
    address: "Waterfront, Cape Town, SA",
    rating: 4.5,
    reviews: [],
    lightning: true,
    onchain: false,
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&fit=crop",
    description: "High-quality surf gear. Pay with Lightning."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const [viewMode, setViewMode] = useState('list'); 
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [favorites, setFavorites] = useState([1]);
  const [balance, setBalance] = useState(125400);
  const [transactions, setTransactions] = useState([
    { id: 't1', type: 'receive', amount: 500, label: 'Merchant Bounty', date: 'Oct 24' },
    { id: 't2', type: 'send', amount: 1200, label: "Satoshi's Coffee", date: 'Oct 22' }
  ]);

  const [walletAction, setWalletAction] = useState(null);
  const [payAmount, setPayAmount] = useState('10');
  const [currency, setCurrency] = useState('USD');
  const [payStep, setPayStep] = useState('input');
  
  const mapRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // Filtered list logic
  const filtered = useMemo(() => {
    let list = INITIAL_MERCHANTS.filter(m => {
      const matchSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory === "All" || m.category === selectedCategory;
      return matchSearch && matchCat;
    });
    if (activeTab === 'favs') return list.filter(m => favorites.includes(m.id));
    return list;
  }, [searchTerm, selectedCategory, activeTab, favorites]);

  // Load Leaflet Script & CSS
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => setLeafletLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  // Map Initialization & Cleanup
  useEffect(() => {
    let mapInstance = null;

    if (viewMode === 'map' && activeTab === 'explore' && leafletLoaded) {
      const L = window.L;
      if (!L || !document.getElementById('map-container')) return;

      try {
        mapInstance = L.map('map-container').setView([2.0, 20.0], 3);
        mapRef.current = mapInstance;

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap'
        }).addTo(mapInstance);

        filtered.forEach(m => {
          const markerIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div class="bg-orange-500 p-2 rounded-full border-2 border-white shadow-lg"><svg width="12" height="12" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });

          L.marker([m.lat, m.lng], { icon: markerIcon })
            .addTo(mapInstance)
            .on('click', () => setSelectedMerchant(m));
        });
      } catch (err) {
        console.error("Map initialization error:", err);
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [viewMode, activeTab, filtered, leafletLoaded]);

  const processTransaction = () => {
    const sats = currency === 'SATS' ? parseInt(payAmount) : Math.round(parseFloat(payAmount) / SAT_TO_USD);
    setBalance(b => walletAction === 'send' ? b - sats : b + sats);
    setTransactions(prev => [{
      id: Date.now().toString(),
      type: walletAction,
      amount: sats,
      label: walletAction === 'send' ? (selectedMerchant?.name || 'Payment') : 'Inbound Transfer',
      date: 'Just now'
    }, ...prev]);
    setPayStep('success');
    setTimeout(() => {
      setWalletAction(null);
      setPayStep('input');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 max-w-md mx-auto shadow-2xl relative overflow-x-hidden border-x">
      
      {/* Merchant Detail Overlay */}
      {selectedMerchant && (
        <div className="fixed inset-0 bg-white z-[3000] flex flex-col animate-in slide-in-from-right duration-300">
          <div className="relative h-72">
            <img src={selectedMerchant.image} className="w-full h-full object-cover" alt={selectedMerchant.name} />
            <button 
              onClick={() => setSelectedMerchant(null)} 
              className="absolute top-6 left-6 p-2 bg-black/40 backdrop-blur-md rounded-full text-white"
            >
              <ArrowLeft />
            </button>
          </div>
          <div className="p-8 space-y-6 flex-1">
            <h2 className="text-3xl font-black">{selectedMerchant.name}</h2>
            <p className="text-slate-500 font-medium leading-relaxed">{selectedMerchant.description}</p>
            <button 
              onClick={() => setWalletAction('send')} 
              className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black shadow-xl active:scale-95 transition-transform"
            >
              Pay Now
            </button>
          </div>
        </div>
      )}

      {/* Wallet Modal */}
      {walletAction && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[4000] flex items-end">
          <div className="bg-white w-full rounded-t-[2.5rem] p-8 animate-in slide-in-from-bottom">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8"></div>
            {payStep === 'input' ? (
              <div className="space-y-6 text-center">
                <h3 className="text-xl font-black italic">{walletAction.toUpperCase()} SATS</h3>
                <div className="bg-slate-50 p-8 rounded-3xl border">
                   <input 
                     type="number" 
                     value={payAmount} 
                     onChange={e => setPayAmount(e.target.value)} 
                     className="bg-transparent text-4xl font-black text-center w-full outline-none" 
                   />
                   <p className="text-orange-500 font-bold text-xs mt-2 uppercase">{currency}</p>
                </div>
                <button 
                  onClick={processTransaction} 
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black"
                >
                  Confirm
                </button>
              </div>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 />
                </div>
                <h3 className="text-2xl font-black">Success!</h3>
              </div>
            )}
            <button 
              onClick={() => setWalletAction(null)} 
              className="w-full mt-4 py-2 font-bold text-slate-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-orange-500 p-1.5 rounded-lg rotate-12">
            <Zap className="text-white w-4 h-4 fill-current" />
          </div>
          <h1 className="font-black text-lg tracking-tighter italic">SATOSHIMAP</h1>
        </div>
        <button 
          onClick={() => setActiveTab('wallet')} 
          className="bg-slate-900 text-white px-4 py-2 rounded-full text-[10px] font-black"
        >
          {balance.toLocaleString()} SATS
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {activeTab === 'explore' && (
          <div className="flex flex-col h-full">
            <div className="p-4 bg-white border-b space-y-3">
              <div className="flex justify-between items-center bg-slate-100 p-1 rounded-xl">
                <button 
                  onClick={() => setViewMode('list')} 
                  className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-slate-400'}`}
                >
                  LIST
                </button>
                <button 
                  onClick={() => setViewMode('map')} 
                  className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all ${viewMode === 'map' ? 'bg-white shadow-sm' : 'text-slate-400'}`}
                >
                  MAP
                </button>
              </div>
            </div>

            {viewMode === 'list' ? (
              <div className="p-4 space-y-4">
                {filtered.map(m => (
                  <div 
                    key={m.id} 
                    onClick={() => setSelectedMerchant(m)} 
                    className="bg-white rounded-3xl border p-4 flex gap-4 active:bg-slate-50 transition-colors"
                  >
                    <img src={m.image} className="w-20 h-20 rounded-2xl object-cover" alt={m.name} />
                    <div className="flex-1 flex flex-col justify-between">
                      <h3 className="font-black text-base">{m.name}</h3>
                      <div className="text-slate-400 text-[10px] font-bold uppercase">{m.address}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 relative min-h-[500px]">
                {!leafletLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
                    <p className="text-xs font-black text-slate-400 animate-pulse">LOADING MAP...</p>
                  </div>
                )}
                <div id="map-container" className="absolute inset-0 z-0 bg-slate-100"></div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="p-6 space-y-8 animate-in slide-in-from-bottom">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <p className="text-slate-400 font-black text-[10px] uppercase mb-1">Total Balance</p>
                <h2 className="text-5xl font-black">{balance.toLocaleString()} <span className="text-orange-500">SATS</span></h2>
                <div className="mt-8 flex gap-3">
                  <button onClick={() => setWalletAction('receive')} className="flex-1 bg-white text-black py-4 rounded-2xl font-black text-xs active:scale-95 transition-transform">Receive</button>
                  <button onClick={() => setWalletAction('send')} className="flex-1 bg-white/10 text-white py-4 rounded-2xl font-black text-xs border border-white/10 active:scale-95 transition-transform">Send</button>
                </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-black text-[10px] uppercase text-slate-400 tracking-widest">Recent Activity</h3>
              {transactions.map(tx => (
                <div key={tx.id} className="bg-white p-4 rounded-2xl border flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${tx.type === 'receive' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                      {tx.type === 'receive' ? <ArrowDownLeft size={16}/> : <ArrowUpRight size={16}/>}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{tx.label}</p>
                      <p className="text-[10px] text-slate-400 font-bold">{tx.date}</p>
                    </div>
                  </div>
                  <p className={`font-black text-sm ${tx.type === 'receive' ? 'text-green-600' : ''}`}>
                    {tx.type === 'receive' ? '+' : '-'}{tx.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-6 space-y-8 animate-in slide-in-from-bottom">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-orange-500 to-orange-300 p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-white overflow-hidden border-4 border-white">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" alt="Avatar" />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-black">Alex Nakamoto</h2>
                <p className="text-xs font-bold text-slate-400 uppercase">Pro Stacker since 2021</p>
              </div>
            </div>
            <div className="bg-white border rounded-[2rem] divide-y overflow-hidden shadow-sm">
                <button className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="font-black text-xs uppercase">Profile Info</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-300" />
                </button>
                <button className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span className="font-black text-xs uppercase">App Settings</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-300" />
                </button>
                <button className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors text-red-500">
                  <div className="flex items-center gap-3">
                    <LogOut className="w-4 h-4" />
                    <span className="font-black text-xs uppercase">Logout</span>
                  </div>
                </button>
            </div>
          </div>
        )}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t px-8 py-4 flex justify-between items-center max-w-md mx-auto z-[2000]">
        <button 
          onClick={() => setActiveTab('explore')} 
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'explore' ? 'text-orange-500' : 'text-slate-300'}`}
        >
          <MapPin size={24} />
          <span className="text-[8px] font-black uppercase">Map</span>
        </button>
        <button 
          onClick={() => setActiveTab('wallet')} 
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'wallet' ? 'text-orange-500' : 'text-slate-300'}`}
        >
          <Wallet size={24} />
          <span className="text-[8px] font-black uppercase">Wallet</span>
        </button>
        <button 
          onClick={() => setActiveTab('settings')} 
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'settings' ? 'text-orange-500' : 'text-slate-300'}`}
        >
          <User size={24} />
          <span className="text-[8px] font-black uppercase">User</span>
        </button>
      </nav>

      <style>{`
        #map-container { height: 100%; width: 100%; }
        .custom-div-icon { background: none; border: none; }
        .leaflet-container { font-family: inherit; z-index: 10; width: 100% !important; height: 100% !important; }
        .animate-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
