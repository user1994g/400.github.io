import { initSiteShell } from './modules/site-shell.js';

initSiteShell();

const form = document.querySelector('#application-form');
const status = document.querySelector('#form-status');
const submit = form.querySelector('button[type="submit"]');
const fields = [...form.querySelectorAll('input:not([type="hidden"]), select, textarea')];

function setFieldValidity(field) {
  const valid = field.checkValidity();
  field.setAttribute('aria-invalid', String(!valid));
  return valid;
}

fields.forEach((field) => {
  field.addEventListener('input', () => {
    if (field.getAttribute('aria-invalid') === 'true') setFieldValidity(field);
  });
  field.addEventListener('change', () => {
    if (field.getAttribute('aria-invalid') === 'true') setFieldValidity(field);
  });
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const invalidField = fields.find((field) => !setFieldValidity(field));
  if (invalidField) {
    status.textContent = 'Please complete the required fields before sending.';
    status.classList.add('is-error');
    invalidField.focus();
    return;
  }

  submit.disabled = true;
  submit.textContent = 'Sending…';
  form.setAttribute('aria-busy', 'true');
  status.textContent = '';
  status.classList.remove('is-error');

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error('Submission failed');
    form.reset();
    fields.forEach((field) => field.removeAttribute('aria-invalid'));
    status.textContent = 'Thanks — your application has been sent.';
  } catch (error) {
    status.textContent = 'We could not send that yet. Please try again.';
    status.classList.add('is-error');
  } finally {
    submit.disabled = false;
    submit.innerHTML = 'Send application <span aria-hidden="true">↗</span>';
    form.removeAttribute('aria-busy');
  }
});
