import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import { api } from '../../services/api';
import './Navbar.css';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedSearchTerm) {
        try {
          const res = await api.search(debouncedSearchTerm);
          setSearchResults(res.items || []);
          setShowDropdown(true);
        } catch (error) {
          console.error("Search error", error);
        }
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    };

    fetchResults();
  }, [debouncedSearchTerm]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setShowDropdown(false);
      setSearchQuery('');
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) setTimeout(() => document.querySelector('.searchInput')?.focus(), 100);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src="/logo.png" alt="Rebahan" className="navbar-logo-img" />
        <span>Rebahan</span>
      </Link>

      <div className={`navLinks ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" className="navLink">Home</Link>
        <Link to="/categories" className="navLink">All Categories</Link>
        <Link to="/category/kdrama" className="navLink">K-Drama</Link>
        <Link to="/category/short-tv" className="navLink">Short TV</Link>
        <Link to="/category/anime" className="navLink">Anime</Link>
        <Link to="/category/western-tv" className="navLink">Western TV</Link>
        <Link to="/category/indo-dub" className="navLink">Indo Dub</Link>
      </div>

      <div className="rightSection">
        <div ref={searchRef} style={{ position: 'relative' }}>
          <form className={`searchContainer ${isSearchOpen ? 'active' : ''}`} onSubmit={handleSearchSubmit}>
            <button type="button" className="iconButton" onClick={toggleSearch}>
              <Search size={20} />
            </button>
            <input
              type="text"
              className={`searchInput ${isSearchOpen ? 'open' : ''}`}
              placeholder="Titles, people, genres"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => { if (searchResults.length > 0) setShowDropdown(true); }}
            />
          </form>

          {showDropdown && searchResults.length > 0 && (
            <div className="searchDropdown" style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              width: '300px',
              backgroundColor: 'var(--surface-color)',
              borderRadius: '0 0 4px 4px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.5)',
              zIndex: 1001,
              maxHeight: '400px',
              overflowY: 'auto'
            }}>
              {searchResults.slice(0, 5).map(item => (
                <Link
                  key={item.id}
                  to={`/detail/${item.detailPath}`}
                  className="searchItem"
                  onClick={() => { setShowDropdown(false); setIsSearchOpen(false); setSearchQuery(''); }}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    padding: '10px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    alignItems: 'center'
                  }}
                >
                  <img src={item.poster} alt={item.title} style={{ width: '40px', height: '60px', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{item.title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{item.year} • {item.rating}</div>
                  </div>
                </Link>
              ))}
              <div
                onClick={handleSearchSubmit}
                style={{
                  padding: '10px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  color: 'var(--primary-color)',
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}
              >
                See all results for "{searchQuery}"
              </div>
            </div>
          )}
        </div>

        <button
          className="iconButton mobileMenuBtn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
