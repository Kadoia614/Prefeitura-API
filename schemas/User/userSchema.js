const { array } = require("zod");

const getUserSchema = {
  schema: {
    description: "Pegue todos os usuários",
    tags: ["Users"],
    response: {
      200: {
        description: "requisição bem sucedida",
        type: "object",
        properties: {
          users: {
            type: "array",
          },
          setores: {
            type: "array",
          },
          roles: {
            type: "array",
          },
        },
      },
      401: {
        description: "Sem autorização",
        type: "object",
        properties: {
          message: { type: "string", example: "Sem permissão" },
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

const postUserSchema = {
  schema: {
    description: "Pegue todos os usuários",
    tags: ["Users"],
    body: {
      type: "object",
      required: ["name", "email", "ramal", "setor_id", "role"],
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        ramal: { type: "string" },
        setor_id: { type: "integer" },
        role: { type: "string" },
      },
    },
    response: {
      200: {
        description: "requisição bem sucedida",
        type: "object",
        properties: {
          users: {
            type: "array",
          },
          setores: {
            type: "array",
          },
          roles: {
            type: "array",
          },
        },
      },
      401: {
        description: "Sem autorização",
        type: "object",
        properties: {
          message: { type: "string", example: "Sem permissão" },
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

const getOneUserSchema = {
  schema: {
    description: "Pegue todos os usuários",
    tags: ["Users"],
    response: {
      200: {
        description: "requisição bem sucedida",
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              id: { type: "integer" },
              name: { type: "string" },
              email: { type: "string" },
              ramal: { type: "string" },
              setor_id: { type: "integer" },
              role: { type: "string" },
              firstLogin: { type: "boolean" },
              permission: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    service_id: { type: "integer" },
                    active: { type: "boolean" },
                  },
                },
              },
            },
          },
        },
      },
      401: {
        description: "Sem autorização",
        type: "object",
        properties: {
          message: { type: "string", example: "Sem permissão" },
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

const updateUserSchema = {
  schema: {
    description: "Atualizar usuário",
    tags: ["Users"],
    body: {
      required: ["user"],

      type: "object",
      properties: {
        user: {
          required: [
            "name",
            "email",
            "ramal",
            "setor_id",
            "role",
            "permission",
          ],

          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            ramal: { type: "string" },
            setor_id: { type: "integer" },
            role: { type: "string" },
            permission: {
              type: "array",
              properties: {
                service_id: { type: "integer" },
                active: { type: "boolean" },
                service: { type: "object" },
              },
            },
          },
        },
      },
    },

    response: {
      200: {
        description: "Usuário atualizado com sucesso",
        type: "object",
        properties: {
          message: { type: "string", example: "Usuário salvo com sucesso" },
        },
      },
      401: {
        description: "Não autorizado",
        type: "object",
        properties: {
          message: { type: "string", example: "Sem autorização" },
        },
      },
      500: {
        description: "Erro interno do servidor",
        type: "object",
        properties: {
          message: { type: "string", example: "Erro interno no servidor" },
        },
      },
    },
  },
};

const deleteUserSchema = {
  schema: {
    description: "Deleta um usuário",
    tags: ["Users"],
    response: {
      200: {
        description: "Usuário deletado com sucesso",
        type: "object",
        properties: {
          message: { type: "string", example: "Usuário deletado com sucesso" },
        },
      },
      401: {
        description: "Sem autorização",
        type: "object",
        properties: {
          message: { type: "string", example: "Sem permissão" },
        },
      },
      403: {
        description: "Não é possível excluir o usuário primário",
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Não é possível deletar esse usuário",
          },
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

module.exports = {
  getUserSchema,
  postUserSchema,
  getOneUserSchema,
  deleteUserSchema,
  updateUserSchema,
};
