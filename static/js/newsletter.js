/**
 * Newsletter Subscription Handler
 * Handles all newsletter forms on puzh.com
 * Sends to Cloudflare Worker at letter.puzh.com
 */

const NEWSLETTER_API = 'https://letter.puzh.com/subscribe';

/**
 * Initialize newsletter form handlers
 */
document.addEventListener('DOMContentLoaded', function() {
  // Find all newsletter forms
  const forms = document.querySelectorAll('form[data-newsletter-form]');

  forms.forEach(form => {
    form.addEventListener('submit', handleNewsletterSubmit);
  });
});

/**
 * Handle newsletter form submission
 */
async function handleNewsletterSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const emailInput = form.querySelector('input[name="email"]');
  const submitButton = form.querySelector('button[type="submit"]');
  const feedbackDiv = form.querySelector('[data-feedback]');

  if (!emailInput || !emailInput.value) {
    showFeedback(form, 'error', 'Bitte gib eine E-Mail-Adresse ein.');
    return;
  }

  // Disable button during submission
  const originalButtonText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Wird gesendet...';

  try {
    // Get form data
    const email = emailInput.value.trim();
    const project = form.dataset.project || 'PUZH Letter HOME';
    const optInWhere = form.dataset.optinWhere || getPageLocation();
    const language = form.dataset.language || 'DE';

    // Send to Cloudflare Worker
    const response = await fetch(NEWSLETTER_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        project,
        optInWhere,
        language
      })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      // Success - redirect to thank you page
      const redirectUrl = data.redirect || `/profil/danke?email=${encodeURIComponent(email)}`;
      window.location.href = redirectUrl;
    } else {
      // Error from API
      showFeedback(form, 'error', data.error || 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    }

  } catch (error) {
    console.error('Newsletter submission error:', error);
    showFeedback(form, 'error', 'Verbindungsfehler. Bitte versuche es später erneut.');
  } finally {
    // Re-enable button
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
}

/**
 * Show feedback message to user
 */
function showFeedback(form, type, message) {
  // Find or create feedback div
  let feedbackDiv = form.querySelector('[data-feedback]');

  if (!feedbackDiv) {
    feedbackDiv = document.createElement('div');
    feedbackDiv.setAttribute('data-feedback', '');
    feedbackDiv.className = 'mt-3 text-sm';
    form.appendChild(feedbackDiv);
  }

  // Set styles based on type
  if (type === 'success') {
    feedbackDiv.className = 'mt-3 text-sm text-green-600 font-semibold';
    feedbackDiv.textContent = '✅ ' + message;
  } else if (type === 'error') {
    feedbackDiv.className = 'mt-3 text-sm text-red-600 font-semibold';
    feedbackDiv.textContent = '❌ ' + message;
  }

  // Show message
  feedbackDiv.style.display = 'block';

  // Hide after 5 seconds
  setTimeout(() => {
    feedbackDiv.style.display = 'none';
  }, 5000);
}

/**
 * Get current page location for tracking
 */
function getPageLocation() {
  const path = window.location.pathname;

  if (path === '/' || path === '/index.html') {
    return 'Homepage';
  } else if (path.includes('/puzh-letter/')) {
    return 'PUZH Letter Page';
  } else if (path.includes('/ueber-mich/')) {
    return 'Über Mich Page';
  } else if (path.includes('/buecher/')) {
    return 'Bücher Page';
  } else {
    return 'Other: ' + path;
  }
}
