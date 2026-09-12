(function () {
  "use strict";

  var WHATSAPP_NUMBER = "2349029108231";
  var DEFAULT_MESSAGE =
    "Hello Demon Coder, I'm interested in getting a website for my business. I'd like to discuss my project.";

  function waLink(message) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  }

  // ---------- Set default WhatsApp CTA links ----------
  document.querySelectorAll("#wa-contact-top, #wa-contact-final, #wa-float").forEach(function (el) {
    el.setAttribute("href", waLink(DEFAULT_MESSAGE));
  });

  // ---------- Mobile hamburger menu ----------
  var hamburger = document.getElementById("hamburger");
  var navlinks = document.getElementById("navlinks");
  if (hamburger && navlinks) {
    hamburger.addEventListener("click", function () {
      var isOpen = navlinks.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    navlinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navlinks.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------- "I NEED THIS" service buttons: prefill Website Type ----------
  var websiteType = document.getElementById("websiteType");
  document.querySelectorAll(".need-btn[data-service]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (websiteType) {
        websiteType.value = btn.getAttribute("data-service");
      }
    });
  });

  // ---------- Pricing "GET A FREE QUOTE" buttons: note the plan ----------
  var featuresField = document.getElementById("features");
  document.querySelectorAll("[data-plan]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var plan = btn.getAttribute("data-plan");
      if (featuresField && featuresField.value.indexOf("Plan interest:") === -1) {
        featuresField.value =
          "Plan interest: " + plan + (featuresField.value ? "\n" + featuresField.value : "");
      }
    });
  });

  // ---------- Contact form: build WhatsApp message from fields ----------
  var form = document.getElementById("project-form");
  var successMsg = document.getElementById("form-success");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var get = function (id) {
        var el = document.getElementById(id);
        return el && el.value ? el.value.trim() : "";
      };

      var lines = [
        "Hello Demon Coder, I'd like to request a website project.",
        "",
        "Name: " + (get("fullName") || "-"),
        "Business: " + (get("businessName") || "-"),
        "Email: " + (get("email") || "-"),
        "WhatsApp: " + (get("whatsapp") || "-"),
        "Website type: " + (get("websiteType") || "-"),
        "About the business: " + (get("about") || "-"),
        "Desired features: " + (get("features") || "-"),
        "Budget range: " + (get("budget") || "-"),
        "Desired completion time: " + (get("timeline") || "-")
      ];

      window.open(waLink(lines.join("\n")), "_blank", "noopener");

      if (successMsg) {
        successMsg.classList.add("show");
      }
      form.reset();
    });
  }
})();
