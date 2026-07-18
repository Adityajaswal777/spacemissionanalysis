/* ==========================================================
   PHASE 1
   Core Initialization + Loader + Hero + Hero 2
========================================================== */

gsap.registerPlugin(ScrollTrigger);

/* ==========================================================
   APP INITIALIZATION
========================================================== */

window.addEventListener("load", initWebsite);

function initWebsite() {
    initLoader();
}

/* ==========================================================
   LOADER
========================================================== */

function initLoader() {
    const loader = document.getElementById("loader");
    const website = document.getElementById("website");

    gsap.delayedCall(1.8, () => {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.6,
            onComplete: () => {
                loader.style.display = "none";
                website.classList.add("loaded");

                gsap.to(website, {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    onComplete: () => {
                        // Dynamically fire the global initialization loop
                        initializeWebsite();
                    }
                });
            }
        });
    });
}

/* ==========================================================
   HERO SECTION
========================================================== */

function initHero() {
    const tl = gsap.timeline();

    tl.from(".hero .title", {
        y: 120,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out"
    })
    .from(".hero .subtitle", {
        y: 45,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.7")
    .from(".hero .btn", {
        y: 30,
        opacity: 0,
        scale: 0.92,
        duration: 0.8,
        ease: "back.out(1.6)"
    }, "-=0.5");
}

/* ==========================================================
   HERO VIDEO PARALLAX
========================================================== */

function initHeroVideo() {
    gsap.to("#bg-video", {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });
}

/* ==========================================================
   HERO 2
========================================================== */

function initHero2() {
    gsap.from(".hero2 .title", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".hero2",
            start: "top 70%"
        }
    });

    gsap.from(".hero2 .subtitle", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".hero2",
            start: "top 70%"
        }
    });

    gsap.to("#bg-video2", {
        scale: 1.05,
        y: -30,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero2",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    initHeroVideo();
}

/* ==========================================================
   PHASE 2
   SLIDE 3
========================================================== */

function initSlide3() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".slide3",
            start: "top 70%",
            end: "bottom center",
            toggleActions: "play none none reverse"
        }
    });

    tl.from(".slide3-tag", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
    })
    .from(".slide3-title", {
        y: 90,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    }, "-=0.3")
    .from(".slide3-text", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.45")
    .from(".stat", {
        y: 60,
        opacity: 0,
        stagger: 0.18,
        duration: 0.75,
        ease: "power3.out"
    }, "-=0.45")
    .from(".glass-btn", {
        y: 25,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
    }, "-=0.35");

    initRocket();
    initCounters();
}

/* ==========================================================
   ROCKET
========================================================== */

function initRocket() {
    gsap.to(".rocket", {
        y: -18,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.fromTo(".rocket",
        {
            x: -400,
            opacity: 0,
            rotation: -8
        },
        {
            x: 1800,
            opacity: 1,
            rotation: 5,
            duration: 5,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".slide3",
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        }
    );
}

/* ==========================================================
   COUNTERS
========================================================== */

function initCounters() {
    document.querySelectorAll(".stat h3").forEach(counter => {
        ScrollTrigger.create({
            trigger: counter,
            start: "top 90%",
            once: true,
            onEnter: () => {
                const original = counter.textContent;
                const value = parseInt(original) || 0;
                const obj = { value: 0 };

                gsap.to(obj, {
                    value,
                    duration: 2,
                    ease: "power2.out",
                    onUpdate: () => {
                        if (original.includes("+")) {
                            counter.textContent = Math.floor(obj.value) + "+";
                        } else if (original.includes("%")) {
                            counter.textContent = Math.floor(obj.value) + "%";
                        } else {
                            counter.textContent = Math.floor(obj.value);
                        }
                    }
                });
            }
        });
    });
}

/* ==========================================================
   HERO PARALLAX
========================================================== */

function initHeroParallax() {
    gsap.to(".hero-text", {
        y: -70,
        opacity: 0.65,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });
}

/* ==========================================================
   PHASE 3
   SLIDE 4
========================================================== */

function initSlide4() {
    // Check if function exists globally to avoid execution errors
    if (typeof createStars === "function") createStars();

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".slide4",
            start: "top 70%",
            end: "bottom center",
            toggleActions: "play none none reverse"
        }
    });

    tl.from(".slide4-tag", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
    })
    .from(".slide4-title", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    }, "-=0.3")
    .from(".slide4-text", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out"
    }, "-=0.4")
    .from(".slide4 .glass-btn", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
    }, "-=0.3");

    initFeatureCards();
}

/* ==========================================================
   FEATURE CARDS
========================================================== */

function initFeatureCards() {
    document.querySelectorAll(".feature-card").forEach((card, index) => {
        gsap.from(card, {
            y: 80,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.12,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true
            }
        });

        card.addEventListener("mouseenter", () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                boxShadow: "0 40px 90px rgba(0,0,0,.45),0 0 90px rgba(90,170,255,.35)"
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.3,
                boxShadow: "0 0 0 rgba(0,0,0,0)"
            });
        });

        // Fixed the broken event tracking code below
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Optional: Pass these values to CSS variables for dynamic lighting/tilt effects
            card.style.setProperty("--mx", `${x}px`);
            card.style.setProperty("--my", `${y}px`);
        });
    });
}

/* ==========================================================
   PART 4
   NAVBAR + NAVIGATION + MUSIC + FINAL INIT
========================================================== */

/* ==========================
   PAGE NAVIGATION
========================== */

function goToPage(page) {
    document.body.style.pointerEvents = "none";

    gsap.to("#website", {
        opacity: 0,
        duration: 0.45,
        ease: "power2.inOut"
    });

    setTimeout(() => {
        const url = new URL(window.location.href);
        url.searchParams.set("page", page);
        window.location.href = url.toString();
    }, 450);
}

/* ==========================
   NAVBAR INTRO
========================== */

function initNavbar() {
    const intro = document.querySelector("#navIntro");
    const pill = document.querySelector(".intro-pill");
    const navbar = document.querySelector(".glass-navbar");
    const logo = document.querySelector(".logo");
    const links = document.querySelectorAll(".nav-links li");
    const icons = document.querySelector(".nav-icons");

    if (!intro || !pill) {
        gsap.set(navbar, {
            visibility: "visible",
            opacity: 1,
            y: 0
        });

        gsap.set(logo, { opacity: 1 });
        gsap.set(links, { opacity: 1, y: 0 });

        if (icons) {
            gsap.set(icons, { opacity: 1 });
        }
        return;
    }

    gsap.timeline({ delay: 2.2 })
    .to(pill, {
        width: "min(1280px,82vw)",
        height: "72px",
        borderRadius: "999px",
        duration: 1.1,
        ease: "power4.inOut"
    })
    .to(pill, {
        y: -window.innerHeight / 2 + 62,
        duration: 1.1,
        ease: "power4.inOut"
    }, "<")
    .set(navbar, {
        visibility: "visible"
    })
    .to(navbar, {
        opacity: 1,
        y: 0,
        duration: 0.45
    })
    .from(logo, {
        x: -40,
        opacity: 0,
        duration: 0.5
    })
    .from(links, {
        y: 18,
        opacity: 0,
        stagger: 0.08,
        duration: 0.4
    });
}

/* ==========================
   HERO MOUSE EFFECT
========================== */

function initMouseEffects() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    hero.addEventListener("mousemove", e => {
        const x = (e.clientX / window.innerWidth - 0.5) * 25;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to(".hero-text", {
            x,
            y,
            duration: 1,
            ease: "power3.out"
        });

        gsap.to("#bg-video", {
            x: x * 0.25,
            y: y * 0.25,
            scale: 1.04,
            duration: 1.4,
            ease: "power3.out"
        });
    });
}

/* ==========================
   BUTTON HOVER
========================== */

function initButtons() {
    document.querySelectorAll(".glass-btn,.btn").forEach(btn => {
        btn.addEventListener("mouseenter", () => {
            gsap.to(btn, {
                scale: 1.06,
                duration: 0.3
            });
        });

        btn.addEventListener("mouseleave", () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.3
            });
        });
    });
}

/* ==========================
   MUSIC
========================== */

function toggleMusic() {
    const music = document.getElementById("bgMusic");
    if (!music) return;

    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

/* ==========================
   RESIZE
========================== */

window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
});

/* ==========================
   FINAL INITIALIZATION
========================== */

function initializeWebsite() {
    initHero();
    initHero2();
    initSlide3();
    initSlide4();
    initHeroParallax();
    initNavbar();
    initButtons();
    initMouseEffects();

    ScrollTrigger.refresh();
}