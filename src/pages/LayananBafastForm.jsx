import './Profil.css';

/* ── Ikon eksternal ── */
function ExternalLinkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"
      style={{ flexShrink: 0 }}>
      <path d="M6 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 1h5v5M14 1 7.5 7.5"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const FORMULIR = [
  {
    id: 'peminjaman',
    judul: 'Formulir Peminjaman',
    desc: 'Gunakan formulir ini untuk mengajukan permohonan peminjaman fasilitas atau kegiatan melalui program Bakorwil Madiun Fasilitasi (BAFAST).',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSfRoUlKdZCdr4u-Nx1fafTdL2eP6eLh7mOyOuK8yd_qKJwRrg/viewform',
    icon: '📋',
  },
  {
    id: 'pembatalan',
    judul: 'Formulir Pembatalan',
    desc: 'Gunakan formulir ini apabila Anda perlu membatalkan permohonan fasilitasi yang telah diajukan sebelumnya.',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSfSG6iTCDB8dtvUkt6h0SzIAv8fvqQUOqmOyECNdEPYn44jpQ/viewform',
    icon: '❌',
  },
];

export default function LayananBafastForm() {
  return (
    <main className="pr-page" aria-label="Formulir BAFAST — Bakorwil Madiun Fasilitasi">
      <div className="pr-page__inner">

        {/* ── Page header ── */}
        <header className="pr-header">
          <h1 className="pr-header__title">Formulir Bakorwil Madiun Fasilitasi</h1>
          <div className="pr-header__bar" aria-hidden="true" />
          <p className="pr-header__desc">
            Program Bakorwil Madiun Fasilitasi (BAFAST) menyediakan layanan fasilitasi
            bagi masyarakat dan instansi yang memerlukan bantuan koordinasi dari
            Bakorwil I Madiun. Pilih formulir yang sesuai di bawah ini.
          </p>
        </header>

        {/* ── Dua kolom formulir ── */}
        <div className="pr-layout">
          <div className="pr-content">
            <section aria-labelledby="heading-formulir">
              <h2 className="pr-section__heading" id="heading-formulir">FORMULIR LAYANAN</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {FORMULIR.map((form) => (
                  <div key={form.id} className="pr-info-card">
                    {/* Header kartu */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <span style={{
                        fontSize: '1.8rem', lineHeight: 1,
                        width: '48px', height: '48px', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(13,154,166,0.07)', borderRadius: '10px',
                        flexShrink: 0,
                      }} aria-hidden="true">
                        {form.icon}
                      </span>
                      <div>
                        <p style={{
                          margin: 0,
                          fontWeight: 700,
                          fontSize: '1rem',
                          color: 'var(--pr-text, #1e3540)',
                          fontFamily: 'Inter, system-ui, sans-serif',
                        }}>
                          {form.judul}
                        </p>
                      </div>
                    </div>

                    {/* Deskripsi */}
                    <p className="pr-section__text" style={{ marginBottom: '16px' }}>
                      {form.desc}
                    </p>

                    {/* Tombol */}
                    <a
                      href={form.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`btn-${form.id}`}
                      aria-label={`Buka ${form.judul} di tab baru`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                        justifyContent: 'center',
                        padding: '12px 20px',
                        background: 'linear-gradient(135deg, #1a5fb4, #1248a0)',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        boxShadow: '0 3px 12px rgba(26,95,180,0.3)',
                        transition: 'box-shadow 0.2s, transform 0.15s',
                        letterSpacing: '0.02em',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(26,95,180,0.45)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 3px 12px rgba(26,95,180,0.3)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      Buka {form.judul} <ExternalLinkIcon />
                    </a>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Kolom kanan */}
          <aside className="pr-sidebar" aria-label="Informasi tambahan">
            <img
              src="/logo-bakorwil.png"
              alt="Logo Bakorwil I Madiun"
              className="pr-sidebar__img"
              loading="lazy"
              style={{ padding: '16px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 14px rgba(13,154,166,0.08)' }}
            />
            <div className="pr-info-card" style={{ marginTop: '20px' }}>
              <p className="pr-section__heading" style={{ marginBottom: '10px' }}>INFO PENTING</p>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#5e8694', lineHeight: 1.7, fontFamily: 'Inter, system-ui, sans-serif' }}>
                Formulir ini akan diteruskan kepada petugas Bakorwil I Madiun.
                Pastikan data yang Anda isi lengkap dan benar. Untuk informasi
                lebih lanjut, hubungi:{' '}
                <a href="mailto:bakorwilmadiun@jatimprov.go.id"
                  style={{ color: '#0d9aa6', textDecoration: 'none', fontWeight: 600 }}>
                  bakorwilmadiun@jatimprov.go.id
                </a>
              </p>
            </div>
          </aside>
        </div>

      </div>
    </main>
  );
}
