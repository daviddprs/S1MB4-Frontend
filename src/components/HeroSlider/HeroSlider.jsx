import { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import './HeroSlider.css';

export default function HeroSlider({ slides = [], newsItems = [] }) {
  const [current, setCurrent]           = useState(0);
  const [paused, setPaused]             = useState(false);
  const [tickerPaused, setTickerPaused] = useState(false); // pause ticker CSS animation via onPause/onResume
  const [prefersReduced, setReduced]    = useState(false);
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

  /* ── News ticker data ── */
  const ticker = newsItems.length > 0
    ? newsItems
    : [{ id: '_def', text: 'Selamat datang di website resmi Bakorwil I Madiun.', href: '#' }];


  if (slides.length === 0) {
    return (
      <div className="hero-slider hero-slider--empty" aria-label="Slider gambar">
        <div className="hs-empty">
          <span aria-hidden="true">🖼️</span>
          <p>Belum ada slide</p>
        </div>
        {/* Still show ticker */}
        <TickerBar
          ticker={ticker}
          prefersReduced={prefersReduced}
          onPause={() => setTickerPaused(true)}
          onResume={() => setTickerPaused(false)}
        />
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

        {/* Tombol panah — hanya tampil di mobile (CSS: hs-arrow--mobile-only) */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              className="hs-arrow hs-arrow--prev hs-arrow--mobile-only"
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              aria-label="Slide sebelumnya"
            >
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden="true">
                <path d="M8 2L2 8l6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="hs-arrow hs-arrow--next hs-arrow--mobile-only"
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              aria-label="Slide berikutnya"
            >
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden="true">
                <path d="M2 2l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}

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
        prefersReduced={prefersReduced}
        onPause={() => setTickerPaused(true)}
        onResume={() => setTickerPaused(false)}
      />
    </section>
  );
}

/* ─── Ticker sub-component ───
 *  Marquee running-text: semua items dirender 2× (duplikasi) di dalam
 *  .hs-ticker__track, animasi geser -50% → seamless infinite loop.
 *  Pola identik dengan .home-wilayah__track yang sudah ada di project.
 *  - prefersReduced → tambah class --reduced → CSS nonaktifkan animasi
 *  - hover ticker → CSS pause animation-play-state
 *  - Link tiap item tetap clickable meski sedang bergerak
 */
function TickerBar({ ticker, prefersReduced, onPause, onResume }) {
  /* Render 1 set lengkap: semua items + separator di antaranya */
  function renderSet(keySuffix) {
    return ticker.map((item, idx) => (
      <Fragment key={`${item.id}-${keySuffix}`}>
        {/* Separator sebelum setiap item (termasuk pertama) supaya jarak
            antara item terakhir set-1 dan item pertama set-2 konsisten */}
        <span className="hs-ticker__sep" aria-hidden="true">•</span>
        <a
          href={item.href}
          className="hs-ticker__item"
          title={item.text}
          aria-label={`Berita: ${item.text}`}
        >
          {item.text}
        </a>
      </Fragment>
    ));
  }

  return (
    <div
      className={`hs-ticker${prefersReduced ? ' hs-ticker--reduced' : ''}`}
      role="complementary"
      aria-label="Berita terkini"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      onFocus={onPause}
      onBlur={onResume}
    >
      {/* Badge */}
      <div className="hs-ticker__badge">Breaking News</div>

      {/* Scroll wrapper — clips overflow */}
      <div className="hs-ticker__scroll" aria-hidden="false">
        {/* Track — dirender 2× untuk seamless loop (animasi geser -50%) */}
        <div className="hs-ticker__track">
          {renderSet('a')}
          {renderSet('b')}
        </div>
      </div>

      {/* Accessible fallback: hanya untuk screen reader, tidak terlihat */}
      <div className="sr-only" aria-live="polite">
        {ticker.map((item) => (
          <a key={item.id} href={item.href}>{item.text}</a>
        ))}
      </div>
    </div>
  );
}