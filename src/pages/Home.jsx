import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider/HeroSlider';
import BeritaTerbaruSection from '../components/BeritaTerbaru/BeritaTerbaruSection';
import KategoriBeritaSection from '../components/KategoriBerita/KategoriBeritaSection';
import { WILAYAH } from '../data/wilayah';
import './Home.css';

/* ── Data wilayah diimport dari src/data/wilayah.js (shared dengan ProfilWilayahKerja) ── */


/* ── Date formatter ── */
function formatDate(iso) {
  if (!iso) return null;
  try {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

/* ── Kategori label map ── */
const LABEL_KATEGORI = {
  umum:  'Umum',
  jatim: 'Jatim',
  ejsc:  'EJSC',
};

/* ── Eye icon untuk views ── */
function EyeIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"
      style={{ flexShrink: 0 }}>
      <path d="M1 5.5C1 5.5 2.5 2 5.5 2S10 5.5 10 5.5 8.5 9 5.5 9 1 5.5 1 5.5z"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="5.5" cy="5.5" r="1.5"
        stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  );
}

import { fetchJson } from '../lib/api';

/**
 * Generic fetch wrapper for Home.jsx that catches errors and returns null
 * to maintain the resilient behavior of the original apiFetch.
 */
async function apiFetch(path, signal) {
  try {
    return await fetchJson(path, { signal });
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.warn(`[SIMBA API] fetch failed for ${path}:`, err.message);
    }
    return null;
  }
}

export default function Home() {
  const navigate = useNavigate();
  const [slides, setSlides]           = useState([]);
  const [newsItems, setNewsItems]     = useState([]);
  const [latestNews, setLatestNews]   = useState([]);
  const [loading, setLoading]         = useState(true);
  // wilayahOffset tidak lagi diperlukan — section wilayah kini pakai marquee otomatis

  /**

   * Navigasi ke halaman Berita.
   * id !== null → buka detail berita dengan id tersebut.
   * id === null  → buka daftar berita.
   */
  function handleNavigateToBerita(id) {
    navigate('/berita', { state: id != null ? { openId: id } : undefined });
  }

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      setLoading(true);

      // Path tanpa prefix /api karena API_URL sudah berakhiran /api
      const [slidersData, breakingData, latestData] = await Promise.all([
        apiFetch('/sliders', controller.signal),
        apiFetch('/berita?breaking=1', controller.signal),
        apiFetch('/berita?per_page=3', controller.signal),  // sidebar: max 3 item
      ]);

      /* ── Slider: API returns flat array [{ id, gambar, url_tujuan, urutan }] ── */
      const rawSliders = Array.isArray(slidersData)
        ? slidersData
        : (slidersData?.data ?? []);

      setSlides(
        rawSliders.map((s) => ({
          id:    s.id,
          // Field gambar sudah berupa URL lengkap dari backend (asset('storage/...'))
          image: s.gambar ?? s.image_url ?? s.image ?? '',
          alt:   s.url_tujuan
                   ? `Slide menuju ${s.url_tujuan}`
                   : `Slide ${s.id}`,
          href:  s.url_tujuan ?? null,
        }))
      );

      /* ── Berita breaking ticker ── */
      const rawBerita = Array.isArray(breakingData)
        ? breakingData
        : (breakingData?.data ?? []);

      setNewsItems(
        rawBerita.map((n) => ({
          id:   n.id,
          text: n.judul ?? n.title ?? n.text ?? '',
          href: n.url ?? `/berita/${n.slug ?? n.id}`,
        }))
      );

      /* ── Berita terbaru (panel kanan) ── */
      const rawLatest = Array.isArray(latestData)
        ? latestData
        : (latestData?.data ?? []);

      setLatestNews(
        rawLatest.map((n) => ({
          id:         n.id,
          judul:      n.judul ?? n.title ?? '',
          slug:       n.slug ?? n.id,
          tanggal:    n.created_at ?? null,
          gambar_url: n.gambar_url ?? n.gambar ?? n.image_url ?? n.image ?? null,
          penulis:    n.penulis ?? null,   // nama user author dari API
          views:      n.views ?? 0,        // jumlah kali dilihat
          kategori:   n.kategori ?? 'umum', // kategori berita
        }))
      );

      setLoading(false);
    })();

    return () => controller.abort();
  }, []);

  return (
    <main id="main-content" aria-label="Halaman beranda Bakorwil I Madiun">
      {/* ── Hero + Berita Terbaru (2-kolom) ── */}
      <section aria-label="Banner dan berita utama">
        {loading ? (
          <div className="home-hero-layout">
            <div className="home-skeleton home-hero-layout__slider" aria-busy="true" aria-label="Memuat slider…">
              <div className="home-skeleton__slider" />
              <div className="home-skeleton__ticker" />
            </div>
            <div className="home-hero-layout__sidebar home-skeleton__sidebar" aria-hidden="true" />
          </div>
        ) : (
          <div className="home-hero-layout">
            {/* Kolom kiri: slider (75%) */}
            <div className="home-hero-layout__slider">
              <HeroSlider slides={slides} newsItems={newsItems} />
            </div>

            {/* Kolom kanan: berita terbaru (25%) */}
            <aside className="home-hero-layout__sidebar" aria-label="Berita terbaru">
              <div className="home-sidebar__header">
                <span className="home-sidebar__badge">Berita Terbaru</span>
              </div>
              <ul className="home-sidebar__list" role="list">
                {latestNews.length === 0 ? (
                  <li className="home-sidebar__empty">Belum ada berita.</li>
                ) : (
                  latestNews.map((item) => (
                    <li key={item.id} className="home-sidebar__item">
                      <Link
                        to={`/berita/${item.slug}`}
                        className="home-sidebar__link"
                        aria-label={`Baca: ${item.judul}`}
                      >
                        {/* Thumbnail — tampil jika ada gambar, placeholder jika tidak */}
                        <div className="home-sidebar__thumb-wrap">
                          {item.gambar_url ? (
                            <img
                              src={item.gambar_url}
                              alt=""
                              className="home-sidebar__thumb"
                              loading="lazy"
                              aria-hidden="true"
                            />
                          ) : (
                            <div className="home-sidebar__thumb-placeholder" aria-hidden="true">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <rect x="1" y="1" width="16" height="16" rx="2" stroke="#9db8c4" strokeWidth="1.2"/>
                                <path d="M1 12l4-4 3 3 3-4 6 6" stroke="#9db8c4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="6" cy="6" r="1.5" fill="#9db8c4"/>
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Teks: judul + baris (tanggal · views · badge) */}
                        <div className="home-sidebar__text">
                          <span className="home-sidebar__title">{item.judul}</span>
                          <div className="home-sidebar__meta">
                            {item.tanggal && (
                              <time
                                className="home-sidebar__date"
                                dateTime={item.tanggal}
                                style={{ margin: 0 }}
                              >
                                {formatDate(item.tanggal)}
                              </time>
                            )}
                            <span className="home-sidebar__meta-dot" aria-hidden="true">·</span>
                            <span className="home-sidebar__views" aria-label={`${item.views} kali dilihat`}>
                              <EyeIcon />
                              {(item.views ?? 0).toLocaleString('id-ID')}x
                            </span>
                            <span
                              className={`home-sidebar__kategori home-sidebar__kategori--${item.kategori ?? 'umum'}`}
                              aria-label={`Kategori: ${LABEL_KATEGORI[item.kategori] ?? item.kategori}`}
                            >
                              {LABEL_KATEGORI[item.kategori] ?? item.kategori}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
              <Link to="/berita" className="home-sidebar__more" aria-label="Lihat semua berita">
                Lihat Semua Berita →
              </Link>
            </aside>
          </div>
        )}
      </section>

      {/* ─── Wilayah Section — auto-scroll marquee ─── */}
      <section className="home-wilayah" aria-label="Wilayah Bakorwil I Madiun">
        <div className="home-wilayah__inner">
          <div className="home-wilayah__header">
            <h2 className="home-wilayah__title">WILAYAH BAKORWIL I MADIUN</h2>
          </div>
          {/* Marquee di DALAM inner — ter-clip di batas max-width yang sama dengan judul */}
          <div className="home-wilayah__marquee-wrap">
            <div className="home-wilayah__track">
              {[...WILAYAH, ...WILAYAH, ...WILAYAH].map((w, i) => (
                <a
                  key={`${w.name}-${i}`}
                  href={w.href}
                  className="home-wilayah__item"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Website resmi ${w.name}`}
                >
                  <img
                    src={w.logo}
                    alt={`Lambang ${w.name}`}
                    className="home-wilayah__logo"
                    loading="lazy"
                  />
                  <span className="home-wilayah__name">{w.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Berita Terbaru ── */}
      <BeritaTerbaruSection onNavigateToBerita={handleNavigateToBerita} />

      {/* ── Berita Jatim ── */}
      <KategoriBeritaSection
        kategori="jatim"
        judulSection="BERITA JATIM"
        warnaBadge="#2563eb"
        onNavigate={handleNavigateToBerita}
      />

      {/* ── Berita EJSC ── */}
      <KategoriBeritaSection
        kategori="ejsc"
        judulSection="BERITA EJSC"
        warnaBadge="#f59e0b"
        onNavigate={handleNavigateToBerita}
      />
    </main>
  );
}
