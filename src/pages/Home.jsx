import { useState, useEffect } from 'react';
import HeroSlider from '../components/HeroSlider/HeroSlider';
import './Home.css';

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
      console.warn(`[SIMBA API] fetch failed for ${path}:`, err.message);
    }
    return null;
  }
}

export default function Home() {
  const [slides, setSlides]       = useState([]);
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      setLoading(true);

      const [slidersData, breakingData] = await Promise.all([
        apiFetch('/api/sliders', controller.signal),
        apiFetch('/api/berita?breaking=1', controller.signal),
      ]);

      /* ── Map API responses to component props ── */
      if (slidersData?.data ?? slidersData) {
        const raw = slidersData?.data ?? slidersData;
        setSlides(
          Array.isArray(raw)
            ? raw.map((s) => ({
                id:    s.id,
                image: s.image_url ?? `${API_URL}/storage/${s.image}`,
                alt:   s.title ?? s.alt ?? `Slide ${s.id}`,
              }))
            : []
        );
      }

      if (breakingData?.data ?? breakingData) {
        const raw = breakingData?.data ?? breakingData;
        setNewsItems(
          Array.isArray(raw)
            ? raw.map((n) => ({
                id:   n.id,
                text: n.judul ?? n.title ?? n.text,
                href: n.url ?? `/berita/${n.slug ?? n.id}`,
              }))
            : []
        );
      }

      setLoading(false);
    })();

    return () => controller.abort();
  }, []);

  return (
    <main id="main-content" aria-label="Halaman beranda Bakorwil I Madiun">
      {/* ── Hero Slider ── */}
      <section aria-label="Banner dan berita utama">
        {loading ? (
          <div className="home-skeleton" aria-busy="true" aria-label="Memuat slider…">
            <div className="home-skeleton__slider" />
            <div className="home-skeleton__ticker" />
          </div>
        ) : (
          <HeroSlider slides={slides} newsItems={newsItems} />
        )}
      </section>

      {/* ─── Placeholder content below slider ─── */}
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
