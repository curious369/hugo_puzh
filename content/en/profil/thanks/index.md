---
title: "🎉 Thanks for signing up!"
layout: "mpf-block"
---

<!-- Canvas Confetti Library -->
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

<!-- Toast Notification -->
<div id="toast" class="fixed left-1/2 transform -translate-x-1/2" style="top: -200px; z-index: 10001;">
  <div class="text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2" style="background-color: #007aff;">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <span id="toast-message">Your signup to the <strong>PUZH Newsletter</strong> was successful!</span>
  </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-6 px-6 bg-white dark:bg-gray-800">
  <!-- IMAGE LEFT -->
  <div class="flex justify-center items-start pt-4 pb-4 pr-4 pl-4">
    <img src="/images/chris-moenninghoff-head.webp"
         alt="Chris"
         class="rounded-[23px] shadow-md w-full max-w-[400px] h-auto object-cover object-top" />
  </div>

  <!-- TEXT RIGHT -->
  <div class="space-y-4 text-[18px] pt-4 pl-4 pr-4 pb-4 text-gray-900 dark:text-white">
    <h1 class="text-xl font-bold text-left text-gray-900 dark:text-white">
      Almost there…
    </h1>
    <div>
      Please check your email inbox and confirm your email address. <br /><br />
      If you don't see my email yet, please also check your spam folder and add my email<br />
      </div>
      <p class="font-semibold text-[#007aff]">news@puzh.com<br />
    <div>  to your trusted senders.
      This way you'll make sure to be on my list.<br />
      Thanks in advance.<br />
  </div>
  <p>Your Chris | SoloCreator</p>
  <h1 class="text-xl font-bold text-left text-gray-900 dark:text-white pt-6">
      Follow me here:
    </h1>

  <!-- Social Icons -->
<style>
  .social-icon {
    font-size: 1.5rem;
    transition: color 0.2s ease;
  }

  .youtube-icon {
    color: #FF0000;
  }
  .youtube-icon:hover {
    color: #cc0000;
  }

  .instagram-icon {
    color: #E1306C;
  }
  .instagram-icon:hover {
    color: #C13584;
  }

  .linkedin-icon {
    color: #0A66C2;
  }
  .linkedin-icon:hover {
    color: #004182;
  }

  .x-icon {
    color: #000000;
  }
  .x-icon:hover {
    color: #555555;
  }
</style>

<div class="flex gap-4 pt-4 text-xl">
  <a href="https://youtube.com/@puzh.channel" target="_blank" class="social-icon youtube-icon" aria-label="YouTube">
    <i class="bi bi-youtube"></i>
  </a>

  <a href="https://linkedin.com/company/puzh" target="_blank" class="social-icon linkedin-icon" aria-label="LinkedIn">
    <i class="bi bi-linkedin"></i>
  </a>
  <a href="https://instagram.com/puzh.official" target="_blank" class="social-icon instagram-icon" aria-label="Instagram">
    <i class="bi bi-instagram"></i>
  </a>
</div>
</div>

</div>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    // Toast Notification Function
    function showToast(message, type = 'success') {
      const toast = document.getElementById('toast');
      const toastMessage = document.getElementById('toast-message');
      const toastDiv = toast.firstElementChild;

      toastMessage.innerHTML = message;

      if (type === 'error') {
        toastDiv.style.backgroundColor = '#dc2626';
      } else {
        toastDiv.style.backgroundColor = '#007aff';
      }

      toast.style.transition = 'top 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
      toast.style.top = '20px';

      setTimeout(() => {
        toast.style.transition = 'top 1.2s ease-in-out';
        toast.style.top = '-200px';
      }, 3000);
    }

    // Confetti Function
    function triggerConfetti() {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }));
        confetti(Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }));
      }, 250);
    }

    triggerConfetti();
    showToast("Your signup to the <strong>PUZH Newsletter</strong> was successful!");
  });
</script>
