export function backToTop() {
  const currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
    window.requestAnimationFrame(backToTop);
    window.scrollTo(0, currentScroll - currentScroll / 10);
  }
}
