import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NAV_ITEMS = [
  { id: 'beranda', label: 'BERANDA', href: '/' },
  {
    id: 'profil',
    label: 'PROFIL',
    children: [
      { label: 'Sejarah', href: '/profil/sejarah' },
      { label: 'Visi & Misi', href: '/profil/visi-misi' },
      { label: 'Struktur Organisasi', href: '/profil/struktur-organisasi' },
      { label: 'Tugas & Fungsi', href: '/profil/tugas-fungsi' },
    ],
  },
  { id: 'berita', label: 'BERITA', href: '/berita' },
  {
    id: 'ppid',
    label: 'PPID',
    children: [
      { label: 'Informasi Berkala', href: '/ppid/berkala' },
      { label: 'Informasi Serta Merta', href: '/ppid/serta-merta' },
      { label: 'Informasi Setiap Saat', href: '/ppid/setiap-saat' },
      { label: 'Informasi Dikecualikan', href: '/ppid/dikecualikan' },
    ],
  },
  { id: 'ejsc', label: 'EJSC', href: '/ejsc' },
  {
    id: 'layanan',
    label: 'LAYANAN',
    children: [
      { label: 'Layanan Publik', href: '/layanan/publik' },
      { label: 'Pengaduan', href: '/layanan/pengaduan' },
    ],
  },
  { id: 'sakip-rb', label: 'SAKIP-RB', href: '/sakip-rb' },
  {
    id: 'inovasi',
    label: 'INOVASI',
    children: [
      { label: 'Daftar Inovasi', href: '/inovasi/daftar' },
      { label: 'Ajukan Inovasi', href: '/inovasi/ajukan' },
    ],
  },
];

function NavItem({ item, isMobile, mobileOpen, onMobileToggle }) {
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <li className="nav-item" role="none">
        <Link className="nav-link" to={item.href} role="menuitem">
          {item.label}
        </Link>
      </li>
    );
  }

  const isOpen = mobileOpen === item.id;

  return (
    <li
      className={`nav-item has-dropdown${isOpen ? ' mobile-open' : ''}`}
      role="none"
    >
      <button
        className="nav-link nav-dropdown-toggle"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Menu ${item.label}`}
        onClick={() => isMobile && onMobileToggle(item.id)}
        type="button"
      >
        {item.label}
        <span className="dropdown-caret" aria-hidden="true">▾</span>
      </button>
      <ul
        className="dropdown-menu"
        role="menu"
        aria-label={`Submenu ${item.label}`}
      >
        {item.children.map((child) => (
          <li key={child.href} role="none">
            <Link className="dropdown-link" to={child.href} role="menuitem">
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const handle = (e) => setIsMobile(e.matches);
    handle(mq);
    mq.addEventListener('change', handle);
    return () => mq.removeEventListener('change', handle);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleOut = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
        setMobileOpen(null);
      }
    };
    document.addEventListener('mousedown', handleOut);
    return () => document.removeEventListener('mousedown', handleOut);
  }, [menuOpen]);

  const handleMobileToggle = useCallback(
    (id) => setMobileOpen((prev) => (prev === id ? null : id)),
    []
  );

  return (
    <header className="site-header" ref={navRef}>

      {/* ── Top Bar ── */}
      <div className="topbar">
        <Link to="/" className="brand-link" aria-label="Beranda Bakorwil I Madiun">
          <span className="brand-primary">BAKORWIL</span>
          <span className="brand-secondary">&nbsp;I MADIUN</span>
        </Link>
      </div>

      {/* ── Nav Bar ── */}
      <nav className="navbar" aria-label="Navigasi utama" role="navigation">
        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? ' active' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          onClick={() => { setMenuOpen((v) => !v); setMobileOpen(null); }}
          type="button"
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>

        <ul
          id="nav-menu"
          className={`nav-menu${menuOpen ? ' open' : ''}`}
          role="menubar"
          aria-label="Menu utama"
        >
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isMobile={isMobile}
              mobileOpen={mobileOpen}
              onMobileToggle={handleMobileToggle}
            />
          ))}
        </ul>
      </nav>
    </header>
  );
}
