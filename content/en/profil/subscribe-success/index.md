---
title: "🟢 Great, you've confirmed your email."
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
    <span id="toast-message">Message</span>
  </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-6 px-6" style="background-color: #ffffff;">

  <!-- TEXT LEFT -->
  <div class="space-y-4 text-[18px] pt-4 pl-4 pr-4 pb-4 text-gray-900 dark:text-white">
    <h1 class="text-xl font-bold text-left text-gray-900 dark:text-white">
      Welcome to the PUZH community!
    </h1>
    <div class="text-gray-900 dark:text-white">
      Your email has been successfully confirmed.<br /><br />
      To personalize your experience, please add your first name below:
    </div>

    <!-- Form -->
    <form id="profile-form" class="space-y-4 pt-4">
      <!-- Email (readonly) -->
      <div>
        <label for="email" class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Your Email</label>
        <input
          type="email"
          id="email"
          name="email"
          readonly
          class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
          placeholder="your@email.com"
        />
      </div>

      <!-- First Name -->
      <div>
        <label for="firstname" class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Your First Name</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007aff] dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          placeholder="Your first name"
        />
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        id="submit-btn"
        class="w-full py-3 px-6 text-white font-semibold rounded-lg transition-colors duration-200"
        style="background-color: #007aff;"
        onmouseover="this.style.backgroundColor='#0056b3'"
        onmouseout="this.style.backgroundColor='#007aff'"
      >
        Save First Name
      </button>
    </form>

    <div class="text-gray-900 dark:text-white pt-4">
      You'll receive exclusive insights, tips, and updates directly to your inbox.
    </div>

    <p class="text-gray-900 dark:text-white">Your Chris | SoloCreator</p>

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

  <!-- IMAGE RIGHT -->
  <div class="flex justify-center items-start pt-4 pb-4 pr-4 pl-4">
    <img src="/images/letterchris-side.webp"
         alt="Chris"
         class="rounded-[23px] shadow-md w-full max-w-[400px] h-auto object-cover object-top" />
  </div>

</div>

<script>
  document.addEventListener("DOMContentLoaded", async () => {
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

    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    let email = params.get("email") || "";
    const token = params.get("token");

    // Token confirmation logic
    if (token) {
      try {
        const confirmRes = await fetch(`https://letter.puzh.com/confirm?token=${token}`);
        const confirmData = await confirmRes.json();

        if (confirmRes.ok && confirmData.success) {
          // Token confirmed successfully
          email = confirmData.email || email;
          document.getElementById('email').value = email;
          triggerConfetti();
          showToast("✅ Email confirmed! Now add your first name.", "success");
        } else {
          // Token invalid or expired - redirect to link-expired
          window.location.href = "/profil/link-expired/";
          return;
        }
      } catch (err) {
        console.error("Token confirmation error:", err);
        showToast("Confirmation error. Please try again.", "error");
        window.location.href = "/profil/link-expired/";
        return;
      }
    } else if (email) {
      document.getElementById('email').value = email;
    } else {
      window.location.href = "/profil/link-expired/";
      return;
    }

    // Handle form submission
    document.getElementById('profile-form').addEventListener('submit', async function(e) {
      e.preventDefault();

      const submitBtn = document.getElementById('submit-btn');
      const firstname = document.getElementById('firstname').value.trim();

      if (!firstname || !email) {
        showToast("Please enter your first name", "error");
        return;
      }

      // Disable button during submission
      submitBtn.disabled = true;
      submitBtn.textContent = 'Saving...';

      try {
        const res = await fetch("https://api.puzh.com/send-newsletter-email.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, first_name: firstname })
        });

        if (!res.ok) {
          let errorText = "Server error";
          try {
            const errJson = await res.json();
            errorText = errJson.error || "Server error";
          } catch {
            errorText = `Server error (${res.status})`;
          }
          showToast(errorText, "error");
          submitBtn.disabled = false;
          submitBtn.textContent = 'Save First Name';
          return;
        }

        const payload = await res.json();

        if (payload.redirect && typeof payload.redirect === "string") {
          if (/^https?:\/\//.test(payload.redirect) || payload.redirect.startsWith("/")) {
            window.location.href = payload.redirect;
            return;
          }
        }

        // Show success
        showToast("First name successfully saved!");
        submitBtn.textContent = '✓ Saved';
        submitBtn.style.backgroundColor = '#10b981';
      } catch (error) {
        console.error('Error:', error);
        showToast("Network error. Please try again.", 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Save First Name';
      }
    });
  });
</script>
