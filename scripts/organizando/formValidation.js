function validateName(name) {
  const regex = /^[a-zA-Zà-ü\s]+$/;
  return regex.test(name);
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export { validateName, validateEmail };