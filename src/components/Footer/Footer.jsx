import './Footer.css';

/* ── Ikon SVG inline ── */
function IconPin() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
function IconPhone() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}
function IconMail() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}
function IconYouTube() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="currentColor" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
    </svg>
  );
}

/* ── Data statis (ganti URL jika sudah ada akun resmi / website resmi) ── */
const KONTAK = {
  alamat: 'Jl. Pahlawan No. 31 Kota Madiun',
  telepon: '(0351) 464151',
  email: 'bakorwilmadiun@jatimprov.go.id',
  sosmed: [
    { label: 'Facebook',  href: 'https://www.facebook.com/bakorwilmdn/',      ariaLabel: 'Facebook Bakorwil I Madiun' },
    { label: 'Instagram', href: 'https://www.instagram.com/bakorwilmadiun_/', ariaLabel: 'Instagram Bakorwil I Madiun' },
    { label: 'YouTube',   href: 'https://www.youtube.com/@bakorwilmadiun',    ariaLabel: 'YouTube Bakorwil I Madiun' },
  ],
};

const MAPS_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31636.57274888182!2d111.52875088039548!3d-7.621504390965603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79be56503dac8d%3A0x34ae6448236d0a9f!2sBadan%20Koordinasi%20Wilayah%20Pemerintahan%20dan%20Pembangunan%20Provinsi%20Jawa%20Timur%20(BAKORWIL%20I)%20di%20Madiun!5e0!3m2!1sid!2sid!4v1787542006438!5m2!1sid!2sid';

const MAPS_OPEN_URL =
  'https://maps.app.goo.gl/auH4fWTi3azcm1Zz9';

const BAKORWIL_LINKS = [
  { label: 'Bakorwil I Madiun',      href: 'https://bakorwilmadiun.jatimprov.go.id',      active: true },
  { label: 'Bakorwil II Bojonegoro', href: 'https://bakorwilbojonegoro.jatimprov.go.id'             },
  { label: 'Bakorwil III Malang',    href: 'https://bakorwilmalang.jatimprov.go.id'                 },
  { label: 'Bakorwil IV Pamekasan',  href: 'https://bakorwilpamekasan.jatimprov.go.id'              },
  { label: 'Bakorwil V Jember',      href: 'https://bakorwiljember.jatimprov.go.id'                 },
];

/* ── Render ikon sosmed berdasarkan label ── */
function renderSosmedIcon(label) {
  if (label === 'Facebook')  return <IconFacebook />;
  if (label === 'Instagram') return <IconInstagram />;
  if (label === 'YouTube')   return <IconYouTube />;
  return null;
}

/* ══════════════════════════════════════════════════
   KOMPONEN FOOTER
══════════════════════════════════════════════════ */
export default function Footer() {
  return (
    <footer className="site-footer" aria-label="Footer situs Bakorwil I Madiun">
      <div className="footer-inner">

        {/* ── Kolom 1: Kontak ── */}
        <div className="footer-col">
          <h2 className="footer-col__title">KONTAK</h2>
          <ul className="footer-contact-list" aria-label="Informasi kontak">
            <li className="footer-contact-item">
              <span className="footer-contact-icon"><IconPin /></span>
              <span>{KONTAK.alamat}</span>
            </li>
            <li className="footer-contact-item">
              <span className="footer-contact-icon"><IconPhone /></span>
              <a href={`tel:${KONTAK.telepon.replace(/[^0-9]/g, '')}`}
                className="footer-link">{KONTAK.telepon}</a>
            </li>
            <li className="footer-contact-item">
              <span className="footer-contact-icon"><IconMail /></span>
              <a href={`mailto:${KONTAK.email}`}
                className="footer-link">{KONTAK.email}</a>
            </li>
          </ul>

          <h3 className="footer-follow-title">FOLLOW US</h3>
          <div className="footer-sosmed" role="list" aria-label="Media sosial">
            {KONTAK.sosmed.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="footer-sosmed__btn"
                aria-label={s.ariaLabel}
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
              >
                {renderSosmedIcon(s.label)}
              </a>
            ))}
          </div>
        </div>

        {/* ── Kolom 2: Lokasi ── */}
        <div className="footer-col">
          <h2 className="footer-col__title">LOKASI</h2>
          <div className="footer-map-wrap">
            <iframe
              title="Lokasi Kantor Bakorwil I Madiun"
              src={MAPS_EMBED_SRC}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="footer-map"
              aria-label="Peta lokasi kantor Bakorwil I Madiun"
            />
          </div>
        </div>

        {/* ── Kolom 3: Bakorwil Jatim ── */}
        <div className="footer-col">
          <h2 className="footer-col__title">BAKORWIL JATIM</h2>
          <ul className="footer-bakorwil-list" aria-label="Daftar Bakorwil Jawa Timur">
            {BAKORWIL_LINKS.map((b) => (
              <li key={b.label} className="footer-bakorwil-item">
                <a
                  href={b.href}
                  className={`footer-link footer-bakorwil-link${b.active ? ' active' : ''}`}
                  target={b.href !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-current={b.active ? 'page' : undefined}
                >
                  <span className="footer-bakorwil-dot" aria-hidden="true">›</span>
                  {b.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* ── Copyright bar ── */}
      <div className="footer-bottom" aria-label="Hak cipta">
        <p>
          © {new Date().getFullYear()} Bakorwil I Madiun — Badan Koordinasi Wilayah I Madiun,
          Provinsi Jawa Timur. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
