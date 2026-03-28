/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  ChevronUp, 
  ShieldCheck, 
  Truck, 
  Lock,
  Instagram,
  Send,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  description: string;
  category: string;
  image: string;
  link: string;
  featured?: boolean;
}

// --- Data ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "TAGRY X08 True Wireless Earbuds",
    price: 149,
    rating: 4.5,
    description: "60-hour battery, wireless charging, IPX5 waterproof, 13mm drivers.",
    category: "Earbuds",
    image: "https://placehold.co/600x400?text=TAGRY+X08",
    link: "https://www.amazon.ae",
    featured: true
  },
  {
    id: 2,
    name: "Anker Soundcore R50i",
    price: 139,
    rating: 4.0,
    description: "ANC earbuds with Soundcore app and EQ customization.",
    category: "Earbuds",
    image: "https://placehold.co/300x200?text=Anker+R50i",
    link: "https://www.amazon.ae"
  },
  {
    id: 3,
    name: "UGREEN Nexode Power Bank 20000mAh",
    price: 229,
    rating: 5.0,
    description: "100W fast charge, USB-C, compatible with MacBook & phones.",
    category: "Power Bank",
    image: "https://placehold.co/300x200?text=UGREEN+Nexode",
    link: "https://www.amazon.ae"
  },
  {
    id: 4,
    name: "TP-Link Tapo C200 Security Camera",
    price: 119,
    rating: 4.0,
    description: "1080p pan/tilt, motion detection, Alexa compatible.",
    category: "Camera",
    image: "https://placehold.co/300x200?text=Tapo+C200",
    link: "https://www.amazon.ae"
  },
  {
    id: 5,
    name: "SanDisk 1TB Extreme Portable SSD",
    price: 299,
    rating: 5.0,
    description: "1050MB/s, USB-C, rugged and compact design.",
    category: "Storage",
    image: "https://placehold.co/300x200?text=SanDisk+1TB",
    link: "https://www.amazon.ae"
  },
  {
    id: 6,
    name: "JLab Go Air Pop Earbuds",
    price: 99,
    rating: 3.5,
    description: "Ultra-budget earbuds, 3 EQ modes, dual connect.",
    category: "Earbuds",
    image: "https://placehold.co/300x200?text=JLab+Go+Air",
    link: "https://www.amazon.ae"
  },
  {
    id: 7,
    name: "boAt Airdopes 141",
    price: 109,
    rating: 4.0,
    description: "Gaming mode, quad-mic calls, 42-hour battery.",
    category: "Earbuds",
    image: "https://placehold.co/300x200?text=boAt+141",
    link: "https://www.amazon.ae"
  },
  {
    id: 8,
    name: "HY300 Mini Projector 4K",
    price: 499,
    rating: 4.0,
    description: "WiFi 6, Bluetooth 5.4, 160 ANSI lumens, portable.",
    category: "Projector",
    image: "https://placehold.co/300x200?text=HY300+Projector",
    link: "https://www.amazon.ae"
  },
  {
    id: 9,
    name: "Honor Pad 9 Tablet 12.1\"",
    price: 899,
    rating: 4.0,
    description: "8GB RAM, 256GB, keyboard bundle, Wi-Fi.",
    category: "Tablet",
    image: "https://placehold.co/300x200?text=Honor+Pad+9",
    link: "https://www.amazon.ae"
  }
];

// --- Components ---

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex items-center text-amazon-orange">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} size={16} fill="currentColor" />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star size={16} className="text-gray-300" />
          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
            <Star size={16} fill="currentColor" />
          </div>
        </div>
      )}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <Star key={i + fullStars} size={16} className="text-gray-300" />
      ))}
      <span className="ml-2 text-sm text-text-muted font-medium">{rating}</span>
    </div>
  );
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success'>('idle');

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('success');
    setTimeout(() => setNewsletterStatus('idle'), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-amazon-navy shadow-lg py-3' : 'bg-amazon-navy/90 backdrop-blur-sm py-4'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="#" className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-amazon-orange">Tech</span>Souk
            </a>
            
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300">
              <a href="#home" className="hover:text-amazon-orange transition-colors">Home</a>
              <a href="#deals" className="hover:text-amazon-orange transition-colors">Deals</a>
              <a href="#reviews" className="hover:text-amazon-orange transition-colors">Reviews</a>
              <a href="#top-picks" className="hover:text-amazon-orange transition-colors">Top Picks</a>
              <a href="#contact" className="hover:text-amazon-orange transition-colors">Contact</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-1.5 border border-white/20 focus-within:border-amazon-orange transition-all">
              <Search size={18} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search deals..." 
                className="bg-transparent border-none focus:ring-0 text-sm text-white ml-2 w-48"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button className="text-xs font-bold text-white bg-white/10 px-3 py-1.5 rounded border border-white/20 hover:bg-white/20 transition-all">
              العربية
            </button>

            <button 
              className="lg:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-amazon-navy-light border-t border-white/10 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col gap-4 text-white font-medium">
                <div className="flex items-center bg-white/10 rounded-full px-4 py-2 border border-white/20 mb-2">
                  <Search size={18} className="text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search deals..." 
                    className="bg-transparent border-none focus:ring-0 text-sm text-white ml-2 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <a href="#home" onClick={() => setIsMenuOpen(false)} className="py-2 border-b border-white/5">Home</a>
                <a href="#deals" onClick={() => setIsMenuOpen(false)} className="py-2 border-b border-white/5">Deals</a>
                <a href="#reviews" onClick={() => setIsMenuOpen(false)} className="py-2 border-b border-white/5">Reviews</a>
                <a href="#top-picks" onClick={() => setIsMenuOpen(false)} className="py-2 border-b border-white/5">Top Picks</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="py-2">Contact</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section id="home" className="relative bg-amazon-navy text-white py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#FF9900,transparent_70%)]"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center gap-4 mb-6 text-xs font-bold uppercase tracking-widest text-amazon-orange">
                <span className="flex items-center gap-1"><ShieldCheck size={14} /> Amazon Verified</span>
                <span className="flex items-center gap-1"><Truck size={14} /> UAE Shipping</span>
                <span className="flex items-center gap-1"><Lock size={14} /> Secure Links</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                The UAE's Best Amazon <br className="hidden md:block" /> Tech Deals — Updated Weekly
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Handpicked electronics, honest reviews, and the lowest prices on Amazon UAE.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <a 
                  href="#deals" 
                  className="bg-amazon-orange hover:bg-orange-600 text-amazon-navy font-bold px-8 py-4 rounded-full text-lg transition-all flex items-center gap-2 group"
                >
                  Shop Today's Deals <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400 font-medium">
                <div className="flex flex-col items-center">
                  <span className="text-white text-xl">60,000+</span>
                  <span>Happy Shoppers</span>
                </div>
                <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
                <div className="flex flex-col items-center">
                  <span className="text-white text-xl">4.8★</span>
                  <span>Average Rating</span>
                </div>
                <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
                <div className="flex flex-col items-center">
                  <span className="text-white text-xl">Free</span>
                  <span>Same-Day Delivery</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Deal */}
        <section id="top-picks" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl font-bold">Featured Deal of the Week</h2>
              <div className="h-px flex-grow bg-gray-200"></div>
            </div>

            <div className="bg-bg-gray rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row gap-12 items-center border border-gray-100 shadow-sm">
              <div className="w-full lg:w-1/2">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                >
                  <img 
                    src={PRODUCTS[0].image} 
                    alt={PRODUCTS[0].name} 
                    className="w-full h-auto"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                    🔥 Best Seller
                  </div>
                </motion.div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-amazon-orange/10 text-amazon-orange text-xs font-bold px-3 py-1 rounded-full uppercase">
                    60-Hour Battery
                  </span>
                  <StarRating rating={4.5} />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-4">{PRODUCTS[0].name}</h3>
                <div className="text-3xl font-bold text-amazon-orange mb-6">AED 149</div>
                
                <p className="text-text-muted text-lg mb-8 leading-relaxed">
                  True wireless earbuds with 60 hours total battery, Bluetooth 5.3, IPX5 waterproof, wireless charging case, and 13mm drivers — all under AED 150.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {[
                    "60-hour total battery life",
                    "Wireless + USB-C charging case",
                    "Bluetooth 5.3 — instant pairing",
                    "IPX5 waterproof — gym ready",
                    "13mm bass-boosted drivers"
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm font-medium text-text-main">
                      <CheckCircle2 size={18} className="text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <a 
                    href={PRODUCTS[0].link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amazon-orange hover:bg-orange-600 text-amazon-navy font-bold px-10 py-4 rounded-xl text-lg transition-all shadow-lg shadow-amazon-orange/20"
                  >
                    Buy on Amazon UAE <ExternalLink size={20} />
                  </a>
                  <p className="text-[10px] text-text-muted italic">
                    As an Amazon Associate, I earn from qualifying purchases.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section id="deals" className="py-20 bg-bg-gray">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Top Electronics Deals</h2>
              <p className="text-text-muted max-w-xl mx-auto">
                We monitor prices daily to bring you the absolute lowest deals on Amazon UAE.
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                <Search size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-500">No products found matching "{searchQuery}"</h3>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-amazon-orange font-bold hover:underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <motion.div 
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col"
                  >
                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-amazon-navy text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-2">
                        <StarRating rating={product.rating} />
                      </div>
                      <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-amazon-orange transition-colors cursor-pointer">
                        {product.name}
                      </h3>
                      <p className="text-sm text-text-muted mb-4 line-clamp-2 flex-grow">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                        <div className="text-xl font-bold text-text-main">AED {product.price}</div>
                        <a 
                          href={product.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-amazon-orange/10 hover:bg-amazon-orange text-amazon-orange hover:text-amazon-navy text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-1"
                        >
                          View on Amazon <ArrowRight size={14} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Why Trust Us */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="w-20 h-20 bg-amazon-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Search size={32} className="text-amazon-orange" />
                </div>
                <h3 className="text-xl font-bold mb-3">Honest Reviews</h3>
                <p className="text-text-muted">
                  We test and compare every product before recommending it, ensuring you get the real story.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-amazon-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Truck size={32} className="text-amazon-orange" />
                </div>
                <h3 className="text-xl font-bold mb-3">UAE Focused</h3>
                <p className="text-text-muted">
                  All products ship to the UAE with Amazon's delivery guarantee and local support.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-amazon-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Star size={32} className="text-amazon-orange" />
                </div>
                <h3 className="text-xl font-bold mb-3">Best Price Tracking</h3>
                <p className="text-text-muted">
                  We monitor prices daily across multiple sellers so you always get the absolute lowest deal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="reviews" className="py-20 bg-bg-gray">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">TAGRY X08 vs The Competition</h2>
              <p className="text-text-muted">See how our top pick stacks up against other popular budget earbuds.</p>
            </div>

            <div className="overflow-x-auto rounded-3xl shadow-sm border border-gray-200">
              <table className="w-full text-left bg-white border-collapse">
                <thead>
                  <tr className="bg-amazon-navy text-white">
                    <th className="p-6 font-bold">Feature</th>
                    <th className="p-6 font-bold relative">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amazon-orange text-amazon-navy text-[10px] font-black px-3 py-1 rounded-full uppercase whitespace-nowrap">
                        Best Value
                      </div>
                      TAGRY X08
                    </th>
                    <th className="p-6 font-bold">Anker R50i</th>
                    <th className="p-6 font-bold">JLab Go Air</th>
                    <th className="p-6 font-bold">boAt 141</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-100">
                    <td className="p-6 font-bold bg-gray-50/50">Battery</td>
                    <td className="p-6 font-bold text-amazon-orange border-x-2 border-amazon-orange/20">60 hrs ✓</td>
                    <td className="p-6">36 hrs</td>
                    <td className="p-6">32 hrs</td>
                    <td className="p-6">42 hrs</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-6 font-bold bg-gray-50/50">ANC</td>
                    <td className="p-6 border-x-2 border-amazon-orange/20">✗</td>
                    <td className="p-6 text-green-600 font-bold">✓</td>
                    <td className="p-6">✗</td>
                    <td className="p-6">✗</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-6 font-bold bg-gray-50/50">Wireless Charging</td>
                    <td className="p-6 text-green-600 font-bold border-x-2 border-amazon-orange/20">✓</td>
                    <td className="p-6">✗</td>
                    <td className="p-6">✗</td>
                    <td className="p-6">✗</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-6 font-bold bg-gray-50/50">Water Resistance</td>
                    <td className="p-6 border-x-2 border-amazon-orange/20">IPX5</td>
                    <td className="p-6">IPX5</td>
                    <td className="p-6">IPX4</td>
                    <td className="p-6">IPX4</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-6 font-bold bg-gray-50/50">USB-C</td>
                    <td className="p-6 text-green-600 font-bold border-x-2 border-amazon-orange/20">✓</td>
                    <td className="p-6 text-green-600 font-bold">✓</td>
                    <td className="p-6">✗</td>
                    <td className="p-6 text-green-600 font-bold">✓</td>
                  </tr>
                  <tr className="bg-gray-50/30">
                    <td className="p-6 font-bold bg-gray-50/50">Price (AED)</td>
                    <td className="p-6 font-bold text-xl text-amazon-orange border-x-2 border-amazon-orange/20">149</td>
                    <td className="p-6 font-bold text-lg">139</td>
                    <td className="p-6 font-bold text-lg">99</td>
                    <td className="p-6 font-bold text-lg">109</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section id="contact" className="py-20 bg-amazon-navy text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-amazon-navy-light rounded-[2rem] p-8 md:p-16 text-center border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amazon-orange/5 blur-3xl rounded-full -mr-32 -mt-32"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-amazon-orange rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-amazon-orange/20">
                  <Send size={32} className="text-amazon-navy" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Get UAE's Best Amazon Deals Every Week</h2>
                <p className="text-gray-400 mb-10 max-w-lg mx-auto">
                  Join 15,000+ subscribers and never miss a price drop on top-rated electronics.
                </p>

                {newsletterStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-500/20 text-green-400 border border-green-500/30 p-6 rounded-2xl font-bold"
                  >
                    Thanks! We'll notify you of the best deals.
                  </motion.div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                    <input 
                      type="email" 
                      required 
                      placeholder="Enter your email address" 
                      className="flex-grow bg-white/10 border border-white/20 rounded-xl px-6 py-4 focus:outline-none focus:border-amazon-orange transition-all text-white"
                    />
                    <button 
                      type="submit"
                      className="bg-amazon-orange hover:bg-orange-600 text-amazon-navy font-bold px-8 py-4 rounded-xl transition-all whitespace-nowrap"
                    >
                      Notify Me
                    </button>
                  </form>
                )}
                <p className="mt-6 text-xs text-gray-500">
                  No spam. Unsubscribe anytime. UAE deals only.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-amazon-navy text-white pt-20 pb-10 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <a href="#" className="text-3xl font-bold text-white mb-6 block">
                <span className="text-amazon-orange">Tech</span>Souk
              </a>
              <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
                Best Tech Deals in the UAE — Handpicked & Reviewed. We help you find the highest quality electronics at the lowest possible prices on Amazon UAE.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-amazon-orange hover:text-amazon-navy transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-amazon-orange hover:text-amazon-navy transition-all">
                  <Send size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#home" className="hover:text-amazon-orange transition-colors">Home</a></li>
                <li><a href="#deals" className="hover:text-amazon-orange transition-colors">Deals</a></li>
                <li><a href="#top-picks" className="hover:text-amazon-orange transition-colors">Top Picks</a></li>
                <li><a href="#" className="hover:text-amazon-orange transition-colors">Privacy Policy</a></li>
                <li><a href="#contact" className="hover:text-amazon-orange transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Affiliate Disclosure</h4>
              <p className="text-xs text-gray-500 leading-relaxed italic">
                This site is a participant in the Amazon Associates Programme, an affiliate advertising programme designed to provide a means for sites to earn advertising fees by advertising and linking to amazon.ae.
              </p>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm">
              © 2026 TechSouk. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span>As an Amazon Associate, I earn from qualifying purchases.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 bg-amazon-orange text-amazon-navy p-3 rounded-full shadow-2xl hover:scale-110 transition-all"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
