(function () {
  var KEY = 'algoxy-consent';

  function loadAnalytics() {
    // GA4
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-2MZ9V6ELL8';
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-2MZ9V6ELL8');

    // Clarity
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', 'x5a6m1knt4');
  }

  var stored = localStorage.getItem(KEY);

  // Already accepted — fire analytics immediately, no banner
  if (stored === 'accepted') { loadAnalytics(); return; }

  // Already declined — do nothing, no banner
  if (stored === 'declined') { return; }

  // No stored choice yet — show banner
  function showBanner() {
    var banner = document.getElementById('cookieBanner');
    if (!banner) return;

    // Slide in after a short delay
    setTimeout(function () { banner.classList.add('visible'); }, 600);

    function hideBanner() {
      banner.classList.remove('visible');
      banner.style.opacity = '0';
      banner.style.pointerEvents = 'none';
      setTimeout(function () { banner.style.display = 'none'; }, 450);
    }

    // Attach both click and touchend so mobile taps always register
    function addTapListener(id, fn) {
      var el = document.getElementById(id);
      if (!el) return;
      var handled = false;
      function handle(e) {
        if (handled) return;
        handled = true;
        e.preventDefault();
        fn();
      }
      el.addEventListener('touchend', handle, { passive: false });
      el.addEventListener('click', handle);
    }

    addTapListener('cookieAccept', function () {
      localStorage.setItem(KEY, 'accepted');
      loadAnalytics();
      hideBanner();
    });

    addTapListener('cookieDecline', function () {
      localStorage.setItem(KEY, 'declined');
      hideBanner();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showBanner);
  } else {
    showBanner();
  }
})();
