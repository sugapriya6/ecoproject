// =============================================
// THEME & RTL — Apply immediately (no flash)
// =============================================
if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
} else {
    document.documentElement.classList.remove("dark");
}

if (localStorage.getItem("rtl") === "true") {
    document.documentElement.setAttribute("dir", "rtl");
} else {
    document.documentElement.setAttribute("dir", "ltr");
}


// =============================================
// Everything else — runs after DOM is ready
// =============================================
document.addEventListener("DOMContentLoaded", () => {

    // --------------------------
    // Dark Mode Toggle
    // --------------------------
    const themeBtn = document.getElementById("themeToggle");

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const isDark = document.documentElement.classList.toggle("dark");
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }

    // Dashboard mobile sidebar theme toggles
    const mobileThemeToggle = document.getElementById("mobileThemeToggle");
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener("click", () => {
            const isDark = document.documentElement.classList.toggle("dark");
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }

    const desktopThemeToggle = document.getElementById("desktopThemeToggle");
    if (desktopThemeToggle) {
        desktopThemeToggle.addEventListener("click", () => {
            const isDark = document.documentElement.classList.toggle("dark");
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }

    // --------------------------
    // RTL Toggle
    // --------------------------
    window.toggleRTL = function () {
        const isRTL = document.documentElement.getAttribute("dir") === "rtl";
        document.documentElement.setAttribute("dir", isRTL ? "ltr" : "rtl");
        localStorage.setItem("rtl", isRTL ? "false" : "true");
    };

    // --------------------------
    // Mobile Sidebar (Home/Site pages)
    // --------------------------
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileOverlay = document.getElementById("mobileOverlay");
    const closeMobileMenuBtn = document.getElementById("closeMobileMenuBtn");

    if (menuBtn && mobileMenu && mobileOverlay) {

        const isRTL = () => document.documentElement.getAttribute("dir") === "rtl";

        const openMobileMenu = () => {
            mobileMenu.classList.remove("translate-x-full", "-translate-x-full");
            mobileOverlay.classList.remove("invisible", "opacity-0");
            document.body.classList.add("overflow-hidden");
        };

        const closeMobileMenu = () => {
            mobileMenu.classList.add(isRTL() ? "-translate-x-full" : "translate-x-full");
            mobileOverlay.classList.add("opacity-0");
            mobileOverlay.addEventListener("transitionend", () => {
                if (mobileOverlay.classList.contains("opacity-0")) mobileOverlay.classList.add("invisible");
            }, { once: true });
            document.body.classList.remove("overflow-hidden");
        };

        const isMobileMenuOpen = () =>
            !mobileMenu.classList.contains("translate-x-full") && !mobileMenu.classList.contains("-translate-x-full");

        menuBtn.addEventListener("click", () => {
            isMobileMenuOpen() ? closeMobileMenu() : openMobileMenu();
        });

        if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener("click", closeMobileMenu);
        mobileOverlay.addEventListener("click", closeMobileMenu);

        // Keep state correct when resizing across the md breakpoint
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 768) {
                mobileOverlay.classList.add("opacity-0", "invisible");
                document.body.classList.remove("overflow-hidden");
            }
        });

        // Close sidebar when a nav link is tapped
        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                if (window.innerWidth < 768) closeMobileMenu();
            });
        });
    }

    // --------------------------
    // FAQ Toggle
    // --------------------------
    document.querySelectorAll(".faq-btn").forEach(button => {
        button.addEventListener("click", () => {
            const content = button.nextElementSibling;
            if (content) content.classList.toggle("hidden");
        });
    });

    // --------------------------
    // Animated Statistics Counter
    // --------------------------
    const counters = document.querySelectorAll(".counter");

    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute("data-target");
                    let count = 0;
                    const increment = Math.ceil(target / 100);

                    const updateCounter = () => {
                        count += increment;
                        if (count >= target) {
                            counter.innerText = target + "+";
                        } else {
                            counter.innerText = count;
                            requestAnimationFrame(updateCounter);
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // --------------------------
    // Scroll Fade Animation
    // --------------------------
    const fadeElements = document.querySelectorAll(".fade");

    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        }, { threshold: 0.2 });

        fadeElements.forEach(element => fadeObserver.observe(element));
    }

});