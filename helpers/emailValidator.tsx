export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "E-mail obrigatório.";
  if (!re.test(email)) return 'Ooops! O e-mail não é válido.';
  return ''
}
