---
title: "You're in."
layout: "mpf-block"
url: "/profil/subscribe-success/"
noindex: true
---

<div class="flex flex-col md:flex-row gap-8 items-center md:items-start">
  <img src="/images/letterchris-side.webp" alt="Chris Mönninghoff" class="rounded-[18px] w-40 h-40 md:w-52 md:h-52 object-cover object-top shrink-0">
  <div class="space-y-4 text-lg text-gray-700 dark:text-gray-300">
    <p class="text-xl font-bold text-gray-900 dark:text-white">Your email is confirmed. Welcome to PUZH.</p>
    <p>You'll be the first to hear what's coming. I'll be in touch personally.</p>
    <p class="font-semibold">— Chris</p>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof confetti !== 'function') return;
    var duration = 6000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 15, spread: 360, ticks: 200, gravity: 0.4, zIndex: 0 };
    function randomInRange(min, max) { return Math.random() * (max - min) + min; }
    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) { return clearInterval(interval); }
      var particleCount = 40 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount: particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount: particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  });
</script>
