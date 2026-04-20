const testimonialEl = document.querySelector('.testimonials-swiper');
if (window.Swiper && testimonialEl && !testimonialEl.swiper) {
  new Swiper(testimonialEl, {
    slidesPerView: 1,
    spaceBetween: 12,
    grabCursor: true,
    watchOverflow: true,
    pagination: { el: '.testimonials-pagination', clickable: true },
    breakpoints: { 1024: { slidesPerView: 2, spaceBetween: 24 } },
  });
}

(function () {
  const grid = document.getElementById('cal-skeleton-grid');
  if (!grid) return;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 7; i++) {
    const el = document.createElement('div');
    el.className = 'skeleton h-4 rounded';
    frag.appendChild(el);
  }
  [1,0,1,1,0,1,0, 0,1,1,0,1,1,0, 1,0,1,0,1,1,0, 0,1,1,0,1,0,1].forEach((active) => {
    const el = document.createElement('div');
    el.className = 'skeleton h-9 rounded-full' + (active ? '' : ' opacity-30');
    frag.appendChild(el);
  });
  grid.appendChild(frag);
})();

function hideSkeleton() {
  const skeleton = document.getElementById('calendly-skeleton');
  if (skeleton) {
    skeleton.classList.add('hidden');
    setTimeout(() => skeleton.remove(), 450);
  }
}

window.addEventListener('message', (e) => {
  if (e.origin === 'https://calendly.com' && e.data?.event === 'calendly.event_type_viewed') {
    hideSkeleton();
  }
});

function watchCalendlyIframe() {
  const widget = document.querySelector('.calendly-inline-widget');
  if (!widget) return;
  const obs = new MutationObserver(() => {
    const iframe = widget.querySelector('iframe');
    if (iframe) {
      obs.disconnect();
      iframe.addEventListener('load', hideSkeleton, { once: true });
      setTimeout(hideSkeleton, 6000);
    }
  });
  obs.observe(widget, { childList: true, subtree: true });
}

const contactSection = document.getElementById('contact');
if (contactSection) {
  const calObs = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    calObs.disconnect();
    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    s.onload = watchCalendlyIframe;
    document.head.appendChild(s);
  }, { rootMargin: '300px' });
  calObs.observe(contactSection);
}
