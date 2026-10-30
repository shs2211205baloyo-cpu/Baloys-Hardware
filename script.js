
// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// B1: DARK MODE
const darkModeToggle = document.querySelector("#darkModeToggle");

darkModeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    darkModeToggle.textContent =
        document.documentElement.classList.contains("dark") ? "DarkMode" : "LightMode";
});

// D1 + D2: PAGE-LOAD INTRO
const intro = gsap.timeline({
    defaults: {
        duration: 0.6,
        ease: "power2.out"
    }
});

intro.from("#hero h1", {
    y: 35,
    opacity: 0
})
    .from("#hero p", {
        y: 20,
        opacity: 0
    }, "-=0.3")
    .from("#hero a, #replayBtn", {
        y: 15,
        opacity: 0,
        stagger: 0.15
    }, "-=0.2")
    .from(".hero-image", {
        x: 30,
        opacity: 0,
        duration: 0.8
    }, "-=0.5");


// E3: REDUCED MOTION SUPPORT + SCROLL EFFECTS
const media = gsap.matchMedia();

media.add(
    {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        normalMotion: "(prefers-reduced-motion: no-preference)"
    },
    (context) => {
        const { reduceMotion, normalMotion } = context.conditions;


        if (reduceMotion) {
            gsap.set(".reveal", { clearProps: "all" });
            gsap.set("#progressBar", { scaleX: 0 });
            return;
        }

        // E1: REVEAL EACH SECTION ON SCROLL
        gsap.utils.toArray(".reveal").forEach((element) => {
            gsap.from(element, {
                y: 25,
                opacity: 0,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // E2: SCROLL PROGRESS BAR
        gsap.fromTo("#progressBar",
            { scaleX: 0 },
            {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true
                }
            });
    }
);

// Contact form layout demo: no message is sent.
document.querySelector("#contactForm").addEventListener("submit", (event) => {
    event.preventDefault();

    document.querySelector("#formNotice").textContent =
        "Thank you! This demo form is not connected to a server yet.";

    event.target.reset();
});


