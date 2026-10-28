/*
  gallery-filter.js
  Live search + trade-tag filtering for the project gallery on
  projects.html. Works entirely against the cards already in the page
  (no fetch, no data file) — it just shows or hides <figure> elements
  based on the search box and the active filter button.
*/

(function () {
  "use strict";

  var grid = document.getElementById("project-grid");
  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll(".project-card"));
  var searchInput = document.getElementById("project-search");
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll(".filter-btn"));
  var countEl = document.getElementById("gallery-count");

  var activeFilter = "all";

  function cardText(card) {
    return card.textContent.toLowerCase();
  }

  function applyFilters() {
    var query = (searchInput && searchInput.value || "").trim().toLowerCase();
    var visible = 0;

    cards.forEach(function (card) {
      var matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
      var matchesSearch = query === "" || cardText(card).indexOf(query) !== -1;
      var show = matchesFilter && matchesSearch;
      card.style.display = show ? "" : "none";
      if (show) visible += 1;
    });

    if (countEl) {
      countEl.textContent = visible === cards.length
        ? "Showing all " + cards.length + " projects."
        : "Showing " + visible + " of " + cards.length + " projects.";
    }
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  applyFilters();
})();
