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

export {getFormData, redirect};