---
title: "⏰ Link abgelaufen"
layout: "mpf-block"
---

<div class="max-w-2xl mx-auto mt-12 px-6 text-center">
  <h1 class="text-2xl font-bold text-[#111] mb-4">
    Dein Bestätigungslink ist leider abgelaufen
  </h1>

  <p class="text-lg text-gray-700 mb-8">
    Kein Problem! Du kannst dir einen neuen Bestätigungslink zusenden lassen.
  </p>

  <form id="resendForm" class="max-w-md mx-auto space-y-4">
    <input
      type="email"
      id="email"
      name="email"
      placeholder="Deine E-Mail-Adresse"
      required
      class="block w-full border border-gray-300 rounded-full py-3 px-4 text-base text-center"
    />

    <button
      type="submit"
      id="resendBtn"
      class="w-full bg-[#007aff] text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
    >
      <span id="btn-text">Neuen Link anfordern</span>
      <span id="btn-spinner" class="hidden">⏳ Wird gesendet...</span>
    </button>

    <div id="feedback" class="mt-4 text-sm"></div>
  </form>
</div>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resendForm");
  const emailInput = document.getElementById("email");
  const btn = document.getElementById("resendBtn");
  const btnText = document.getElementById("btn-text");
  const btnSpinner = document.getElementById("btn-spinner");
  const feedback = document.getElementById("feedback");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    if (!email) {
      feedback.innerHTML = '<span class="text-red-600">❌ Bitte E-Mail-Adresse eingeben</span>';
      return;
    }

    btnText.classList.add("hidden");
    btnSpinner.classList.remove("hidden");
    btn.disabled = true;
    feedback.innerHTML = "";

    try {
      const res = await fetch("https://letter.puzh.com/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        feedback.innerHTML = '<span class="text-green-600">✅ ' + data.message + '</span>';
        emailInput.value = "";
      } else {
        feedback.innerHTML = '<span class="text-red-600">❌ ' + (data.error || 'Fehler aufgetreten') + '</span>';
      }
    } catch (error) {
      feedback.innerHTML = '<span class="text-red-600">❌ Verbindungsfehler</span>';
    } finally {
      btnText.classList.remove("hidden");
      btnSpinner.classList.add("hidden");
      btn.disabled = false;
    }
  });
});
</script>
