export const removeAccent = (texto) => {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}