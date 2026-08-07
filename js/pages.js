// Shared behaviour for inner pages: year stamp, staged entrance, image reveal.
document.querySelectorAll('.y').forEach(el => el.textContent = new Date().getFullYear());

// Full-bleed sections use 100vw, which includes the scrollbar. Publish the
// real scrollbar width so they can subtract it and stay flush.
const setScrollbarWidth = () => document.documentElement.style.setProperty(
  '--sbw', (window.innerWidth - document.documentElement.clientWidth) + 'px'
);
setScrollbarWidth();
addEventListener('resize', setScrollbarWidth, { passive: true });

// Reveal on next frame so the transition has a start state to animate from.
requestAnimationFrame(() => requestAnimationFrame(() => {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}));

// 05 · Images resolve from blur as they enter view, and re-blur on the way
// out so the effect is not a one-shot the user can only ever see once.
const revealables = document.querySelectorAll('.rv');
if (revealables.length) {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => e.target.classList.toggle('seen', e.isIntersecting)),
    { threshold: 0.35 }
  );
  revealables.forEach(el => io.observe(el));
}
