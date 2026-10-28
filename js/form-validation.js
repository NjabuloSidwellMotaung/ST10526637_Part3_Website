/*
  form-validation.js
  Client-side validation for the enquiry form (enquiry.html) and the
  general contact form (contact.html). Nothing here sends an email or
  talks to a server — there isn't one. Each form is validated for real,
  then a compiled preview of what would be sent is built and shown in
  the page, which is an honest stand-in for the "no backend yet" state
  of this student project. The WhatsApp button next to each form is the
  one path that actually reaches the business right now.
*/

(function () {
  "use strict";

  function showError(input, message) {
    var errorEl = document.getElementById(input.id + "-error");
    if (errorEl) {
      errorEl.textContent = message || "";
    }
    input.classList.toggle("is-invalid", Boolean(message));
  }

  function validateField(input) {
    if (input.validity.valueMissing) {
      showError(input, "This field is required.");
      return false;
    }
    if (input.validity.tooShort) {
      showError(input, "Please enter at least " + input.minLength + " characters.");
      return false;
    }
    if (input.validity.patternMismatch) {
      showError(input, "Please check the format and try again.");
      return false;
    }
    if (input.validity.typeMismatch) {
      showError(input, "Please enter a valid value.");
      return false;
    }
    showError(input, "");
    return true;
  }

  function validateForm(form) {
    var fields = form.querySelectorAll("input[required], select[required], textarea[required]");
    var allValid = true;
    fields.forEach(function (field) {
      if (!validateField(field)) {
        allValid = false;
      }
    });
    return allValid;
  }

  function wireLiveValidation(form) {
    var fields = form.querySelectorAll("input, select, textarea");
    fields.forEach(function (field) {
      field.addEventListener("blur", function () {
        validateField(field);
      });
      field.addEventListener("input", function () {
        if (field.classList.contains("is-invalid")) {
          validateField(field);
        }
      });
    });
  }

  function setupEnquiryForm() {
    var form = document.getElementById("enquiry-form");
    if (!form) return;

    wireLiveValidation(form);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var responseEl = document.getElementById("enquiry-response");
      if (!validateForm(form)) {
        if (responseEl) {
          responseEl.hidden = true;
        }
        return;
      }

      var data = new FormData(form);
      var name = data.get("name");
      var phone = data.get("phone");
      var suburb = data.get("suburb");
      var service = data.get("service");
      var message = data.get("message");

      if (responseEl) {
        responseEl.innerHTML =
          "<strong>Enquiry validated.</strong> Here's the preview of what would be sent once a backend is connected:<br>" +
          "<em>From:</em> " + escapeHtml(name) + " (" + escapeHtml(phone) + ")<br>" +
          "<em>Area:</em> " + escapeHtml(suburb) + "<br>" +
          "<em>Service:</em> " + escapeHtml(service) + "<br>" +
          "<em>Details:</em> " + escapeHtml(message) + "<br><br>" +
          "Nothing was actually emailed &mdash; use the WhatsApp button above for a real reply right now.";
        responseEl.hidden = false;
      }
      form.reset();
    });
  }

  function setupContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    wireLiveValidation(form);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var responseEl = document.getElementById("contact-response");
      if (!validateForm(form)) {
        if (responseEl) {
          responseEl.hidden = true;
        }
        return;
      }

      var data = new FormData(form);
      var name = data.get("name");
      var email = data.get("email");
      var type = data.get("type");
      var message = data.get("message");

      if (responseEl) {
        responseEl.innerHTML =
          "<strong>Message validated.</strong> Here's the email that would be compiled and sent to " +
          "<em>desentralprojects@gmail.com</em> once a backend is connected:<br>" +
          "<em>From:</em> " + escapeHtml(name) + " &lt;" + escapeHtml(email) + "&gt;<br>" +
          "<em>Subject:</em> " + escapeHtml(type) + "<br>" +
          "<em>Message:</em> " + escapeHtml(message) + "<br><br>" +
          "Nothing was actually emailed &mdash; call, WhatsApp or email us directly for a reply right now.";
        responseEl.hidden = false;
      }
      form.reset();
    });
  }

  function escapeHtml(value) {
    var div = document.createElement("div");
    div.textContent = value == null ? "" : value;
    return div.innerHTML;
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupEnquiryForm();
    setupContactForm();
  });
})();
