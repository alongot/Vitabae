import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Facebook, Instagram, ArrowRight, Search, Bell } from 'lucide-react';
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

  const leftNav = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/Collection' },
    { name: 'Our Process', path: '/OurProcess' },
  ];

  const rightNav = [
    { name: 'Science', path: '/Science' },
    { name: 'Our Story', path: '/OurStory' },
  ];

  const navLinks = [...leftNav, ...rightNav];

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
        <div className="container mx-auto px-6 h-16 flex items-center">

          {/* Left Nav */}
          <nav className="hidden md:flex items-center gap-7 flex-1">
            {leftNav.map((link) => (
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

          {/* Mobile Menu Button - left on mobile */}
          <button className="md:hidden p-1" onClick={toggleMenu}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo - Center */}
          <Link to="/" className="mx-auto md:mx-0 md:flex-shrink-0 text-[28px] font-serif text-[#1E2A3A] italic">
            <span className="font-light">Vita</span><span className="font-bold">bae</span>
          </Link>

          {/* Right Nav + Icons */}
          <div className="hidden md:flex items-center gap-7 flex-1 justify-end">
            {rightNav.map((link) => (
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

            <div className="flex items-center gap-4 ml-4 border-l border-gray-200 pl-5">
              <Search size={17} className="text-gray-500 hover:text-[#1E2A3A] cursor-pointer transition-colors" />

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
                <User size={17} className="text-gray-500 hover:text-[#1E2A3A] cursor-pointer transition-colors" onClick={() => base44.auth.redirectToLogin()} />
              )}

              <div className="relative cursor-pointer">
                <Bell size={17} className="text-gray-500 hover:text-[#1E2A3A] transition-colors" />
              </div>
            </div>
          </div>

          {/* Mobile right icons */}
          <div className="flex items-center gap-4 md:hidden">
            <Search size={18} className="text-gray-500" />
            <User size={18} className="text-gray-500" onClick={() => base44.auth.redirectToLogin()} />
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
        <div key={location.pathname + location.search} className="animate-page-enter">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#F5F3F0] text-[#1E2A3A]">

        {/* Main footer content */}
        <div className="container mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">

            {/* Brand */}
            <div>
              <h3 className="text-lg font-bold tracking-[0.15em] uppercase mb-4 text-[#1E2A3A]">VITABAE</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Science-backed wellness for every stage of life. Pure, potent, and fully transparent.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-5 text-gray-400">Shop</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link to="/Collection?stage=reproductive" className="hover:text-[#1E2A3A] transition-colors">Reproductive Age</Link></li>
                <li><Link to="/Collection?stage=pregnancy" className="hover:text-[#1E2A3A] transition-colors">Pregnancy</Link></li>
                <li><Link to="/Collection?stage=postpartum" className="hover:text-[#1E2A3A] transition-colors">Post Pregnancy</Link></li>
                <li><Link to="/Collection?stage=perimenopause" className="hover:text-[#1E2A3A] transition-colors">Perimenopause</Link></li>
                <li><Link to="/Collection?stage=menopause" className="hover:text-[#1E2A3A] transition-colors">Menopause</Link></li>
                <li><Link to="/Collection?stage=postmenopause" className="hover:text-[#1E2A3A] transition-colors">Post Menopause</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-5 text-gray-400">Company</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link to="/OurStory" className="hover:text-[#1E2A3A] transition-colors">Our Story</Link></li>
                <li><Link to="/Science" className="hover:text-[#1E2A3A] transition-colors">Science</Link></li>
                <li><Link to="/OurProcess" className="hover:text-[#1E2A3A] transition-colors">Process</Link></li>
                <li><Link to="/Library" className="hover:text-[#1E2A3A] transition-colors">Ingredient Library</Link></li>
                <li><Link to="/FAQ" className="hover:text-[#1E2A3A] transition-colors">FAQ</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-5 text-gray-400">Stay Updated</h4>
              <p className="text-sm text-gray-500 mb-4">Join for wellness tips and early access.</p>
              <div className="flex gap-0">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white border border-gray-200 text-[#1E2A3A] placeholder-gray-400 px-4 py-3 text-sm flex-grow focus:outline-none focus:border-gray-400 rounded-l-full transition-colors"
                />
                <button className="bg-[#1E2A3A] hover:bg-[#2d3d4d] text-white px-5 py-3 rounded-r-full transition-colors flex items-center gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider">Join</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center mb-10">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#1E2A3A]/10 to-transparent" />
          </div>

          {/* Social */}
          <div className="flex justify-center gap-4 mb-10">
            <a href="https://www.facebook.com/people/The-Vitabae/100068215744497/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:text-[#1E2A3A] hover:border-[#1E2A3A] transition-all">
              <Facebook size={16} />
            </a>
            <a href="https://www.instagram.com/thevitabae/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:text-[#1E2A3A] hover:border-[#1E2A3A] transition-all">
              <Instagram size={16} />
            </a>
          </div>

          {/* FDA Disclaimer */}
          <p className="text-[10px] text-gray-400 leading-relaxed text-center mb-8 max-w-3xl mx-auto">
            *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before starting any supplement regimen.
          </p>

          {/* Bottom */}
          <div className="border-t border-[#1E2A3A]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-400 uppercase tracking-[0.1em]">
            <p>&copy; 2026 Vitabae. All rights reserved.</p>
            <div className="flex gap-8">
              <Link to="/Privacy" className="hover:text-[#1E2A3A] transition-colors">Privacy Policy</Link>
              <Link to="/Terms" className="hover:text-[#1E2A3A] transition-colors">Terms of Service</Link>
              <Link to="/FAQ" className="hover:text-[#1E2A3A] transition-colors">FAQ</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
