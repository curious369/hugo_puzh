---
title: "Fast geschafft."
layout: "mpf-block"
url: "/de/profil/thanks/"
noindex: true
---

<div class="flex flex-col md:flex-row gap-8 items-center md:items-start">
  <img src="/images/chris-letter.webp" alt="Chris Mönninghoff" class="rounded-[18px] w-40 h-40 md:w-52 md:h-52 object-cover object-top shrink-0">
  <div class="space-y-4 text-lg text-gray-700 dark:text-gray-300">
    <p class="text-xl font-bold text-gray-900 dark:text-white">Prüfe dein Postfach und bestätige deine E-Mail.</p>
    <p>Nicht da? Schau im Spam-Ordner nach und markiere diese Adresse als vertrauenswürdig:</p>
    <p class="font-semibold text-[#007aff]">letter@puzh.com</p>
    <p>Sobald bestätigt, bist du dabei.</p>
    <p class="font-semibold">— Chris</p>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof confetti !== 'function') return;
    confetti({ particleCount: 70, spread: 70, startVelocity: 35, gravity: 0.9, ticks: 200, origin: { x: 0.5, y: 0.35 } });
  });
</script>
