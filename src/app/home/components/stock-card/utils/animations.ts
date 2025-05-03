function fadeInStockCardFrom(): gsap.TweenVars {
  return { opacity: 0, y: 50 };
}

function fadeInStockCardTo(delay: number): gsap.TweenVars {
  return {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power4.out",
    delay: delay,
  };
}

function pulsingSkeleton(): gsap.TweenVars {
  return {
    opacity: 0,
    repeat: -1,
    duration: 1,
    yoyo: true,
    ease: "power1.inOut",
  };
}

export { fadeInStockCardFrom, fadeInStockCardTo, pulsingSkeleton };
