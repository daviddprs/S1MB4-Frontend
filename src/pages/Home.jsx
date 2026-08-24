import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider/HeroSlider';
import BeritaTerbaruSection from '../components/BeritaTerbaru/BeritaTerbaruSection';
import lambangMagetan      from '../assets/lambang-magetan.png';
import lambangMadiun       from '../assets/lambang-madiun.png';
import lambangKotaMadiun   from '../assets/lambang-kota-madiun.png';
import lambangPonorogo     from '../assets/lambang-ponorogo.png';
import lambangNgawi        from '../assets/lambang-ngawi.png';
import lambangPacitan      from '../assets/lambang-pacitan.png';
import lambangKediri       from '../assets/lambang-kediri.png';
import lambangKotaKediri   from '../assets/lambang-kota-kediri.png';
import lambangTrenggalek   from '../assets/lambang-trenggalek.png';
import lambangTulungagung  from '../assets/lambang-tulungagung.png';
import './Home.css';

/* ── Data wilayah Bakorwil I Madiun (10 daerah, 5 per halaman) ── */
const WILAYAH = [
  { name: 'Kab. Magetan',     href: 'https://magetankab.go.id',      logo: lambangMagetan },
  { name: 'Kab. Madiun',      href: 'https://madiunkab.go.id',       logo: lambangMadiun },
  { name: 'Kota Madiun',      href: 'https://madiunkota.go.id',      logo: lambangKotaMadiun },
  { name: 'Kab. Ponorogo',    href: 'https://ponorogo.go.id',        logo: lambangPonorogo },
  { name: 'Kab. Ngawi',       href: 'https://ngawikab.go.id',        logo: lambangNgawi },
  { name: 'Kab. Pacitan',     href: 'https://pacitankab.go.id',      logo: lambangPacitan },
  { name: 'Kab. Kediri',      href: 'https://kedirikab.go.id',       logo: lambangKediri },
  { name: 'Kota Kediri',      href: 'https://kedirikota.go.id',      logo: lambangKotaKediri },
  { name: 'Kab. Trenggalek',  href: 'https://trenggalekkab.go.id',   logo: lambangTrenggalek },
  { name: 'Kab. Tulungagung', href: 'https://tulungagungkab.go.id',  logo: lambangTulungagung },
];
const WILAYAH_PER_PAGE = 5;

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
  const navigate = useNavigate();
  const [slides, setSlides]           = useState([]);
  const [newsItems, setNewsItems]     = useState([]);
  const [latestNews, setLatestNews]   = useState([]);
  const [loading, setLoading]         = useState(true);
  const [wilayahOffset, setWilayahOffset] = useState(0);

  const maxOffset = WILAYAH.length - WILAYAH_PER_PAGE;
  const prevWilayah = () => setWilayahOffset((o) => Math.max(0, o - 1));
  const nextWilayah = () => setWilayahOffset((o) => Math.min(maxOffset, o + 1));
  const visibleWilayah = WILAYAH.slice(wilayahOffset, wilayahOffset + WILAYAH_PER_PAGE);

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
                      <Link
                        to={`/berita/${item.slug}`}
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

      {/* ─── Wilayah Section ─── */}
      <section className="home-wilayah" aria-label="Wilayah Bakorwil I Madiun">
        <div className="home-wilayah__inner">
          <div className="home-wilayah__header">
            <h2 className="home-wilayah__title">WILAYAH BAKORWIL I MADIUN</h2>
            <div className="home-wilayah__nav" aria-label="Navigasi wilayah">
              <button
                className="home-wilayah__btn"
                onClick={prevWilayah}
                aria-label="Wilayah sebelumnya"
                type="button"
                disabled={wilayahOffset === 0}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M7 2L3 5L7 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                className="home-wilayah__btn"
                onClick={nextWilayah}
                aria-label="Wilayah berikutnya"
                type="button"
                disabled={wilayahOffset >= maxOffset}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M3 2L7 5L3 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="home-wilayah__logos">
            {visibleWilayah.map((w) => (
              <a
                key={w.name}
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
      </section>

      {/* ── Berita Terbaru ── */}
      <BeritaTerbaruSection onNavigateToBerita={handleNavigateToBerita} />
    </main>
  );
}
