const form = document.querySelector('#application-form');
const status = document.querySelector('#form-status');
const header = document.querySelector('#site-header');
const navToggle = document.querySelector('#nav-toggle');

if (window.location.protocol === 'file:') {
  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === '/') link.href = '../index.html';
    if (href?.startsWith('/#')) link.href = `../index.html${href.slice(1)}`;
    if (href === '/applications/') link.href = 'index.html';
  });
}

window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 32), { passive: true });
document.querySelector('#applications-search').addEventListener('click', () => {
  window.location.href = window.location.protocol === 'file:' ? '../index.html#rows' : '/#rows';
});

navToggle.addEventListener('click', () => {
  const open = header.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', String(open));
});
document.addEventListener('click', (event) => {
  if (!header.contains(event.target)) {
    header.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});
document.querySelectorAll('.primary-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submit = form.querySelector('button[type="submit"]');
  submit.disabled = true;
  submit.textContent = 'Sending…';
  status.textContent = '';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error('Submission failed');
    form.reset();
    status.textContent = 'Thanks — your application has been sent.';
  } catch (error) {
    status.textContent = 'We could not send that yet. Please try again.';
  } finally {
    submit.disabled = false;
    submit.innerHTML = 'Send application <span aria-hidden="true">↗</span>';
  }
});
