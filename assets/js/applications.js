const form = document.querySelector('#application-form');
const status = document.querySelector('#form-status');
const header = document.querySelector('#site-header');

window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 32), { passive: true });
document.querySelector('#applications-search').addEventListener('click', () => {
  window.location.href = '/#rows';
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
