function getFormData(form) {
  const data = {};
  form.querySelectorAll('input').forEach((elem) => {
    data[elem.getAttribute('name')] = elem.value;
  });

  return data;
}

export {getFormData};