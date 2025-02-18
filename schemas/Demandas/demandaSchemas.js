const demandasGetSchema = {
  schema: {
    description: "Obtém todas as demandas",
    tags: ["Demandas"],
    response: {
      200: {
        description: "Requisição bem sucedida",
        type: "object",
        properties: {
          demandas: {
            type: "array",
            example: [
              {
                id: 3,
                patrimonio: "teste",
                description: "teste",
                prioridade: 2,
                status: 0,
                responsavel: null,
                createdAt: "2025-02-17T13:06:53.000Z",
                updatedAt: "2025-02-17T13:06:53.000Z",
                user: {
                  name: "kadoia",
                  ramal: "1234",
                  email: "kadoia",
                  setor_id: 1,
                },
                setor: {
                  name: "tecnologia",
                },
                responsavel_user: null,
              },
            ],
          },
          scopo: {
            type: "string",
            example: "admin",
          },
        },
      },
      401: {
        description: "Sem autorização",
        type: "object",
        properties: {
          message: { type: "string", example: "Sem autorização" },
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

const demandasPostSchema = {
  schema: {
    description: "Post de demandas, utilizado para cadastrar novas demandas",
    tags: ["Demandas"],

    body: {
      type: "object",
      required: ["patrimonio"],
      properties: {
        description: { type: "string" },
        patrimonio: { type: "string" },
        prioridade: { type: "integer" },
      },
    },

    response: {
      200: {
        description: "Cadastro feito com sucesso",
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Demanda cadastrada com sucesso.",
          },
        },
      },
      401: {
        description: "Sem autorização para realizar o cadastro",
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Sem autorização",
          },
        },
      },
      500: {
        description: "Erro interno no servidor",
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Erro interno no servidor.",
          },
        },
      },
    },
  },
};

const getUserDemandas = {
  schema: {
    description:
      "Obtém todas as demandas com o user como criador ou responsável",
    tags: ["Demandas"],

    response: {
      200: {
        description: "Requisição bem sucedida",
        type: "object",
        properties: {
          demandas: {
            type: "array",
            example: [
              {
                id: 3,
                patrimonio: "teste",
                description: "teste",
                prioridade: 2,
                status: 0,
                responsavel: null,
                createdAt: "2025-02-17T13:06:53.000Z",
                updatedAt: "2025-02-17T13:06:53.000Z",
                user: {
                  name: "kadoia",
                  ramal: "1234",
                  email: "kadoia",
                  setor_id: 1,
                },
                setor: {
                  name: "tecnologia",
                },
                responsavel_user: "kadoia",
              },
            ],
          },
          scopo: {
            type: "string",
            example: "admin",
          },
        },
      },
      401: {
        description: "Sem autorização",
        type: "object",
        properties: {
          message: { type: "string", example: "Sem autorização" },
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

const demandasDeleteSchema = {
  schema: {
    description: "Rota para exclusão de demandas (chamados), somente adm",
    tags: ["Demandas"],

    response: {
      200: {
        description: "demanda excluída com sucesso",
        properties: {
          message: {
            type: "string",
            message: "Demanda Excluída com sucesso",
          },
        },
      },
      401: {
        description: "Sem autorização para excluir a demanda",
        properties: {
          message: {
            type: "string",
            message: "Sem permissão para excluir a demanda",
          },
        },
      },
      500: {
        description: "Problemas internos no servidor",
        properties: {
          message: {
            type: "string",
            message: "Problemas internos no servidor",
          },
        },
      },
    },
  },
};

const assumirDemandasSchema = {
  schema: {
    description:
      "Rota para assumir a responsabilidade do atendimento de demandas.",
    tags: ["Demandas"],

    response: {
      200: {
        description: "Demanda assumida com sucesso",
        type: "object",
        properties: {
          message: { type: "string", message: "Demanda assumida com sucesso" },
        },
      },
      401: {
        description: "Sem permissçao para assumir demandas",
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Sem permissão para assumir demandas",
          },
        },
      },
      500: {
        description: "Problemas internos no servidor",
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Problemas internos no servidor",
          },
        },
      },
    },
  },
};

const updateUserDemandas = {
  schema: {
    description:
      "atualiza as informações da demanda dependendo da role do usuário / adm pode editar tudo, tecnico somente",
    tags: ["Demandas"],

    body: {
      type: "object",
      required: ["patrimonio", "description", "prioridade", "status"],
      properties: {
        description: { type: "string" },
        patrimonio: { type: "string" },
        prioridade: { type: "integer" },
        status: { type: "integer" },
      },
    },
    response: {
      200: {
        description: "Demanda Atualizada com sucesso",
        type: "object",
        properties: {
          message: {
            type: "string",
            message: "Demanda Atualizada com sucesso",
          },
        },
      },
      401: {
        description: "Sem permissao para Atualizar a demanda",
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Sem permissão para Atualizar a demanda",
          },
        },
      },
      500: {
        description: "Problemas internos no servidor",
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Problemas internos no servidor",
          },
        },
      },
    },
  },
};

const finalizarDemandaSchema = {
  schema: {
    description: "Rota para finalizada chamado de demanda específica.",
    tags: ["Demandas"],

    response: {
      200: {
        description: "Demanda finalizada com sucesso",
        type: "object",
        properties: {
          message: {
            type: "string",
            message: "Demanda finalizada com sucesso",
          },
        },
      },
      401: {
        description: "Sem permissao para finalizar a demanda",
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Sem permissão para finalizar a demanda",
          },
        },
      },
      500: {
        description: "Problemas internos no servidor",
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Problemas internos no servidor",
          },
        },
      },
    },
  },
};

//arrumar daqui para baixo

const demandasGetHistory = {
  schema: {
    description:
      "Obtém todas as demandas finalizadas, caso seja admin ou tecnico, pega todas, caso contrário, somente as com o user como criador ou responsável",
    tags: ["Demandas"],

    response: {
      200: {
        description: "Requisição bem sucedida",
        type: "object",
        properties: {
          demandas: {
            type: "array",
            example: [
              {
                id: 3,
                patrimonio: "teste",
                description: "teste",
                prioridade: 2,
                status: 3,
                responsavel: null,
                createdAt: "2025-02-17T13:06:53.000Z",
                updatedAt: "2025-02-17T13:06:53.000Z",
                user: {
                  name: "kadoia",
                  ramal: "1234",
                  email: "kadoia",
                  setor_id: 1,
                },
                setor: {
                  name: "tecnologia",
                },
                responsavel_user: null,
              },
            ],
          },
          scopo: {
            type: "string",
            example: "admin",
          },
        },
      },
      401: {
        description: "Sem autorização",
        type: "object",
        properties: {
          message: { type: "string", example: "Sem autorização" },
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
  demandasGetSchema,
  demandasPostSchema,
  demandasDeleteSchema,
  assumirDemandasSchema,
  getUserDemandas,
  updateUserDemandas,
  demandasGetHistory,
  finalizarDemandaSchema,
};
