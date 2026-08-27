import './Profil.css';

/* ── Google Maps embed — sama dengan Footer ── */
const MAPS_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31636.57274888182!2d111.52875088039548!3d-7.621504390965603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79be56503dac8d%3A0x34ae6448236d0a9f!2sBadan%20Koordinasi%20Wilayah%20Pemerintahan%20dan%20Pembangunan%20Provinsi%20Jawa%20Timur%20(BAKORWIL%20I)%20di%20Madiun!5e0!3m2!1sid!2sid!4v1787542006438!5m2!1sid!2sid';

/* ── SVG icons ── */
function IconPin() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
function IconPhone() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}
function IconMail() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

export default function ProfilKedudukanAlamat() {
  return (
    <main className="pr-page" aria-label="Kedudukan dan Alamat Bakorwil I Madiun">
      <div className="pr-page__inner">

        {/* ── Page header ── */}
        <header className="pr-header">
          <h1 className="pr-header__title">Kedudukan dan Alamat</h1>
          <div className="pr-header__bar" aria-hidden="true" />
          <p className="pr-header__desc">
            Informasi kedudukan kelembagaan dan alamat kantor Bakorwil I Madiun.
          </p>
        </header>

        {/* ── Two-column layout ── */}
        <div className="pr-layout">

          {/* Kolom kiri: konten */}
          <div className="pr-content">

            {/* KEDUDUKAN */}
            <section className="pr-section" aria-labelledby="heading-kedudukan">
              <h2 className="pr-section__heading" id="heading-kedudukan">KEDUDUKAN</h2>
              <p className="pr-section__text">
                Badan Koordinasi Wilayah Pemerintahan dan Pembangunan Provinsi Jawa Timur
                di Madiun merupakan salah satu Organisasi Perangkat Daerah Pemerintah
                Provinsi Jawa Timur, dipimpin oleh seorang Kepala Badan yang berkedudukan
                di bawah dan bertanggung jawab kepada Gubernur Jawa Timur melalui
                Sekretaris Daerah Provinsi Jawa Timur.
              </p>
            </section>

            {/* ALAMAT */}
            <section className="pr-section" aria-labelledby="heading-alamat">
              <h2 className="pr-section__heading" id="heading-alamat">ALAMAT</h2>
              <div className="pr-info-card">
                <p className="pr-info-card__name">
                  Badan Koordinasi Wilayah Pemerintahan dan Pembangunan Provinsi Jawa Timur
                  di Madiun (Bakorwil I Madiun)
                </p>
                <ul className="pr-contact-list" aria-label="Informasi kontak kantor">
                  <li className="pr-contact-item">
                    <span className="pr-contact-icon"><IconPin /></span>
                    <span>Jl. Pahlawan No. 31 Kota Madiun</span>
                  </li>
                  <li className="pr-contact-item">
                    <span className="pr-contact-icon"><IconPhone /></span>
                    <a href="tel:0351464151">(0351) 464151</a>
                  </li>
                  <li className="pr-contact-item">
                    <span className="pr-contact-icon"><IconMail /></span>
                    <a href="mailto:bakorwilmadiun@jatimprov.go.id">
                      bakorwilmadiun@jatimprov.go.id
                    </a>
                  </li>
                </ul>
              </div>
            </section>

          </div>

          {/* Kolom kanan: gambar */}
          <aside className="pr-sidebar" aria-label="Foto kantor">
            <img
              src="/logo-bakorwil.png"
              alt="Logo Bakorwil I Madiun"
              className="pr-sidebar__img"
              loading="lazy"
              style={{ padding: '16px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 14px rgba(13,154,166,0.08)' }}
            />
          </aside>

        </div>

        {/* ── Google Maps (lebar penuh) ── */}
        <section aria-labelledby="heading-maps" style={{ marginTop: '8px' }}>
          <h2 className="pr-section__heading" id="heading-maps">LOKASI</h2>
          {/* Info card lokasi */}
          <div className="pr-info-card" style={{ marginBottom: '20px' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#1e3540', lineHeight: 1.6 }}>
              <strong>Badan Koordinasi Wilayah Pemerintahan dan Pembangunan Provinsi Jawa Timur
              (BAKORWIL I) di Madiun</strong>
              <br />
              Jl. Pahlawan No.31, Madiun Lor, Kec. Manguharjo, Kota Madiun,
              Jawa Timur 63122
            </p>
          </div>
          <div className="pr-map-wrap">
            <iframe
              title="Lokasi Kantor Bakorwil I Madiun"
              src={MAPS_EMBED_SRC}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Peta lokasi kantor Bakorwil I Madiun di Google Maps"
            />
          </div>
        </section>

      </div>
    </main>
  );
}
