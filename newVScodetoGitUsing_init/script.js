document.addEventListener("DOMContentLoaded", function() {
    gsap.from("h1", { duration: 1, y: -50, opacity: 0, ease: "bounce" });
    gsap.from(".hero h2", { duration: 1, x: -100, opacity: 0, delay: 0.5 });
    gsap.from(".unicorn", { duration: 1, scale: 0, opacity: 0, delay: 1 });
    gsap.from(".explore-btn", { duration: 1, y: 50, opacity: 0, delay: 1.5, ease: "elastic" });

    document.querySelector(".explore-btn").addEventListener("click", function() {
        gsap.to(".hero", { duration: 1, scale: 1.1, backgroundColor: "#ff0099", ease: "power1.inOut" });
    });
});
