function getFormData(form) {
  const data = {};
  form.querySelectorAll('input').forEach((elem) => {
    data[elem.getAttribute('name')] = elem.value;
  });

  return data;
}

function redirect(path) {
  window.history.pushState({}, '', path);
  const pushEvent = new Event('pushstate');
  window.dispatchEvent(pushEvent);
}

function renderErrors(data) {
  document.querySelectorAll('.errors-list').forEach(e => e.remove());

  if (typeof data['error'] === 'string') {
    const ul = document.createElement('ul');
    ul.classList.add('errors-list');
    const li = document.createElement('li');
    li.innerText = data['error'];
    ul.append(li);
    document.querySelector('form button').after(ul);
  }

  if (typeof data['errors'] === 'undefined') {
    return;
  }

  for (const inputName in data.errors) {
    const inputErrors = data.errors[inputName];

    const ul = document.createElement('ul');
    for (const error of inputErrors) {
      const li = document.createElement('li');
      li.innerText = error;
      ul.append(li);
    }

    const label = document.querySelector('input[name="' + inputName + '"]').closest('label');
    ul.classList.add('errors-list');

    label.append(ul);
  }
}

export {getFormData, redirect, renderErrors};