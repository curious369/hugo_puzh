---
title: "Newsletter Test"
date: 2025-11-17
draft: false
---

# Newsletter Test Page

<form data-newsletter-form
      data-project="PUZH Letter"
      data-optin-where="Test Page"
      data-language="DE">
  <div style="margin-bottom: 20px;">
    <input type="email"
           name="email"
           placeholder="Deine E-Mail"
           required
           style="padding: 10px; width: 300px; border: 1px solid #ccc; border-radius: 5px;" />
  </div>
  <button type="submit"
          style="padding: 10px 20px; background: #007aff; color: white; border: none; border-radius: 5px; cursor: pointer;">
    Newsletter abonnieren
  </button>
  <div data-feedback style="margin-top: 15px; padding: 10px;"></div>
</form>

<script src="/js/newsletter.js"></script>

<style>
[data-feedback] {
  border-radius: 5px;
}
[data-feedback].success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}
[data-feedback].error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>
