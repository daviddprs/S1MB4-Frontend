import { WILAYAH } from '../data/wilayah';
import './Profil.css';

export default function ProfilWilayahKerja() {
  return (
    <main className="pr-page" aria-label="Wilayah Kerja Bakorwil I Madiun">
      <div className="pr-page__inner">

        {/* ── Page header ── */}
        <header className="pr-header">
          <h1 className="pr-header__title">Wilayah Kerja Bakorwil I Madiun</h1>
          <div className="pr-header__bar" aria-hidden="true" />
          <p className="pr-header__desc">
            Bakorwil I Madiun memiliki wilayah kerja yang mencakup 10 (sepuluh)
            kabupaten/kota di wilayah barat daya Provinsi Jawa Timur.
          </p>
        </header>

        {/* ── Grid wilayah ── */}
        <section aria-labelledby="heading-wilayah">
          <h2 className="pr-section__heading" id="heading-wilayah"
            style={{ marginBottom: '24px' }}>
            DAERAH WILAYAH KERJA
          </h2>

          <div className="pr-wilayah-grid" role="list"
            aria-label="Daftar kabupaten/kota wilayah kerja Bakorwil I Madiun">
            {WILAYAH.map((daerah) => (
              <a
                key={daerah.name}
                href={daerah.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pr-wilayah-card pr-wilayah-card--link"
                role="listitem"
                aria-label={`Website resmi ${daerah.name}`}
              >
                <img
                  src={daerah.logo}
                  alt={`Lambang ${daerah.name}`}
                  className="pr-wilayah-card__logo"
                  loading="lazy"
                  width="80"
                  height="80"
                />
                <p className="pr-wilayah-card__name">{daerah.name.toUpperCase()}</p>
              </a>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
