// Shared behaviour for F inner pages: year stamp + staged entrance.
document.querySelectorAll('.y').forEach(el => el.textContent = new Date().getFullYear());

// Reveal on next frame so the transition has a start state to animate from.
requestAnimationFrame(() => requestAnimationFrame(() => {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}));
