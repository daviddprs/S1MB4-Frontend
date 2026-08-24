import { useState, useEffect } from 'react';
import HeroSlider from '../components/HeroSlider/HeroSlider';
import './Home.css';

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

// VITE_API_URL sudah berisi /api (misal: http://localhost:8000/api)
// apiFetch menerima path TANPA prefix /api, misal '/sliders'
const API_URL = import.meta.env.VITE_API_URL ?? '';

/**
 * Generic fetch helper — returns null on error so the
 * component can show a fallback instead of crashing.
 */
async function apiFetch(path, signal) {
  try {
    const res = await fetch(`${API_URL}${path}`, { signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.warn(`[SIMBA API] fetch failed for ${API_URL}${path}:`, err.message);
    }
    return null;
  }
}

export default function Home() {
  const [slides, setSlides]         = useState([]);
  const [newsItems, setNewsItems]   = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      setLoading(true);

      // Path tanpa prefix /api karena API_URL sudah berakhiran /api
      const [slidersData, breakingData, latestData] = await Promise.all([
        apiFetch('/sliders', controller.signal),
        apiFetch('/berita?breaking=1', controller.signal),
        apiFetch('/berita?per_page=5', controller.signal),
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
          id:   n.id,
          judul: n.judul ?? n.title ?? '',
          slug:  n.slug ?? n.id,
          tanggal: n.created_at ?? null,
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
                      <a
                        href={`/berita/${item.slug}`}
                        className="home-sidebar__link"
                        aria-label={`Baca: ${item.judul}`}
                      >
                        <span className="home-sidebar__title">{item.judul}</span>
                        {item.tanggal && (
                          <time
                            className="home-sidebar__date"
                            dateTime={item.tanggal}
                          >
                            {formatDate(item.tanggal)}
                          </time>
                        )}
                      </a>
                    </li>
                  ))
                )}
              </ul>
              <a href="/berita" className="home-sidebar__more" aria-label="Lihat semua berita">
                Lihat Semua Berita →
              </a>
            </aside>
          </div>
        )}
      </section>

      {/* ─── Welcome section below ─── */}
      <section className="home-welcome" aria-labelledby="welcome-heading">
        <div className="home-welcome__inner">
          <h1 id="welcome-heading" className="home-welcome__title">
            Selamat Datang di Website Resmi
            <br />
            <span>Bakorwil I Madiun</span>
          </h1>
          <p className="home-welcome__sub">
            Badan Koordinasi Wilayah I Madiun — Provinsi Jawa Timur
          </p>
          <div className="home-welcome__divider" aria-hidden="true" />
          <p className="home-welcome__desc">
            Bakorwil I Madiun bertugas mengkoordinasikan penyelenggaraan pemerintahan,
            pembangunan, dan pemberdayaan masyarakat di wilayah Madiun, Ponorogo,
            Pacitan, Magetan, dan Ngawi.
          </p>
        </div>
      </section>
    </main>
  );
}
