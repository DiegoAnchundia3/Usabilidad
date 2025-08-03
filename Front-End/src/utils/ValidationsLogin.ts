export function validateUsuario(usuario: string): boolean {
  const usuarioRegex = /^[A-Za-z]+$/;
  return usuarioRegex.test(usuario);
}

export function validateContrasena(contrasena: string): boolean {
  const contrasenaRegex = /^[A-Za-z0-9]{1,10}$/;
  return contrasenaRegex.test(contrasena);
}