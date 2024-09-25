export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(";").shift(); // Usar el operador opcional de encadenamiento para manejar undefined
    return cookieValue ? decodeURIComponent(cookieValue) : null; // Manejar el caso cuando cookieValue es undefined
  }
  return null;
}
