import { useState, useEffect, useRef, useCallback } from 'react';
import './HeroSlider.css';

export default function HeroSlider({ slides = [], newsItems = [] }) {
  const [current, setCurrent]       = useState(0);
  const [paused, setPaused]         = useState(false);
  const [newsIndex, setNewsIndex]   = useState(0);
  const [prefersReduced, setReduced] = useState(false);
  // imgRatio = naturalWidth / naturalHeight gambar slide aktif.
  // Berlaku untuk SEMUA ukuran layar (bukan hanya mobile).
  // Fallback 16/6 ≈ 2.667 dipakai sebelum gambar pertama selesai load.
  const [imgRatio, setImgRatio]     = useState(16 / 6);

  const timerRef    = useRef(null);
  const containerRef = useRef(null);
  // Map: slide index → <img> DOM node, agar semua slide ter-track sekaligus
  const imgRefsMap  = useRef({});

  // ── Drag / swipe state (mouse & touch) ──
  const dragRef = useRef({ active: false, startX: 0, deltaX: 0, pointerId: null });
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const DRAG_THRESHOLD = 50; // px minimum untuk dianggap swipe, bukan klik

  /* ── prefers-reduced-motion ── */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const h = (e) => setReduced(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  /**
   * Hitung imgRatio dari elemen <img>.
   * Tidak ada pembatasan MOBILE_BP — berlaku untuk semua layar.
   * Inline style aspectRatio pada container akan PASTI menang vs CSS,
   * apapun media query atau specificity di HeroSlider.css.
   */
  const calcRatioFromImg = useCallback((imgEl) => {
    const { naturalWidth, naturalHeight } = imgEl;
    if (!naturalWidth || !naturalHeight) return;
    setImgRatio(naturalWidth / naturalHeight);
  }, []);

  /** Handler onLoad — dipasang ke setiap <img> slide */
  const onImgLoad = useCallback((e) => {
    calcRatioFromImg(e.target);
  }, [calcRatioFromImg]);

  /**
   * Re-hitung imgRatio setiap kali slide aktif berubah (current).
   *
   * Kenapa perlu ini:
   * - 'current' ada di dependency → effect re-run tiap ganti slide.
   * - imgRefsMap menyimpan semua node → langsung bisa baca node slide
   *   manapun tanpa menunggu render berikutnya.
   * - Cek img.complete → handle gambar cached (onLoad tidak fire untuk
   *   gambar yang sudah ada di cache browser).
   */
  useEffect(() => {
    if (slides.length === 0) return;
    const img = imgRefsMap.current[current];
    if (!img) return;
    if (img.complete && img.naturalWidth) {
      // Cached — onLoad tidak akan fire, hitung langsung
      calcRatioFromImg(img);
    }
    // Belum cached → onLoad akan fire → calcRatioFromImg dipanggil
  }, [slides, current, calcRatioFromImg]);

  /* ── Slide navigation ── */
  const goTo = useCallback(
    (idx) => setCurrent((idx + slides.length) % slides.length),
    [slides.length]
  );
  const prevSlide = useCallback(() => goTo(current - 1), [goTo, current]);
  const nextSlide = useCallback(() => goTo(current + 1), [goTo, current]);

  /* ── Auto-play ── */
  useEffect(() => {
    if (paused || slides.length <= 1 || prefersReduced) return;
    timerRef.current = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(timerRef.current);
  }, [paused, slides.length, current, goTo, prefersReduced]);

  /* ── Drag / swipe handlers (mouse + touch via Pointer Events) ── */
  const handlePointerDown = useCallback((e) => {
    if (slides.length <= 1) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      deltaX: 0,
      pointerId: e.pointerId,
    };
    setIsDragging(true);
    setPaused(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }, [slides.length]);

  const handlePointerMove = useCallback((e) => {
    if (!dragRef.current.active) return;
    const deltaX = e.clientX - dragRef.current.startX;
    dragRef.current.deltaX = deltaX;
    setDragOffset(deltaX);
  }, []);

  const endDrag = useCallback(() => {
    if (!dragRef.current.active) return;
    const { deltaX } = dragRef.current;

    if (deltaX <= -DRAG_THRESHOLD) {
      nextSlide();
    } else if (deltaX >= DRAG_THRESHOLD) {
      prevSlide();
    }

    dragRef.current = { active: false, startX: 0, deltaX: 0, pointerId: null };
    setDragOffset(0);
    setIsDragging(false);
    setPaused(false);
  }, [nextSlide, prevSlide]);

  const handlePointerUp = useCallback((e) => {
    e.currentTarget.releasePointerCapture?.(dragRef.current.pointerId);
    endDrag();
  }, [endDrag]);

  /* ── News ticker navigation ── */
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
        className={`hero-slider${isDragging ? ' hs-dragging' : ''}`}
        style={{
          // Inline style selalu menang vs CSS class/media-query.
          // aspectRatio dihitung dari naturalWidth/naturalHeight gambar asli
          // → container proporsional tanpa crop, untuk SEMUA ukuran layar.
          aspectRatio: imgRatio,
          height: 'auto',
          cursor: slides.length > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
          touchAction: 'pan-y',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); if (dragRef.current.active) endDrag(); }}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        aria-roledescription="carousel"
        aria-label="Slider gambar utama — geser untuk berpindah slide"
      >
        {/* Slides */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="hs-track"
          style={{
            transform: dragOffset ? `translateX(${dragOffset}px)` : undefined,
            transition: isDragging ? 'none' : undefined,
          }}
        >
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
                onLoad={onImgLoad}
                ref={(el) => {
                  // Simpan semua img node ke Map — bukan hanya yang aktif.
                  // useEffect dapat langsung baca node slide manapun
                  // tanpa menunggu re-render berikutnya.
                  if (el) imgRefsMap.current[idx] = el;
                  else delete imgRefsMap.current[idx];
                }}
              />
            </div>
          ))}
        </div>

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