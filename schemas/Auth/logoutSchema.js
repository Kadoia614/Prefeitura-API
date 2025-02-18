const logoutSchema = {
  schema: {
    description: "Logout de usuário",
    tags: ["Auth"],
    response: {
      200: {
        description: "logout bem sucedido",
        type: "object",
        properties: {
          message: { type: "string", example: "Logout bem-sucedido" },
        },
      },
      500: {
        description: "Erro interno no servidor",
        type: "object",
        properties: {
          message: { type: "string", example: "Erro interno no servidor" },
        },
      },
    },
  },
};

module.exports = logoutSchema;
