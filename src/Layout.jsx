import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Facebook, Instagram, ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Scroll-aware header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (e) {
        // Not logged in
      }
    };
    checkUser();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'Collection', path: '/Collection' },
    { name: 'Science', path: '/Science' },
    { name: 'Process', path: '/OurProcess' },
    { name: 'Library', path: '/Library' },
    { name: 'Blog', path: '/Blog' },
    { name: 'About', path: '/OurStory' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E2A3A] font-sans">

      {/* Announcement Bar */}
      <div className="bg-[#E8A598] text-white text-[11px] py-2.5 text-center tracking-wider font-medium">
        FREE SHIPPING ON ORDERS OVER $75 | 30-DAY HAPPINESS GUARANTEE
      </div>

      {/* Header - scroll-aware with shadow + backdrop blur after 50px */}
      <header
        className={`sticky top-0 z-50 bg-white border-b transition-all duration-300 ${
          scrolled
            ? 'border-gray-200 shadow-md backdrop-blur-md bg-white/95'
            : 'border-transparent shadow-none'
        }`}
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="text-lg tracking-[0.3em] uppercase text-[#1E2A3A] font-light">
            VITABAE
          </Link>

          {/* Desktop Nav - Center */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[11px] uppercase tracking-[0.1em] transition-colors ${
                  location.pathname === link.path
                    ? 'text-[#1E2A3A] font-semibold'
                    : 'text-gray-500 hover:text-[#1E2A3A]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions - Right */}
          <div className="flex items-center gap-5">
            {/* Mobile Menu Button */}
            <button className="md:hidden p-1" onClick={toggleMenu}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="relative cursor-pointer">
              <ShoppingBag size={18} className="text-gray-600 hover:text-[#1E2A3A] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E8A598] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-semibold">
                  {cartCount}
                </span>
              )}
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <div className="w-7 h-7 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#1E2A3A] font-semibold text-xs">
                    {user.full_name ? user.full_name[0].toUpperCase() : 'U'}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-none border-gray-200">
                  <DropdownMenuItem onClick={() => navigate('/Profile')} className="text-xs uppercase tracking-wider">Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => base44.auth.logout()} className="text-xs uppercase tracking-wider">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <User size={18} className="text-gray-600 hover:text-[#1E2A3A] cursor-pointer transition-colors" onClick={() => base44.auth.redirectToLogin()} />
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 py-6 px-6 shadow-sm">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm uppercase tracking-wider py-3 text-gray-600 border-b border-gray-50 hover:text-[#1E2A3A]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content - page transition wrapper keyed on route */}
      <main className="flex-grow">
        <div key={location.pathname} className="animate-page-enter">
          {children}
        </div>
      </main>

      {/* Footer - Premium dark navy design */}
      <footer className="bg-[#1E2A3A] text-white">

        {/* Brand Statement */}
        <div className="py-16 md:py-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#E8A598] mb-4 font-medium">Vitabae</p>
          <h2 className="text-2xl md:text-4xl font-light tracking-wide leading-snug max-w-xl mx-auto px-6">
            Wellness designed for every stage of life.
          </h2>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center px-6">
          <div className="h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Main footer content */}
        <div className="container mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">

            {/* Brand */}
            <div>
              <h3 className="text-lg font-bold tracking-[0.15em] uppercase mb-4 text-white">VITABAE</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Science-backed wellness for every stage of life. Pure, potent, and fully transparent.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-5 text-gray-500">Shop</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link to="/Collection?age=18-30" className="hover:text-white transition-colors">Ages 18-30</Link></li>
                <li><Link to="/Collection?age=31-45" className="hover:text-white transition-colors">Ages 31-45</Link></li>
                <li><Link to="/Collection?age=46-60" className="hover:text-white transition-colors">Ages 46-60</Link></li>
                <li><Link to="/Collection?age=60+" className="hover:text-white transition-colors">Ages 60+</Link></li>
                <li><Link to="/Collection" className="hover:text-white transition-colors">All Products</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-5 text-gray-500">Company</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link to="/OurStory" className="hover:text-white transition-colors">Our Story</Link></li>
                <li><Link to="/Science" className="hover:text-white transition-colors">Science</Link></li>
                <li><Link to="/OurProcess" className="hover:text-white transition-colors">Process</Link></li>
                <li><Link to="/Library" className="hover:text-white transition-colors">Ingredient Library</Link></li>
                <li><Link to="/FAQ" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-5 text-gray-500">Stay Updated</h4>
              <p className="text-sm text-gray-400 mb-4">Join for wellness tips and early access.</p>
              <div className="flex gap-0">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 border border-white/15 text-white placeholder-gray-500 px-4 py-3 text-sm flex-grow focus:outline-none focus:border-white/40 rounded-l-full transition-colors"
                />
                <button className="bg-[#E8A598] hover:bg-[#d9917f] text-white px-5 py-3 rounded-r-full transition-colors flex items-center gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider">Join</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center mb-10">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Social */}
          <div className="flex justify-center gap-4 mb-10">
            <a href="https://www.facebook.com/people/The-Vitabae/100068215744497/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all">
              <Facebook size={16} />
            </a>
            <a href="https://www.instagram.com/thevitabae/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all">
              <Instagram size={16} />
            </a>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 uppercase tracking-[0.1em]">
            <p>&copy; 2026 Vitabae. All rights reserved.</p>
            <div className="flex gap-8">
              <Link to="/Privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/Terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/FAQ" className="hover:text-white transition-colors">FAQ</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
