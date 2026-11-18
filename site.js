'use strict';
const filters = document.querySelector('.filters');
const projects = [...document.querySelectorAll('.research-item')];
const status = document.querySelector('#filter-status');
if (filters && status) {
  filters.hidden = false;
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button || !filters.contains(button)) return;
    const selected = button.dataset.filter;
    let count = 0;
    for (const project of projects) {
      const show = selected === 'all' || project.dataset.areas.split(' ').includes(selected);
      project.hidden = !show;
      if (show) count++;
    }
    for (const control of filters.querySelectorAll('button')) {
      control.setAttribute('aria-pressed', String(control === button));
    }
    status.textContent = selected === 'all' ? `Showing all ${count} case studies` : `${count} ${count === 1 ? 'case study' : 'case studies'} in ${button.textContent}`;
  });
}
function revealAnchor() {
  const target = document.getElementById(location.hash.slice(1));
  if (!target) return;
  const disclosure = target.closest('details');
  if (disclosure) disclosure.open = true;
  if (target.matches('.research-item') && target.hidden) filters.querySelector('[data-filter="all"]').click();
  target.scrollIntoView();
}
window.addEventListener('hashchange', revealAnchor);
if (location.hash) revealAnchor();
