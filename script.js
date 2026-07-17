window.addEventListener("load", () => {


    // GSAP animation for Slide 2
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({
    ignoreMobileResize: true
});

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


    gsap.to("#bg-video", {

        scale: 1.08,

        ease: "none",

        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
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
});
setTimeout(() => {
    ScrollTrigger.refresh(true);
},1500);

const loader = document.getElementById("loader");
const website = document.getElementById("website");

setTimeout(() => {

    gsap.to(loader, {
        opacity: 0,
        duration: 0.6,
        onComplete: () => {
            loader.style.display = "none";
        }
    });

    gsap.to("#website", {
        opacity: 1,
        duration: 1,
        delay: 0.2
    });



    website.classList.add("loaded");
    setTimeout(() => {

    ScrollTrigger.refresh(true);

},1000);
    /* ================= HERO INTRO ================= */

    const heroTL = gsap.timeline({
        delay: 0.2
    });

    heroTL

        .from(".hero .title", {

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
            scale: .92,
            duration: .8,
            ease: "back.out(1.6)"

        }, "-=0.5");

}, 1800);


function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

/* ==========================================================
   SLIDE 4 PREMIUM ANIMATION
========================================================== */

const slide4Timeline = gsap.timeline({

    scrollTrigger: {
        trigger: ".slide4",
        start: "top 70%",
        end: "bottom center",
        toggleActions: "play none none reverse"
    }

});

slide4Timeline
.from(".slide4-tag", {
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
    duration: 0.7
}, "-=0.4")
.from(".slide4 .glass-btn", {
    y: 30,
    opacity: 0,
    duration: 0.6
}, "-=0.3");

document.querySelectorAll(".feature-card").forEach((card, i) => {

    gsap.from(card, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.12,
        ease: "power3.out",
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true
        }
    });

});

/* ===========================
CARD HOVER
=========================== */

document.querySelectorAll(".feature-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        gsap.to(card, {

            scale: 1.05,

            duration: .3,

            boxShadow:

                "0 40px 90px rgba(0,0,0,.45),0 0 90px rgba(90,170,255,.35)",


        });

    });

    card.addEventListener("mouseleave", () => {

        gsap.to(card, {

            scale: 1,

            duration: .25,

            boxShadow: "0 0 0 rgba(0,0,0,0)"

        });

    });

});


/* ===========================
CARD CLICK
=========================== */


document.querySelectorAll(".feature-card").forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 10;

        const rotateX = ((y / rect.height) - 0.5) * -10;

        gsap.to(card, {

            x: (x - rect.width / 2) * 0.02,

            y: (y - rect.height / 2) * 0.02,

            duration: .25,

            ease: "power2.out"

        });

    });

    card.addEventListener("mouseleave", () => {
        gsap.to(card, {
            x: 0,
            y: 0,
            duration: .4
        });

    });

});
/* ===========================
   PAGE NAVIGATION
=========================== */
function goToPage(page) {

    // Disable clicking while navigating
    document.body.style.pointerEvents = "none";

    // Navbar click animation
    gsap.to(".glass-navbar", {
        scale: 0.97,
        duration: 0.15,
        yoyo: true,
        repeat: 1
    });

    // Fade out website
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
/* ===========================
FLOATING STARS
=========================== */
const slide4 = document.querySelector(".slide4");

if (slide4) {

    for (let i = 0; i < 30; i++) {

        const star = document.createElement("div");

        star.className = "star";

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.animationDelay = Math.random() * 5 + "s";

        slide4.appendChild(star);

    }

}
/* ======================================================
   SLIDE 3 ANIMATION
====================================================== */

gsap.timeline({

    scrollTrigger: {
        trigger: ".slide3",
        start: "top 70%",
        toggleActions: "play none none reverse"
    }

})

    .from(".slide3-tag", {
        y: 40,
        opacity: 0,
        duration: .6
    })

    .from(".slide3-title", {
        y: 100,
        opacity: 0,
        duration: 1
    }, "-=0.3")

    .from(".slide3-text", {
        y: 40,
        opacity: 0,
        duration: .8
    }, "-=0.5")

    .from(".stat", {
        y: 60,
        opacity: 0,
        stagger: .2,
        duration: .8
    }, "-=0.4")

    .from(".glass-btn", {
        y: 25,
        opacity: 0,
        duration: .7
    }, "-=0.3");

gsap.to(".rocket", {
    y: -18,
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});
gsap.from(".stat", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.18,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".slide3",
        start: "top 70%"
    }
});
/* ==========================
   ROCKET FLY
========================== */

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

    });


/* ==========================
   COUNTER
========================== */

document.querySelectorAll(".stat h3").forEach(counter => {

    ScrollTrigger.create({

        trigger: counter,
        start: "top 90%",
        once: true,

        onEnter: () => {

            let end = counter.innerText;
            let number = parseInt(end);

            let obj = { value: 0 };

            gsap.to(obj, {

                value: number,

                duration: 2,

                ease: "power2.out",

                onUpdate: () => {

                    if (end.includes("+")) {

                        counter.innerHTML = Math.floor(obj.value) + "+";

                    } else if (end.includes("%")) {

                        counter.innerHTML = Math.floor(obj.value) + "%";

                    } else {

                        counter.innerHTML = Math.floor(obj.value);

                    }

                }

            });

        }

    });

});
/* ================= HERO PARALLAX ================= */

gsap.to(".hero-text", {

    y: -70,

    opacity: .65,

    ease: "none",

    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1
    }

});


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
gsap.utils.toArray(".nav-links a").forEach(link => {

    link.addEventListener("mouseenter", () => {

        gsap.to(link, {

            y: -2,

            duration: .25,

            color: "#9ad8ff"

        });

    });

    link.addEventListener("mouseleave", () => {

        gsap.to(link, {

            y: 0,

            duration: .25,

            color: "#fff"

        });

    });

});
/* ==========================================
   INTRO NAVBAR MORPH
========================================== */

window.addEventListener("load", () => {

    const intro = document.querySelector("#navIntro");

    const pill = document.querySelector(".intro-pill");

    const text = document.querySelector(".intro-text");

    const navbar = document.querySelector(".glass-navbar");

    const logo = document.querySelector(".logo");

    const links = document.querySelectorAll(".nav-links li");

    const icons = document.querySelector(".nav-icons");
       // Missions page (no intro)
    if (!intro || !pill) {

        gsap.set(navbar, {
            visibility: "visible",
            opacity: 1,
            y: 0,
            scale: 1
        });

        gsap.set(logo, { opacity: 1 });
        gsap.set(links, { opacity: 1, y: 0 });

        if (icons) gsap.set(icons, { opacity: 1 });

        return;
    }
    gsap.timeline({

    delay: 2.2

})
        .to(pill, {

            width: "min(1280px,82vw)",

            height: "72px",

            borderRadius: "999px",

            duration: 1.15,

            ease: "power4.inOut",

            boxShadow:

                "0 25px 60px rgba(0,0,0,.45),\
        inset 0 1px 2px rgba(255,255,255,.8),\
        inset 0 -10px 18px rgba(0,0,0,.18)"

        })
        .to(pill, {

            y: -window.innerHeight / 2 + 62,

            duration: 1.1,

            ease: "power4.inOut"

        }, "<")

        /* ==================================== */

        .to(text, {

            opacity: 0,

            duration: .35

        }, "-=.35")
        .to("#flash", {

            opacity: .18,

            duration: .12,

            yoyo: true,

            repeat: 1

        }, "<")

        /* ==================================== */

        .set(navbar, {
            visibility: "visible"
        })

        .to(navbar, {

            opacity: 1,

            y: 0,

            scale: 1,

            duration: .45,

            ease: "power4.out"

        })
        .call(() => {

            navbar.style.backdropFilter = "blur(32px) saturate(220%) brightness(1.15)";
            navbar.style.webkitBackdropFilter = "blur(32px) saturate(220%) brightness(1.15)";

        })

        .to(pill, {

            opacity: 0,

            duration: .25

        }, "<")

        .to(navbar, {

            scale: 1.015,

            duration: .18,

            yoyo: true,

            repeat: 1

        }, "<")
        /* ==================================== */


        .to(intro, {

            opacity: 0,

            duration: .3

        })

        /* ==================================== */
        .fromTo(logo,

            {

                x: -40,

                opacity: 0

            },

            {

                x: 0,

                opacity: 1,

                duration: .55,

                ease: "power3.out"

            })
        .fromTo(links,

            {

                opacity: 0,

                y: 18,

                filter: "blur(8px)"

            },

            {

                opacity: 1,

                y: 0,

                filter: "blur(0px)",

                stagger: .08,

                duration: .45,

                ease: "power3.out"

            })

        .to(icons, {

            opacity: 1,

            duration: .35

        }, "<");

});
const hero = document.querySelector(".hero");

if (hero) {

    hero.addEventListener("mousemove", (e) => {

        const x = (e.clientX / window.innerWidth - .5) * 25;
        const y = (e.clientY / window.innerHeight - .5) * 20;

        gsap.to(".hero-text", {
            x,
            y,
            duration: 1,
            ease: "power3.out"
        });

        gsap.to("#bg-video", {
            x: x * .25,
            y: y * .25,
            scale: 1.04,
            duration: 1.4,
            ease: "power3.out"
        });

    });

}

document.querySelectorAll(".glass-btn,.btn").forEach(btn => {

    btn.addEventListener("mouseenter", () => {

        gsap.to(btn, {
            scale: 1.06,
            duration: .35,
            ease: "power3.out"
        });

    });

    btn.addEventListener("mouseleave", () => {

        gsap.to(btn, {
            scale: 1,
            duration: .35
        });

    });

});
const music = document.getElementById("bgMusic");

function toggleMusic() {

    if (music.paused) {

        music.play();

    } else {

        music.pause();

    }

}
document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("mouseenter", () => {

        gsap.to(link, {

            scale: 1.08,

            duration: .25,

            ease: "power3.out"

        });

    });

    link.addEventListener("mouseleave", () => {

        gsap.to(link, {

            scale: 1,

            duration: .25,

            ease: "power3.out"

        });

    });

});
window.addEventListener("resize", () => {

    ScrollTrigger.refresh(true);

});
window.addEventListener("load", () => {

    setTimeout(() => {

        ScrollTrigger.refresh(true);

        ScrollTrigger.sort();

        window.dispatchEvent(new Event("resize"));

    }, 2500);

});