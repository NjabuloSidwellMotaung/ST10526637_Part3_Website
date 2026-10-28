/*
  accordion.js
  Simple accessible accordion for the FAQ section on about.html.
  Only one answer stays open at a time; aria-expanded and hidden are
  kept in sync so screen readers announce the state correctly.
*/

(function () {
  "use strict";

  var accordion = document.getElementById("faq-accordion");
  if (!accordion) return;

  var triggers = Array.prototype.slice.call(accordion.querySelectorAll(".accordion-trigger"));

  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      var isOpen = trigger.getAttribute("aria-expanded") === "true";

      triggers.forEach(function (other) {
        other.setAttribute("aria-expanded", "false");
        var otherPanel = document.getElementById(other.getAttribute("aria-controls"));
        if (otherPanel) otherPanel.hidden = true;
        other.closest(".accordion-item").classList.remove("is-open");
      });

      if (!isOpen) {
        trigger.setAttribute("aria-expanded", "true");
        panel.hidden = false;
        trigger.closest(".accordion-item").classList.add("is-open");
      }
    });
  });
})();
