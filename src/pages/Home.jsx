import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider/HeroSlider';
import BeritaTerbaruSection from '../components/BeritaTerbaru/BeritaTerbaruSection';
import './Home.css';

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
  const [slides, setSlides]       = useState([]);
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading]     = useState(true);

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
      const [slidersData, breakingData] = await Promise.all([
        apiFetch('/sliders', controller.signal),
        apiFetch('/berita?breaking=1', controller.signal),
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

      /* ── Berita breaking: API returns flat array [{ id, judul, slug, ... }] ── */
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

      {/* ── Berita Terbaru ── */}
      <BeritaTerbaruSection onNavigateToBerita={handleNavigateToBerita} />
    </main>
  );
}
