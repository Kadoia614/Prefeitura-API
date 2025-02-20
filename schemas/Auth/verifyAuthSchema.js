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
        500: {
          description: "Erro interno",
          type: "object",
          properties: {
            message: { type: "string", example: "Erro interno" },
          },
        },
      },
    },
  };
  
  module.exports = verifyAuthSchema;
  