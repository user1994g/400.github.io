const openDialogs = new Set();

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

function syncPageState() {
  document.body.classList.toggle('overlay-open', openDialogs.size > 0);
  const main = document.querySelector('main');
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  const search = document.querySelector('#search-panel');
  const hiddenFromAssistiveTech = openDialogs.size > 0;
  [main, header, footer, search].forEach((element) => {
    if (!element) return;
    if (hiddenFromAssistiveTech) element.setAttribute('aria-hidden', 'true');
    else element.removeAttribute('aria-hidden');
  });
}

export function createDialog(root, { onClose } = {}) {
  let opener = null;

  const getFocusable = () => [...root.querySelectorAll(focusableSelector)]
    .filter((element) => !element.hidden && element.getAttribute('aria-hidden') !== 'true');

  const open = (trigger = document.activeElement) => {
    opener = trigger instanceof HTMLElement ? trigger : null;
    root.hidden = false;
    openDialogs.add(root);
    syncPageState();
    window.requestAnimationFrame(() => getFocusable()[0]?.focus());
  };

  const close = () => {
    if (root.hidden) return;
    root.hidden = true;
    openDialogs.delete(root);
    syncPageState();
    onClose?.();
    opener?.focus();
  };

  root.querySelectorAll('[data-dialog-close]').forEach((element) => {
    element.addEventListener('click', close);
  });

  document.addEventListener('keydown', (event) => {
    if (root.hidden || [...openDialogs].at(-1) !== root) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }

    if (event.key !== 'Tab') return;
    const focusable = getFocusable();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable.at(-1);

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  return { open, close, isOpen: () => !root.hidden };
}
