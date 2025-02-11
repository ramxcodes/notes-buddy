import confetti from "canvas-confetti";

export function triggerConfetti() {
  confetti({
    particleCount: 250,
    spread: 80,
    origin: { y: 0.6 },
  });
}
