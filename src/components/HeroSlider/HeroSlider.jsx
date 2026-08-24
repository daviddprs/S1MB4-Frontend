import { useState, useEffect, useRef, useCallback } from 'react';
import './HeroSlider.css';

export default function HeroSlider({ slides = [], newsItems = [] }) {
  const [current, setCurrent]         = useState(0);
  const [paused, setPaused]           = useState(false);
  const [newsIndex, setNewsIndex]     = useState(0);
  const [prefersReduced, setReduced]  = useState(false);
  const [mobileHeight, setMobileHeight] = useState(null); // tinggi dinamis di mobile
  const timerRef     = useRef(null);
  const containerRef = useRef(null); // ref ke .hero-slider container
  const MOBILE_BP    = 600; // breakpoint mobile (px)

  /* prefers-reduced-motion */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const h = (e) => setReduced(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  /* Reset mobileHeight saat resize ke desktop */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > MOBILE_BP) setMobileHeight(null);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, [MOBILE_BP]);

  /**
   * Dipanggil saat <img> selesai load.
   * Hanya aktif di mobile — menghitung tinggi container dari rasio natural gambar
   * sehingga tidak ada letterbox (ruang kosong atas/bawah).
   */
  const onImgLoad = useCallback((e) => {
    if (window.innerWidth > MOBILE_BP || !containerRef.current) return;
    const { naturalWidth, naturalHeight } = e.target;
    if (!naturalWidth || !naturalHeight) return;
    const containerW = containerRef.current.offsetWidth;
    setMobileHeight(Math.round((containerW * naturalHeight) / naturalWidth));
  }, [MOBILE_BP]);

  /* Slide navigation */
  const goTo = useCallback(
    (idx) => setCurrent((idx + slides.length) % slides.length),
    [slides.length]
  );
  const prevSlide = useCallback(() => goTo(current - 1), [goTo, current]);
  const nextSlide = useCallback(() => goTo(current + 1), [goTo, current]);

  /* Auto-play */
  useEffect(() => {
    if (paused || slides.length <= 1 || prefersReduced) return;
    timerRef.current = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(timerRef.current);
  }, [paused, slides.length, current, goTo, prefersReduced]);

  /* News ticker navigation */
  const ticker = newsItems.length > 0
    ? newsItems
    : [{ id: '_def', text: 'Selamat datang di website resmi Bakorwil I Madiun.', href: '#' }];

  const prevNews = () => setNewsIndex((i) => (i - 1 + ticker.length) % ticker.length);
  const nextNews = () => setNewsIndex((i) => (i + 1) % ticker.length);

  if (slides.length === 0) {
    return (
      <div className="hero-slider hero-slider--empty" aria-label="Slider gambar">
        <div className="hs-empty">
          <span aria-hidden="true">🖼️</span>
          <p>Belum ada slide</p>
        </div>
        {/* Still show ticker */}
        <TickerBar ticker={ticker} newsIndex={newsIndex} prefersReduced={prefersReduced}
          prevNews={prevNews} nextNews={nextNews} />
      </div>
    );
  }

  return (
    <section className="hero-section" aria-label="Slider utama dan berita terkini">
      {/* ── SLIDER ── */}
      <div
        ref={containerRef}
        className="hero-slider"
        style={mobileHeight ? { height: mobileHeight } : undefined}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        aria-roledescription="carousel"
        aria-label="Slider gambar utama"
      >
        {/* Slides */}
        <div aria-live="polite" aria-atomic="true" className="hs-track">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`hs-slide${idx === current ? ' active' : ''}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${idx + 1} dari ${slides.length}`}
              aria-hidden={idx !== current}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="hs-img"
                draggable={false}
                loading={idx === 0 ? 'eager' : 'lazy'}
                onLoad={idx === current ? onImgLoad : undefined}
              />
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button className="hs-arrow hs-arrow--prev" onClick={prevSlide}
          aria-label="Slide sebelumnya" type="button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8L10 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="hs-arrow hs-arrow--next" onClick={nextSlide}
          aria-label="Slide berikutnya" type="button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 3L11 8L6 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Indicators — top right corner */}
        <div className="hs-indicators" role="tablist" aria-label="Pilih slide">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              className={`hs-dot${idx === current ? ' active' : ''}`}
              role="tab"
              aria-selected={idx === current}
              aria-label={`Slide ${idx + 1}`}
              onClick={() => goTo(idx)}
              type="button"
            />
          ))}
        </div>
      </div>

      {/* ── TICKER ── */}
      <TickerBar
        ticker={ticker}
        newsIndex={newsIndex}
        prefersReduced={prefersReduced}
        prevNews={prevNews}
        nextNews={nextNews}
      />
    </section>
  );
}

/* ─── Ticker sub-component ─── */
function TickerBar({ ticker, newsIndex, prefersReduced, prevNews, nextNews }) {
  const item = ticker[newsIndex];
  return (
    <div className="hs-ticker" role="complementary" aria-label="Berita terkini">
      {/* Badge */}
      <div className="hs-ticker__badge">
        Breaking News
      </div>

      {/* Scrolling text */}
      <div className="hs-ticker__text" aria-live="polite">
        <a
          href={item.href}
          className={`hs-ticker__marquee${prefersReduced ? ' reduced' : ''}`}
          aria-label={`Berita: ${item.text}`}
        >
          {item.text}
        </a>
      </div>

      {/* Prev / Next arrows */}
      <div className="hs-ticker__nav">
        <button
          className="hs-ticker__btn"
          onClick={prevNews}
          aria-label="Berita sebelumnya"
          type="button"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M7 2L3 5L7 8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className="hs-ticker__btn"
          onClick={nextNews}
          aria-label="Berita berikutnya"
          type="button"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M3 2L7 5L3 8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
