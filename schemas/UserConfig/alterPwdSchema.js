const alterPwdSchema = {
  schema: {
    description: "Alterar senha do usuário, só pode ser alterado pelo mesmmo",
    tags: ["User-Config"],
    body: {
      required: ['email', 'oldPass', 'newPass'],
      properties: {
        email: { type: "string" },
        oldPass: { type: "string" },
        newPass: { type: "string" },
      },
    },

    response: {
      200: {
        description: "senha alterada com sucesso",
        type: "object",
        properties: {
          message: { type: "string", example: "Senha alterada com sucesso" },
        },
      },
      401: {
        description: "senha alterada com sucesso",
        type: "object",
        properties: {
          message: { type: "string", example: "Email ou senha incorretos" },
        },
      },
      500: {
        description: "senha alterada com sucesso",
        type: "object",
        properties: {
          message: { type: "string", example: "Erro interno no servidor" },
        },
      },
    },
  },
};

module.exports = alterPwdSchema;
