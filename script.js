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
        if (!loader || !website) {
            initializeWebsite();
            return;
        }

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
    if (!document.querySelector(".hero")) return;

    const tl = gsap.timeline();

    const elTitle = document.querySelector(".hero .title");
    if (elTitle) {
        tl.from(elTitle, {
            y: 120,
            opacity: 0,
            duration: 1.4,
            ease: "power4.out"
        });
    }

    const elSubtitle = document.querySelector(".hero .subtitle");
    if (elSubtitle) {
        tl.from(elSubtitle, {
            y: 45,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.7");
    }

    const elBtn = document.querySelector(".hero .btn");
    if (elBtn) {
        tl.from(elBtn, {
            y: 30,
            opacity: 0,
            scale: 0.92,
            duration: 0.8,
            ease: "back.out(1.6)"
        }, "-=0.5");
    }
}

/* ==========================================================
   HERO VIDEO PARALLAX
========================================================== */

function initHeroVideo() {
    if (!document.getElementById("bg-video") || !document.querySelector(".hero")) return;

    const elVideo = document.getElementById("bg-video");
    const elHero = document.querySelector(".hero");
    if (elVideo && elHero) {
        gsap.to(elVideo, {
            scale: 1.12,
            ease: "none",
            scrollTrigger: {
                trigger: elHero,
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });
    }
}

/* ==========================================================
   HERO 2
========================================================== */

function initHero2() {
    if (!document.querySelector(".hero2")) return;

    const elTitle = document.querySelector(".hero2 .title");
    const elHero2 = document.querySelector(".hero2");
    if (elTitle && elHero2) {
        gsap.from(elTitle, {
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
                trigger: elHero2,
                start: "top 70%"
            }
        });
    }

    const elSubtitle = document.querySelector(".hero2 .subtitle");
    if (elSubtitle && elHero2) {
        gsap.from(elSubtitle, {
            y: 40,
            opacity: 0,
            duration: 1.2,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
                trigger: elHero2,
                start: "top 70%"
            }
        });
    }

    const elVideo2 = document.getElementById("bg-video2");
    if (elVideo2 && elHero2) {
        gsap.to(elVideo2, {
            scale: 1.05,
            y: -30,
            ease: "none",
            scrollTrigger: {
                trigger: elHero2,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

    initHeroVideo();
}

/* ==========================================================
   PHASE 2
   SLIDE 3
========================================================== */

function initSlide3() {
    const elSlide3 = document.querySelector(".slide3");
    if (!elSlide3) return;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: elSlide3,
            start: "top 70%",
            end: "bottom center",
            toggleActions: "play none none reverse"
        }
    });

    const elTag = document.querySelector(".slide3-tag");
    if (elTag) {
        tl.from(elTag, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out"
        });
    }

    const elTitle = document.querySelector(".slide3-title");
    if (elTitle) {
        tl.from(elTitle, {
            y: 90,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        }, "-=0.3");
    }

    const elText = document.querySelector(".slide3-text");
    if (elText) {
        tl.from(elText, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.45");
    }

    const elStats = document.querySelectorAll(".stat");
    if (elStats.length) {
        tl.from(elStats, {
            y: 60,
            opacity: 0,
            stagger: 0.18,
            duration: 0.75,
            ease: "power3.out"
        }, "-=0.45");
    }

    const elGlassBtn = document.querySelector(".glass-btn");
    if (elGlassBtn) {
        tl.from(elGlassBtn, {
            y: 25,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out"
        }, "-=0.35");
    }

    initRocket();
    initCounters();
}

/* ==========================================================
   ROCKET
========================================================== */

function initRocket() {
    const elRocket = document.querySelector(".rocket");
    const elSlide3 = document.querySelector(".slide3");
    if (!elRocket || !elSlide3) return;

    gsap.to(elRocket, {
        y: -18,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.fromTo(elRocket,
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
                trigger: elSlide3,
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
                const value = parseInt(original.replace(/[^0-9]/g, '')) || 0;
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
    const elHeroText = document.querySelector(".hero-text");
    const elHero = document.querySelector(".hero");
    if (!elHeroText || !elHero) return;

    gsap.to(elHeroText, {
        y: -70,
        opacity: 0.65,
        ease: "none",
        scrollTrigger: {
            trigger: elHero,
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
    const elSlide4 = document.querySelector(".slide4");
    if (!elSlide4) return;

    createStars();

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: elSlide4,
            start: "top 70%",
            end: "bottom center",
            toggleActions: "play none none reverse"
        }
    });

    const elTag = document.querySelector(".slide4-tag");
    if (elTag) {
        tl.from(elTag, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out"
        });
    }

    const elTitle = document.querySelector(".slide4-title");
    if (elTitle) {
        tl.from(elTitle, {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        }, "-=0.3");
    }

    const elText = document.querySelector(".slide4-text");
    if (elText) {
        tl.from(elText, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out"
        }, "-=0.4");
    }

    const elGlassBtn = document.querySelector(".slide4 .glass-btn");
    if (elGlassBtn) {
        tl.from(elGlassBtn, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out"
        }, "-=0.3");
    }

    initFeatureCards();
}

/* ==========================================================
   DYNAMIC BACKGROUND GENERATOR
========================================================== */

function createStars() {
    const slide4 = document.querySelector(".slide4");
    if (!slide4 || document.querySelector(".star-canvas")) return;

    const canvas = document.createElement("canvas");
    canvas.className = "star-canvas";
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "1";
    slide4.insertBefore(canvas, slide4.firstChild);

    const ctx = canvas.getContext("2d");
    let stars = [];

    function resize() {
        canvas.width = slide4.clientWidth;
        canvas.height = slide4.clientHeight;
    }
    
    window.addEventListener("resize", resize);
    resize();

    for (let i = 0; i < 75; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            alpha: Math.random(),
            speed: 0.02 + Math.random() * 0.03
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            star.alpha += star.speed;
            if (star.alpha > 1 || star.alpha < 0) star.speed = -star.speed;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
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
                rotationX: 0,
                rotationY: 0,
                duration: 0.3,
                boxShadow: "0 0 0 rgba(0,0,0,0)"
            });
        });

        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--mx", `${x}px`);
            card.style.setProperty("--my", `${y}px`);

            const rotX = ((y / rect.height) - 0.5) * -15;
            const rotY = ((x / rect.width) - 0.5) * 15;

            gsap.to(card, {
                rotationX: rotX,
                rotationY: rotY,
                duration: 0.2,
                ease: "power2.out",
                transformPerspective: 1000
            });
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

    const elWebsite = document.getElementById("website");
    if (elWebsite) {
        gsap.to(elWebsite, {
            opacity: 0,
            duration: 0.45,
            ease: "power2.inOut"
        });
    }

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
    const links = document.querySelectorAll(".nav-links a"); 
    const icons = document.querySelector(".nav-icons");

    if (!intro || !pill) {
        if (navbar) {
            gsap.set(navbar, {
                visibility: "visible",
                opacity: 1,
                y: 0
            });
        }

        if (logo) gsap.set(logo, { opacity: 1 });
        if (links.length) gsap.set(links, { opacity: 1, y: 0 });

        if (icons) {
            gsap.set(icons, { opacity: 1 });
        }
        return;
    }

    if (navbar) gsap.set(navbar, { visibility: "visible", opacity: 0 });
    if (links.length) gsap.set(links, { opacity: 0, y: 18 });
    if (icons) gsap.set(icons, { opacity: 0 });

    const tl = gsap.timeline({ delay: 2.2 });

    if (pill) {
        tl.to(pill, {
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
        }, "<");
    }

    if (navbar) {
        tl.to(navbar, {
            opacity: 1,
            y: 0,
            duration: 0.45
        });
    }

    if (logo) {
        tl.from(logo, {
            x: -40,
            opacity: 0,
            duration: 0.5
        }, "-=0.2");
    }

    if (links.length) {
        tl.from(links, {
            y: 18,
            opacity: 0,
            stagger: 0.08,
            duration: 0.4,
            ease: "power2.out"
        }, "-=0.3");
    }

    if (icons) {
        tl.to(icons, {
            opacity: 1,
            duration: 0.3
        }, "-=0.2");
    }
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

        const elHeroText = document.querySelector(".hero-text");
        if (elHeroText) {
            gsap.to(elHeroText, {
                x,
                y,
                duration: 1,
                ease: "power3.out"
            });
        }

        const elBgVideo = document.getElementById("bg-video");
        if (elBgVideo) {
            gsap.to(elBgVideo, {
                x: x * 0.25,
                y: y * 0.25,
                scale: 1.04,
                duration: 1.4,
                ease: "power3.out"
            });
        }
    });
}

/* ==========================
   BUTTON HOVER
========================== */

function initButtons() {
    document.querySelectorAll(".glass-btn, .btn, .nav-links a").forEach(btn => {
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
   MUSIC CONTROL HOOKS
========================== */

function toggleMusic() {
    const music = document.getElementById("bgMusic");
    if (!music) return;

    if (music.paused) {
        music.play().catch(err => console.log("Audio play blocked by browser policy"));
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
    try { initNavbar(); } catch(e){}
    try { initHero(); } catch(e){}
    try { initHero2(); } catch(e){}
    try { initSlide3(); } catch(e){}
    try { initSlide4(); } catch(e){}
    try { initHeroParallax(); } catch(e){}
    try { initButtons(); } catch(e){}
    try { initMouseEffects(); } catch(e){}
    // Remove this call if the HTML already uses:
    // <button class="music-btn" onclick="toggleMusic()">
    // Otherwise remove the inline onclick instead.
    // Use only one method.

    requestAnimationFrame(() => {
        ScrollTrigger.refresh();
    });
}