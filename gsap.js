      document.addEventListener("DOMContentLoaded", () => {
        // Sidebar Drawer Controller
        const menuToggle = document.getElementById("menu-toggle");
        const menuClose = document.getElementById("menu-close");
        const sidebarOverlay = document.getElementById("sidebar-overlay");
        const sidebarPanel = document.getElementById("sidebar-panel");

        function openSidebar() {
          if (sidebarOverlay && sidebarPanel) {
            sidebarOverlay.classList.remove("hidden");
            setTimeout(() => {
              sidebarOverlay.classList.remove("opacity-0");
              sidebarPanel.classList.remove("translate-x-full");
            }, 10);
          }
        }

        function closeSidebar() {
          if (sidebarOverlay && sidebarPanel) {
            sidebarOverlay.classList.add("opacity-0");
            sidebarPanel.classList.add("translate-x-full");
            setTimeout(() => {
              sidebarOverlay.classList.add("hidden");
            }, 300);
          }
        }

        if (menuToggle) menuToggle.addEventListener("click", openSidebar);
        if (menuClose) menuClose.addEventListener("click", closeSidebar);
        if (sidebarOverlay) {
          sidebarOverlay.addEventListener("click", (e) => {
            if (e.target === sidebarOverlay) closeSidebar();
          });
        }

        // Sandbox Viewport Controller
        const sandboxContainer = document.getElementById("sandbox-container");
        const sandboxIframe = document.getElementById("sandbox-iframe");
        const sandboxClose = document.getElementById("sandbox-close");
        const previewTriggers = document.querySelectorAll(".preview-trigger");

        function openSandbox(url) {
          if (sandboxIframe && sandboxContainer) {
            sandboxIframe.src = url;
            sandboxContainer.classList.remove("hidden");
            sandboxContainer.classList.add("flex");
            document.body.style.overflow = "hidden";
            closeSidebar();
          }
        }

        function closeSandbox() {
          if (sandboxContainer && sandboxIframe) {
            sandboxContainer.classList.add("hidden");
            sandboxContainer.classList.remove("flex");
            sandboxIframe.src = "";
            document.body.style.overflow = "";
          }
        }

        previewTriggers.forEach((btn) => {
          btn.addEventListener("click", () => {
            const url = btn.getAttribute("data-preview-url");
            if (url) openSandbox(url);
          });
        });

        if (sandboxClose) sandboxClose.addEventListener("click", closeSandbox);

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            closeSandbox();
            closeSidebar();
          }
        });

        // Smooth Navigation Handling
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach((link) => {
          link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
              closeSidebar();
              targetEl.scrollIntoView({ behavior: "smooth" });
            }
          });
        });

        // GSAP ScrollTrigger Scrollspy Integration
        if (
          typeof gsap !== "undefined" &&
          typeof ScrollTrigger !== "undefined"
        ) {
          gsap.registerPlugin(ScrollTrigger);

          const sections = document.querySelectorAll('section[id^="node-"]');
          sections.forEach((sec, idx) => {
            ScrollTrigger.create({
              trigger: sec,
              start: "top center",
              end: "bottom center",
              onEnter: () => highlightActiveNav(idx + 1),
              onEnterBack: () => highlightActiveNav(idx + 1),
            });
          });

          function highlightActiveNav(index) {
            navLinks.forEach((link, i) => {
              if (i + 1 === index) {
                link.classList.add(
                  "bg-purple-900/40",
                  "border-purple-500/50",
                  "text-white",
                );
              } else {
                link.classList.remove(
                  "bg-purple-900/40",
                  "border-purple-500/50",
                  "text-white",
                );
              }
            });
          }
        }
      });
