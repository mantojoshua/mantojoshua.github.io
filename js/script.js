document.addEventListener('DOMContentLoaded', function () {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const certificateSection = document.getElementById('certificate');
  const turnstileWidget = document.getElementById('turnstile-widget');

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', function () {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', String(!isExpanded));
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function loadScript(src) {
    if (document.querySelector('script[data-src="' + src + '"]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    script.dataset.src = src;
    document.body.appendChild(script);
  }

  function observeAndLoad(element, src) {
    if (!element) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      loadScript(src);
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            loadScript(src);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '300px 0px' }
    );

    observer.observe(element);
  }

  observeAndLoad(certificateSection, 'https://cdn.credly.com/assets/utilities/embed.js');
  observeAndLoad(turnstileWidget, 'https://challenges.cloudflare.com/turnstile/v0/api.js');
});
