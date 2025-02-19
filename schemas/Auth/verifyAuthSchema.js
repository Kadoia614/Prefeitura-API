const verifyAuthSchema = {
    schema: {
      description: "Verificação de usuário",
      tags: ["Auth"],
      response: {
        200: {
          description: "Verificação bem sucedido",
          type: "object",
          properties: {
            message: { type: "string", example: "Usuário okay" },
          },
        },
        401: {
          description: "Não autorizado",
          type: "object",
          properties: {
            message: { type: "string", example: "Não autorizado" },
          },
        },
      },
    },
  };
  
  module.exports = verifyAuthSchema;
  