/*
  lightbox.js
  Click-to-enlarge photo viewer for the project gallery on projects.html.
  Clicking any gallery photo opens it full-size with its caption, with
  previous/next navigation and keyboard (Esc, arrow keys) support. Only
  ever shows cards that are currently visible, so it respects whatever
  the search/filter toolbar has narrowed the gallery down to.
*/

(function () {
  "use strict";

  var lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  var imageEl = document.getElementById("lightbox-image");
  var captionEl = document.getElementById("lightbox-caption");
  var prevBtn = document.getElementById("lightbox-prev");
  var nextBtn = document.getElementById("lightbox-next");
  var closeTriggers = lightbox.querySelectorAll("[data-lightbox-close]");

  var currentIndex = -1;

  function visibleCards() {
    var all = Array.prototype.slice.call(document.querySelectorAll(".project-card"));
    return all.filter(function (card) {
      return card.style.display !== "none";
    });
  }

  function openAt(index, cards) {
    cards = cards || visibleCards();
    if (index < 0 || index >= cards.length) return;
    currentIndex = index;

    var card = cards[index];
    var img = card.querySelector("img");
    var heading = card.querySelector("h3");
    var text = card.querySelector("p");

    imageEl.src = img.src;
    imageEl.alt = img.alt;
    captionEl.textContent = (heading ? heading.textContent : "") +
      (text ? " — " + text.textContent : "");

    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
  }

  function close() {
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
    imageEl.src = "";
    currentIndex = -1;
  }

  function step(delta) {
    var cards = visibleCards();
    if (!cards.length) return;
    var next = (currentIndex + delta + cards.length) % cards.length;
    openAt(next, cards);
  }

  document.querySelectorAll(".project-card").forEach(function (card) {
    card.style.cursor = "zoom-in";
    card.addEventListener("click", function () {
      var cards = visibleCards();
      var index = cards.indexOf(card);
      if (index === -1) return;
      openAt(index, cards);
    });
  });

  closeTriggers.forEach(function (el) {
    el.addEventListener("click", close);
  });

  prevBtn.addEventListener("click", function () { step(-1); });
  nextBtn.addEventListener("click", function () { step(1); });

  document.addEventListener("keydown", function (event) {
    if (lightbox.hidden) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
  });
})();
