import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import logoBarkorwil from '../../assets/logo-bakorwil-madiun.png';
import './Navbar.css';




/**
 * Fallback statis — ditampilkan selama fetch API berlangsung
 * atau jika API tidak dapat dijangkau.
 * Urutan dan label harus konsisten dengan tabel ppid_klasifikasi.
 */
// URL menuju project PPID-Frontend yang terpisah.
// Untuk lokal: http://localhost:5174
// Untuk production: ganti ke subdomain, mis. https://ppid.bakorwilmadiun.jatimprov.go.id
const PPID_FRONTEND_URL = 'http://localhost:5174';

/**
 * Bangun array NAV_ITEMS dengan menginjeksikan daftar klasifikasi dinamis.
 * @param {Array<{label:string, href:string}>} klasifikasiItems
 */
/**
 * buildNavItems — kini tidak lagi memerlukan klasifikasiItems karena
 * menu PPID sudah menjadi link luar ke project PPID-Frontend.
 */
function buildNavItems() {
  return [
    { id: 'beranda', label: 'BERANDA', href: '/' },
    {
      id: 'profil',
      label: 'PROFIL',
      children: [
        { label: 'Visi Dan Misi',          href: '/profil/visi-misi' },
        { label: 'Tugas Dan Fungsi',        href: '/profil/tugas-fungsi' },
        { label: 'Kedudukan dan Alamat',   href: '/profil/kedudukan-alamat' },
        { label: 'Struktur Organisasi',    href: '/profil/struktur-organisasi' },
        { label: 'Wilayah Kerja',          href: '/profil/wilayah-kerja' },
        { label: 'Pejabat Struktural',     href: '/profil/pejabat-struktural' },
        { label: 'LHKPN-LHKAN',            href: '/profil/lhkpn-lhkan' },
        { label: 'Sejarah',                href: '/profil/sejarah' },
      ],
    },
    { id: 'berita', label: 'BERITA', href: '/berita' },
    // Menu PPID sekarang adalah link luar ke project PPID-Frontend (subdomain terpisah)
    { id: 'ppid', label: 'PPID', href: PPID_FRONTEND_URL, external: true },
    { id: 'ejsc', label: 'EJSC', href: '/ejsc' },
    {
      id: 'layanan',
      label: 'LAYANAN',
      children: [
        { label: 'Jadwal Kegiatan', href: '/layanan/jadwal-kegiatan' },
        { label: 'Formulir BAFAST', href: '/layanan/bafast-form' },
        { label: 'FAQ',             href: '/layanan/faq' },
      ],
    },
    { id: 'sakip-rb', label: 'SAKIP-RB', href: '/sakip-rb' },
    {
      id: 'inovasi',
      label: 'INOVASI',
      children: [
        { label: 'Dewa Resi', href: '/' },
        { label: 'Bafast', href: '/' },
        { label: 'B-Files', href: '/' },
        { label: 'Rumah Mas Bakrun', href: '/' },
        { label: 'KPR', href: '/' },
        { label: 'PRIMA', href: '/' },
        { label: 'Meafest', href: '/' },
        { label: 'Sinema', href: '/' },
        { label: 'SI ABDI', href: '/' },
        { label: 'SI MONEV', href: '/' },
      ],
    },
  ];
}


/**
 * DropdownChild — render satu item di dalam dropdown-menu.
 * Bisa berupa link biasa ATAU sub-submenu (nested dropdown ke kanan).
 */
function DropdownChild({ child, isMobile, mobileOpenSub, onMobileSubToggle, onCloseMenu }) {
  const hasSubChildren = child.children && child.children.length > 0;
  // Gunakan label sebagai key unik untuk mobile sub-accordion
  const subKey = child.label;
  const isSubOpen = mobileOpenSub === subKey;

  if (!hasSubChildren) {
    return (
      <li className="dropdown-item" role="none">
        <Link className="dropdown-link" to={child.href} role="menuitem" onClick={onCloseMenu}>
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
            <Link className="dropdown-link submenu-link" to={sub.href} role="menuitem" onClick={onCloseMenu}>
              {sub.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

function NavItem({ item, isMobile, mobileOpen, onMobileToggle, onCloseMenu }) {
  const hasChildren = item.children && item.children.length > 0;
  // State untuk mobile sub-accordion (level-2)
  const [mobileOpenSub, setMobileOpenSub] = useState(null);
  const handleMobileSubToggle = useCallback(
    (key) => setMobileOpenSub((prev) => (prev === key ? null : key)),
    []
  );

  if (!hasChildren) {
    // Link luar (external: true) — render <a> biasa, bukan <Link> react-router
    if (item.external) {
      return (
        <li className="nav-item" role="none">
          <a
            className="nav-link"
            href={item.href}
            role="menuitem"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onCloseMenu}
          >
            {item.label}
            <span style={{ fontSize: '0.6rem', marginLeft: '3px', opacity: 0.7 }} aria-hidden="true">↗</span>
          </a>
        </li>
      );
    }
    return (
      <li className="nav-item" role="none">
        <Link className="nav-link" to={item.href} role="menuitem" onClick={onCloseMenu}>
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
            onCloseMenu={onCloseMenu}
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

  // Menu PPID kini adalah link luar, tidak perlu fetch klasifikasi dari API
  const navItems = buildNavItems();

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

  // Tutup menu mobile sepenuhnya saat link diklik
  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false);
    setMobileOpen(null);
  }, []);

  return (
    <>
      {/* ── Non-sticky: superbar + topbar (ikut scroll) ── */}
      <header className="site-header">



        {/* ── Top Bar ── */}
        <div className="topbar">
          <Link to="/" className="brand-link" aria-label="Beranda Bakorwil I Madiun">
            <span className="brand-primary">BAKORWIL</span>
            <span className="brand-romawi">&nbsp;I</span>
            <span className="brand-secondary">&nbsp;MADIUN</span>
          </Link>
          <img
            src={logoBarkorwil}
            alt="Logo Bakorwil I Madiun Provinsi Jawa Timur"
            className="topbar-logo"
          />
        </div>

      </header>

      {/* ── Sticky: Nav Bar saja (menempel di atas saat scroll) ── */}
      <nav className="navbar" ref={navRef} aria-label="Navigasi utama" role="navigation">
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
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isMobile={isMobile}
              mobileOpen={mobileOpen}
              onMobileToggle={handleMobileToggle}
              onCloseMenu={handleCloseMenu}
            />
          ))}
        </ul>
      </nav>
    </>
  );
}
