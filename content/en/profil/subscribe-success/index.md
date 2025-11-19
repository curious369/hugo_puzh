---
title: "🟢 Great, your email has been confirmed!"
layout: "mpf-block"
---

<!-- Toast Notification (von oben reinslidend) -->
<div id="toast" class="fixed left-1/2 transform -translate-x-1/2" style="top: -200px; z-index: 10001;">
<div class="text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2" style="background-color: #007aff;">
<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
</svg>
<span id="toast-message">Successfully saved</span>
</div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-6 px-6"> <!-- Einheitliches Padding -->
<!-- 🟢 TEXT-BEREICH LINKS OBEN MIT GRÖSSERER SCHRIFT -->
<div class="space-y-4 text-[18px] pt-4 pl-4 pr-4 pb-4 text-gray-900 dark:text-white"> <!-- ⬅️ gleichmäßiges Padding oben/unten -->
<!-- HEADLINE -->
<h1 class="text-xl font-bold text-left">
Hey, by the way I'm Chris 👋
</h1>
<div>
If you'd like, add your first name now –
so I can personally address you in my emails.
</div>
<h1 class="text-xl font-bold text-left pt-6">
Add your first name now
</h1>

<form id="profileForm" class="space-y-3">
<input
type="email"
id="email"
name="email"
readonly
class="block w-full border border-gray-300 rounded-full bg-gray-100 text-center py-[10px] px-[14px] text-base text-gray-800 dark:bg-gray-700 dark:text-white dark:border-gray-600"
/>
<input
type="text"
id="firstName"
name="first_name"
placeholder="e.g. Felix"
required
class="block w-full border border-gray-300 rounded-full py-[10px] px-[14px] text-base text-center placeholder-gray-400 placeholder:font-semibold dark:bg-gray-700 dark:text-white dark:border-gray-600"
/>
<button
type="submit"
id="saveBtn"
class="w-full bg-[#007aff] text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 cursor-pointer disabled:cursor-wait disabled:opacity-75"
>
<span id="btn-text">Save first name</span>
<span id="btn-spinner" class="hidden">⏳ Saving...</span>
</button>
</form>

</div>

<!-- 🟢 BILD OBEN RECHTS EINGEPASST -->
<div class="flex justify-center items-start pt-4 pb-4 pr-4 pl-4"> <!-- ⬅️ gleichmäßiger Rand -->
<img src="/images/letterchris-side.webp"
alt="Chris"
class="rounded-[23px] shadow-md w-full max-w-[400px] h-auto object-cover object-top" />
</div>
</div>

<script>
document.addEventListener("DOMContentLoaded", async () => {
const params    = new URLSearchParams(window.location.search);
let email       = params.get("email") || "";
const token     = params.get("token");
const form      = document.getElementById("profileForm");
const emailIn   = document.getElementById("email");
const nameIn    = document.getElementById("firstName");
const btn       = document.getElementById("saveBtn");
const btnText   = document.getElementById("btn-text");
const btnSpinner = document.getElementById("btn-spinner");

// Toast Notification Function
function showToast(message, type = 'success') {
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');
const toastDiv = toast.firstElementChild;

// Set message
toastMessage.innerHTML = message;

// Set color based on type
if (type === 'error') {
toastDiv.style.backgroundColor = '#dc2626'; // red-600
} else {
toastDiv.style.backgroundColor = '#007aff'; // blue
}

// Slide down with bounce (schneller)
toast.style.transition = 'top 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
toast.style.top = '20px';

// Hide after 3 seconds with slower smooth transition
setTimeout(() => {
toast.style.transition = 'top 1.2s ease-in-out';
toast.style.top = '-200px';
}, 3000);
}

// Token confirmation logic
if (token) {
try {
const confirmRes = await fetch(`https://letter.puzh.com/confirm?token=${token}`);
const confirmData = await confirmRes.json();

if (confirmRes.ok && confirmData.success) {
// Token confirmed successfully
email = confirmData.email || email;
emailIn.value = email;
showToast("✅ Email confirmed! Add your first name now.", "success");
} else {
// Token invalid or expired - redirect to link-abgelaufen
window.location.href = "/profil/link-expired/";
return;
}
} catch (err) {
console.error("Token confirmation error:", err);
showToast("Confirmation error. Please try again.", "error");
}
} else if (email) {
emailIn.value = email;
}

form.addEventListener("submit", async (e) => {
e.preventDefault();
btnText.classList.add("hidden");
btnSpinner.classList.remove("hidden");
btn.disabled = true;

const firstName = nameIn.value.trim();
if (!firstName || !email) {
btnText.classList.remove("hidden");
btnSpinner.classList.add("hidden");
btn.disabled = false;
showToast("Please enter first name", "error");
return;
}

let res, payload;
try {
res = await fetch("https://letter.puzh.com/update-profile", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ email, first_name: firstName })
});
} catch (networkErr) {
btnText.classList.remove("hidden");
btnSpinner.classList.add("hidden");
btn.disabled = false;
showToast("Network error: " + networkErr.message, "error");
return;
}

// Wenn Status nicht 2xx, versuche zuerst, die Fehlermeldung aus JSON zu lesen
if (!res.ok) {
btnText.classList.remove("hidden");
btnSpinner.classList.add("hidden");
let errorText = "Server error";
try {
const errJson = await res.json();
errorText = errJson.error || "Server error";
} catch {
errorText = `Server error (${res.status})`;
}
showToast(errorText, "error");
btn.disabled = false;
return;
}

// Nun ist res.ok, wir parsen das JSON
try {
payload = await res.json();
} catch (parseErr) {
btnText.classList.remove("hidden");
btnSpinner.classList.add("hidden");
btn.disabled = false;
showToast("Invalid server response", "error");
return;
}

// Haben wir einen redirect?
if (payload.redirect && typeof payload.redirect === "string") {
// absolute oder relative URL?
if (/^https?:\/\//.test(payload.redirect) || payload.redirect.startsWith("/")) {
window.location.href = payload.redirect;
return;
}
}

// Statt Redirect einfach Erfolg anzeigen
btnText.classList.remove("hidden");
btnSpinner.classList.add("hidden");
btn.disabled = false;

// Show success toast
showToast("First name successfully saved!");
});
});
</script>
