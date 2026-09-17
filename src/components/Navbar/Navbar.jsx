import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { fetchJson } from '../../lib/api';
import logoBarkorwil from '../../assets/logo-bakorwil-madiun.png';
import './Navbar.css';

/* ── Ikon sosmed untuk superbar ── */
function SbIconFacebook() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#1877F2"/>
      <path fill="white" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
function SbIconInstagram() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="sb-ig" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC80"/>
          <stop offset="30%" stopColor="#F77737"/>
          <stop offset="60%" stopColor="#E1306C"/>
          <stop offset="100%" stopColor="#405DE6"/>
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#sb-ig)"/>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="white" strokeWidth="2"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="white" strokeWidth="2"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function SbIconYouTube() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      aria-hidden="true">
      <path fill="#FF0000" d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon fill="#ffffff" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  );
}
function SbIconWhatsApp() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#25D366"/>
      <path fill="white" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  );
}

/**
 * Fallback statis — ditampilkan selama fetch API berlangsung
 * atau jika API tidak dapat dijangkau.
 * Urutan dan label harus konsisten dengan tabel ppid_klasifikasi.
 */
const KLASIFIKASI_FALLBACK = [
  { label: 'Informasi Berkala',          href: '/ppid/berkala' },
  { label: 'Informasi Serta Merta',      href: '/ppid/serta-merta' },
  { label: 'Informasi Setiap Saat',      href: '/ppid/setiap-saat' },
  { label: 'Informasi Dikecualikan',     href: '/ppid/dikecualikan' },
  { label: 'Laporan Akses Informasi',    href: '/ppid/laporan-akses-informasi' },
];

/**
 * Bangun array NAV_ITEMS dengan menginjeksikan daftar klasifikasi dinamis.
 * @param {Array<{label:string, href:string}>} klasifikasiItems
 */
function buildNavItems(klasifikasiItems) {
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
        { label: 'Sejarah',                href: '/profil/sejarah' },
      ],
    },
    { id: 'berita', label: 'BERITA', href: '/berita' },
    {
      id: 'ppid',
      label: 'PPID',
      children: [
        {
          label: 'Profil PPID',
          children: [
            { label: 'Seputar PPID',            href: '/ppid/profil' },
            { label: 'Visi dan Misi',            href: '/ppid/profil' },
            { label: 'Kelembagaan PPID',         href: '/ppid/profil' },
            { label: 'Struktur Organisasi PPID', href: '/ppid/profil' },
            { label: 'Maklumat Pelayanan',       href: '/ppid/maklumat-pelayanan' },
          ],
        },
        { label: 'Layanan Informasi', href: '/ppid/layanan-informasi' },
        {
          label: 'Dokumen PPID',
          children: [
            { label: 'SK PPID', href: '/ppid/dokumen/sk-ppid' },
            { label: 'DIP',     href: '/ppid/dokumen/dip/bakorwil-1-madiun' },
            { label: 'LLID',    href: '/ppid/dokumen/llid/bakorwil-1-madiun' },
          ],
        },
        {
          label: 'Klasifikasi Informasi',
          // Diisi dari API; fallback ke statis jika API gagal
          children: klasifikasiItems,
        },
      ],
    },
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
  // Mulai dari fallback; akan di-replace dengan data API saat fetch selesai
  const [klasifikasiItems, setKlasifikasiItems] = useState(KLASIFIKASI_FALLBACK);
  const navRef = useRef(null);

  // Fetch daftar klasifikasi dari API saat Navbar pertama kali mount
  useEffect(() => {
    const ctrl = new AbortController();

    fetchJson('/ppid/klasifikasi', { signal: ctrl.signal })
      .then((data) => {
        const raw = Array.isArray(data) ? data : (data?.data ?? []);
        // Validasi minimal: setiap item harus punya label & href
        const valid = raw.filter((d) => d?.label && d?.href);
        if (valid.length > 0) {
          setKlasifikasiItems(valid);
        }
        // Jika API kembalikan array kosong, tetap pakai fallback
      })
      .catch((err) => {
        // Jika fetch di-abort (React StrictMode / unmount), abaikan
        // Jika error jaringan/server, biarkan fallback tetap aktif
        if (err?.name !== 'AbortError') {
          console.warn('[Navbar] Gagal memuat klasifikasi dari API, menggunakan data statis.', err?.message);
        }
      });

    return () => ctrl.abort();
  }, []);

  // Rebuild NAV_ITEMS setiap kali klasifikasiItems berubah
  const navItems = buildNavItems(klasifikasiItems);

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
    <>
      {/* ── Non-sticky: superbar + topbar (ikut scroll) ── */}
      <header className="site-header">

        {/* ── Super Bar (teal tipis di atas header putih) ── */}
        <div className="superbar">
          <div className="superbar-sosmed" aria-label="Media sosial">
            <a href="https://www.instagram.com/bakorwilmadiun_/" className="superbar-sosmed-btn"
              aria-label="Instagram Bakorwil I Madiun" target="_blank" rel="noopener noreferrer">
              <SbIconInstagram />
            </a>
            <a href="https://www.facebook.com/bakorwilmdn/" className="superbar-sosmed-btn"
              aria-label="Facebook Bakorwil I Madiun" target="_blank" rel="noopener noreferrer">
              <SbIconFacebook />
            </a>
            <a href="https://www.youtube.com/@bakorwilmadiun" className="superbar-sosmed-btn"
              aria-label="YouTube Bakorwil I Madiun" target="_blank" rel="noopener noreferrer">
              <SbIconYouTube />
            </a>
            <a href="https://wa.me/6281234567890" className="superbar-sosmed-btn"
              aria-label="WhatsApp Bakorwil I Madiun" target="_blank" rel="noopener noreferrer">
              <SbIconWhatsApp />
            </a>
          </div>
        </div>

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
            />
          ))}
        </ul>
      </nav>
    </>
  );
}
