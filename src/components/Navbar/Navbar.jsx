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
      { label: 'Profil PPID', href: '/ppid/profil' },
      { label: 'Layanan Informasi', href: '/ppid/layanan-informasi' },
      {
        label: 'Dokumen PPID',
        children: [
          { label: 'Dokumen Anggaran', href: '/ppid/dokumen/anggaran' },
          { label: 'Dokumen Renstra', href: '/ppid/dokumen/renstra' },
          { label: 'Dokumen Kinerja', href: '/ppid/dokumen/kinerja' },
        ],
      },
      {
        label: 'Klasifikasi Informasi',
        children: [
          { label: 'Informasi Berkala', href: '/ppid/berkala' },
          { label: 'Informasi Serta Merta', href: '/ppid/serta-merta' },
          { label: 'Informasi Setiap Saat', href: '/ppid/setiap-saat' },
          { label: 'Informasi Dikecualikan', href: '/ppid/dikecualikan' },
          { label: 'Laporan Akses Informasi', href: '/ppid/laporan-akses-informasi' },
        ],
      },
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

/**
 * DropdownChild — render satu item di dalam dropdown-menu.
 * Bisa berupa link biasa ATAU sub-submenu (nested dropdown ke kanan).
 */
function DropdownChild({ child, isMobile, mobileOpenSub, onMobileSubToggle }) {
  const hasSubChildren = child.children && child.children.length > 0;
  // Gunakan label sebagai key unik untuk mobile sub-accordion
  const subKey = child.label;
  const isSubOpen = mobileOpenSub === subKey;

  if (!hasSubChildren) {
    return (
      <li className="dropdown-item" role="none">
        <Link className="dropdown-link" to={child.href} role="menuitem">
          {child.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      className={`dropdown-item has-submenu${isSubOpen ? ' submenu-mobile-open' : ''}`}
      role="none"
    >
      <button
        className={`dropdown-link dropdown-submenu-toggle${isSubOpen ? ' active' : ''}`}
        aria-haspopup="true"
        aria-expanded={isSubOpen}
        aria-label={`Submenu ${child.label}`}
        onClick={() => isMobile && onMobileSubToggle(subKey)}
        type="button"
      >
        {child.label}
        <span className="submenu-caret" aria-hidden="true">›</span>
      </button>
      <ul className="submenu" role="menu" aria-label={child.label}>
        {child.children.map((sub) => (
          <li key={sub.href} role="none">
            <Link className="dropdown-link submenu-link" to={sub.href} role="menuitem">
              {sub.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

function NavItem({ item, isMobile, mobileOpen, onMobileToggle }) {
  const hasChildren = item.children && item.children.length > 0;
  // State untuk mobile sub-accordion (level-2)
  const [mobileOpenSub, setMobileOpenSub] = useState(null);
  const handleMobileSubToggle = useCallback(
    (key) => setMobileOpenSub((prev) => (prev === key ? null : key)),
    []
  );

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
          <DropdownChild
            key={child.label}
            child={child}
            isMobile={isMobile}
            mobileOpenSub={mobileOpenSub}
            onMobileSubToggle={handleMobileSubToggle}
          />
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
