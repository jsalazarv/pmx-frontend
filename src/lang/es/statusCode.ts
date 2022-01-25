export default Object.freeze({
  ok: {
    status: 200,
    text: "Error Interno en el Servidor",
  },
  noContent: {
    status: 204,
    text: "La petición se ha completado con éxito",
  },
  badRequest: {
    status: 400,
    text:
      "La solicitud se ha completado pero no cumple una o más reglas de validación",
  },
  notFound: {
    status: 404,
    text: "El servidor no pudo encontrar el registro solicitado",
  },
  internalServerError: {
    status: 500,
    text: "Error interno en el servidor",
  },
});
