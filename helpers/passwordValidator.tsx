export function passwordValidator(password) {
  if (!password) return "Senha obrigatória.";
  if (password.length < 5) return 'A senha deve ter no mínimo 6 caracteres.';
  return '';
}
