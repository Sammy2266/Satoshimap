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
  },
  {
    id: 4,
    name: "Accra Organic Market",
    category: "Food & Drink",
    lat: 5.6037,
    lng: -0.1870,
    address: "East Legon, Accra, Ghana",
    rating: 4.9,
    reviews: [],
    lightning: true,
    onchain: true,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&fit=crop",
    description: "Local farm-to-table produce."
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const mapRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = useMemo(() => {
    let list = INITIAL_MERCHANTS.filter(m => {
      const matchSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory === "All" || m.category === selectedCategory;
      return matchSearch && matchCat;
    });
    if (activeTab === 'favs') return list.filter(m => favorites.includes(m.id));
    return list;
  }, [searchTerm, selectedCategory, activeTab, favorites]);

  // Handle Map Initialization
  useEffect(() => {
    if (viewMode === 'map' && activeTab === 'explore' && !mapRef.current) {
      const L = window.L;
      if (!L) return;

      mapRef.current = L.map('map-container').setView([2.0, 20.0], 3);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap'
      }).addTo(mapRef.current);

      filtered.forEach(m => {
        const marker = L.divIcon({
          className: 'custom-div-icon',
          html: `<div class="bg-orange-500 p-2 rounded-full border-2 border-white shadow-lg"><svg width="12" height="12" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

        L.marker([m.lat, m.lng], { icon: marker })
          .addTo(mapRef.current)
          .on('click', () => setSelectedMerchant(m));
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [viewMode, activeTab, filtered]);

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
  };

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

  const handleAddMerchant = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setBalance(b => b + 500);
      setTransactions(t => [{id: Date.now(), type:'receive', amount: 500, label: 'Merchant Bounty', date:'Just now'}, ...t]);
      setActiveTab('wallet');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 max-w-md mx-auto shadow-2xl relative overflow-x-hidden border-x">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

      {/* Merchant Detail Overlay */}
      {selectedMerchant && (
        <div className="fixed inset-0 bg-white z-[3000] flex flex-col animate-in slide-in-from-right duration-300">
          <div className="relative h-72">
            <img src={selectedMerchant.image} className="w-full h-full object-cover" />
            <button onClick={() => setSelectedMerchant(null)} className="absolute top-6 left-6 p-2 bg-black/40 backdrop-blur-md rounded-full text-white"><ArrowLeft /></button>
            <button onClick={(e) => toggleFavorite(selectedMerchant.id, e)} className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-lg">
              <Heart className={`w-5 h-5 ${favorites.includes(selectedMerchant.id) ? 'fill-red-500 text-red-500' : 'text-slate-300'}`} />
            </button>
          </div>
          <div className="p-8 space-y-6 flex-1 overflow-y-auto">
            <h2 className="text-3xl font-black">{selectedMerchant.name}</h2>
            <p className="text-slate-500 font-medium leading-relaxed">{selectedMerchant.description}</p>
            <button onClick={() => setWalletAction('send')} className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl">
              <Zap className="fill-current w-5 h-5" /> Pay Now
            </button>
          </div>
        </div>
      )}

      {/* Wallet Action Modal */}
      {walletAction && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[4000] flex items-end">
          <div className="bg-white w-full rounded-t-[2.5rem] p-8 animate-in slide-in-from-bottom">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8"></div>
            {payStep === 'input' ? (
              <div className="space-y-6 text-center">
                <h3 className="text-xl font-black italic">{walletAction === 'send' ? 'SENDING SATS' : 'RECEIVING SATS'}</h3>
                <div className="bg-slate-50 p-8 rounded-3xl border">
                   <div className="flex justify-center items-center gap-2">
                     {currency === 'USD' && <span className="text-2xl font-black text-slate-300">$</span>}
                     <input type="number" value={payAmount} onChange={e => setPayAmount(e.target.value)} className="bg-transparent text-4xl font-black text-center w-32 outline-none" />
                     {currency === 'SATS' && <span className="text-lg font-bold text-orange-500">SATS</span>}
                   </div>
                   <button onClick={() => setCurrency(currency === 'USD' ? 'SATS' : 'USD')} className="mt-2 text-[10px] font-black text-orange-500 uppercase">Switch to {currency === 'USD' ? 'SATS' : 'USD'}</button>
                </div>
                <button onClick={processTransaction} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black">Confirm</button>
              </div>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto"><CheckCircle2 /></div>
                <h3 className="text-2xl font-black">Success!</h3>
              </div>
            )}
            <button onClick={() => setWalletAction(null)} className="w-full mt-4 py-2 font-bold text-slate-400">Cancel</button>
          </div>
        </div>
      )}

      <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-orange-500 p-1.5 rounded-lg rotate-12 shadow-lg shadow-orange-200"><Zap className="text-white w-4 h-4 fill-current" /></div>
          <h1 className="font-black text-lg tracking-tighter italic">SATOSHIMAP</h1>
        </div>
        <button onClick={() => setActiveTab('wallet')} className="bg-slate-900 text-white px-4 py-2 rounded-full text-[10px] font-black shadow-lg active:scale-95 transition-all">
          {balance.toLocaleString()} SATS
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {activeTab === 'explore' && (
          <div className="flex flex-col h-full animate-in fade-in">
            <div className="p-4 bg-white border-b space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search Africa..." className="w-full bg-slate-100 rounded-xl py-3 pl-10 outline-none font-medium" />
              </div>
              <div className="flex justify-between items-center bg-slate-100 p-1 rounded-xl">
                <button onClick={() => setViewMode('list')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-slate-400'}`}>
                  <List className="w-3.5 h-3.5" /> LIST
                </button>
                <button onClick={() => setViewMode('map')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black transition-all ${viewMode === 'map' ? 'bg-white shadow-sm' : 'text-slate-400'}`}>
                  <Globe className="w-3.5 h-3.5" /> MAP
                </button>
              </div>
            </div>

            {viewMode === 'list' ? (
              <div className="p-4 space-y-4">
                {filtered.map(m => (
                  <div key={m.id} onClick={() => setSelectedMerchant(m)} className="bg-white rounded-3xl overflow-hidden border p-4 flex gap-4 transition-all active:scale-[0.98]">
                    <img src={m.image} className="w-20 h-20 rounded-2xl object-cover" />
                    <div className="flex-1 flex flex-col justify-between">
                      <h3 className="font-black text-base">{m.name}</h3>
                      <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase"><MapPin className="w-3 h-3" /> {m.address.split(',')[0]}</div>
                      <div className="flex gap-1.5 mt-2">
                        {m.lightning && <span className="bg-yellow-50 text-yellow-600 text-[8px] font-black px-1.5 py-0.5 rounded border border-yellow-100 flex items-center gap-0.5">⚡ LN</span>}
                        <span className="bg-slate-50 text-slate-500 text-[8px] font-black px-1.5 py-0.5 rounded border flex items-center gap-0.5"><Star className="w-2 h-2 fill-current" /> {m.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div id="map-container" className="flex-1 z-0 bg-slate-100 min-h-[500px]"></div>
            )}
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="p-6 space-y-8 animate-in slide-in-from-bottom">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-[60px]"></div>
               <div className="relative z-10 text-center">
                <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1">Total Balance</p>
                <div className="flex items-baseline justify-center gap-2">
                  <h2 className="text-5xl font-black">{balance.toLocaleString()}</h2>
                  <span className="text-orange-500 font-black">SATS</span>
                </div>
                <div className="mt-8 flex gap-3">
                  <button onClick={() => setWalletAction('receive')} className="flex-1 bg-white text-black py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2">
                    <ArrowDownLeft className="w-4 h-4" /> Receive
                  </button>
                  <button onClick={() => setWalletAction('send')} className="flex-1 bg-white/10 text-white py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 border border-white/10">
                    <ArrowUpRight className="w-4 h-4 text-orange-400" /> Send
                  </button>
                </div>
               </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-black text-[10px] tracking-widest text-slate-400 uppercase">Recent Activity</h3>
              {transactions.map(t => (
                <div key={t.id} className="bg-white p-4 rounded-3xl flex justify-between items-center border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${t.type === 'receive' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                      {t.type === 'receive' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-800">{t.label}</p>
                      <p className="text-[10px] text-slate-400 font-black">{t.date}</p>
                    </div>
                  </div>
                  <p className={`font-black text-sm ${t.type === 'receive' ? 'text-green-600' : 'text-slate-900'}`}>{t.type === 'receive' ? '+' : '-'}{t.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'add' && (
          <div className="p-8 animate-in slide-in-from-right duration-500">
            <h2 className="text-3xl font-black mb-2 italic">GROW THE MAP</h2>
            <p className="text-slate-400 text-sm font-bold mb-8">Add a merchant and earn 500 SATS.</p>
            <form onSubmit={handleAddMerchant} className="space-y-6">
              <input required className="w-full bg-white border rounded-2xl p-4 font-bold outline-none focus:border-orange-500" placeholder="Merchant Name" />
              <select className="w-full bg-white border rounded-2xl p-4 font-bold outline-none">
                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
              </select>
              <input required className="w-full bg-white border rounded-2xl p-4 font-bold outline-none focus:border-orange-500" placeholder="Address / City" />
              <div className="p-10 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-300 gap-2 bg-slate-50">
                <Camera className="w-8 h-8" />
                <span className="text-[10px] font-black uppercase">Storefront Photo</span>
              </div>
              <button disabled={isSubmitting} className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black shadow-xl shadow-orange-100">
                {isSubmitting ? 'Verifying...' : 'Submit Merchant'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'favs' && (
          <div className="p-6 space-y-4 animate-in fade-in">
             <h2 className="text-2xl font-black mb-4 italic">SAVED PLACES</h2>
             {filtered.length > 0 ? filtered.map(m => (
                <div key={m.id} onClick={() => setSelectedMerchant(m)} className="bg-white rounded-3xl border p-4 flex gap-4">
                  <img src={m.image} className="w-20 h-20 rounded-2xl object-cover" />
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start">
                      <h3 className="font-black text-base leading-tight">{m.name}</h3>
                      <button onClick={(e) => toggleFavorite(m.id, e)}><Heart className="w-4 h-4 fill-red-500 text-red-500" /></button>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase mt-1">{m.category}</p>
                  </div>
                </div>
             )) : (
               <div className="text-center py-20 text-slate-300 font-black">NO SAVED MERCHANTS</div>
             )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-6 space-y-8 animate-in slide-in-from-bottom">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-orange-500 to-yellow-400 p-1 shadow-xl">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white">
                     <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" alt="User" />
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-white"></div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-black">Alex Nakamoto</h2>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Stacking since 2021</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Visits', value: '24' },
                { label: 'Reviews', value: '12' },
                { label: 'Badges', value: '5' }
              ].map(stat => (
                <div key={stat.label} className="bg-white border rounded-2xl p-4 text-center">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">{stat.label}</p>
                  <p className="text-lg font-black">{stat.value
