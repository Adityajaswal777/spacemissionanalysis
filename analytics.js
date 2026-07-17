// ======================================================
// APPLE GLASS ANIMATIONS
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------
    // Fade In
    // -------------------------

    const cards = document.querySelectorAll(
        ".glass-card,\
        div[data-testid='stMetric'],\
        div[data-testid='stPlotlyChart']"
    );

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(35px)";

        setTimeout(() => {

            card.style.transition =
            "all .65s cubic-bezier(.2,.8,.2,1)";

            card.style.opacity = "1";
            card.style.transform = "translateY(0px)";

        }, index * 120);

    });

    // -------------------------
    // Floating KPI Cards
    // -------------------------

    const metrics =
    document.querySelectorAll(
        "div[data-testid='stMetric']"
    );

    metrics.forEach((card)=>{

        card.addEventListener("mouseenter",()=>{

            card.style.transform =
            "translateY(-8px) scale(1.03)";

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform =
            "translateY(0px) scale(1)";

        });

    });

    // -------------------------
    // Plotly Hover
    // -------------------------

    const plots =
    document.querySelectorAll(
        "div[data-testid='stPlotlyChart']"
    );

    plots.forEach((plot)=>{

        plot.addEventListener("mouseenter",()=>{

            plot.style.boxShadow =
            "0 0 45px rgba(103,200,255,.25)";

        });

        plot.addEventListener("mouseleave",()=>{

            plot.style.boxShadow =
            "";

        });

    });

    // -------------------------
    // Hero Glow
    // -------------------------

    const hero =
    document.querySelector(".analytics-hero");

    if(hero){

        document.addEventListener("mousemove",(e)=>{

            const x =
            e.clientX/window.innerWidth;

            const y =
            e.clientY/window.innerHeight;

            hero.style.backgroundPosition =
            `${x*100}% ${y*100}%`;

        });

    }

});