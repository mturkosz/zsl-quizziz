barba.init({
  transitions: [
    {
      async leave(data) {
        await gsap.to(".transition-overlay", {
          scaleY: 1,
          duration: 0.75,
          ease: "power2.inOut"
        });
      },
      async enter(data) {
        gsap.to(".transition-overlay", {
          scaleY: 0,
          duration: 0.75,
          ease: "power2.inOut"
        });
      }
    }
  ]
});
