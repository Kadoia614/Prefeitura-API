const getServiceSchema = {
  schema: {
    description: "Pegue todos os Serviços",
    tags: ["Services"],
    response: {
      201: {
        description: "requisição bem sucedida",
        type: "object",
        properties: {
          services: {
            type: "array",
            example: [
              {
                id: 1,
                name: "Painel Admin",
                description: "Gerencie seus Usuários",
                url: "/admin/",
              },
              {
                id: 2,
                name: "Painel Services",
                description: "Gerencie seus Serviços",
                url: "/admin/service",
              },
              {
                id: 3,
                name: "Setores",
                description: "gerencie os setores de seus usuários",
                url: "/admin/setor",
              },
              {
                id: 4,
                name: "Demandas do TI",
                description: "Aberturas e tratativas de chamados do Ti",
                url: "/demandasti",
              },
            ],
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

const getUserServicesSchema = {
  schema: {
    description: "Obtém somente os serviços ativos para o usuário",
    type: "object",
    tags: ["Services"],
    response: {
      201: {
        description: "requisição bem sucedida",
        type: "object",
        properties: {
          services: {
            type: "array",
            example: [
              {
                id: 1,
                name: "Painel Admin",
                description: "Gerencie seus Usuários",
                url: "/admin/",
              },
              {
                id: 2,
                name: "Painel Services",
                description: "Gerencie seus Serviços",
                url: "/admin/service",
              },
              {
                id: 3,
                name: "Setores",
                description: "gerencie os setores de seus usuários",
                url: "/admin/setor",
              },
              {
                id: 4,
                name: "Demandas do TI",
                description: "Aberturas e tratativas de chamados do Ti",
                url: "/demandasti",
              },
            ],
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

const postServiceSchema = {
  schema: {
    type: "object",
    tags: ["Services"],
    summary: "Cadastrar um novo serviço",
    description: "Cadastrar um novo serviço",
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        url: { type: "string" },
      },
    },
  },
};

const updateServiceSchema = {
    schema: {
      type: "object",
      tags: ["Services"],
      summary: "Cadastrar um novo serviço",
      description: "Cadastrar um novo serviço",
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          url: { type: "string" },
        },
      },
    },
  };

const deleteServiceSchema = {
  schema: {
    description: "Deleta um Serviço",
    tags: ["Services"],
    response: {
      200: {
        description: "Serviço deletado com sucesso",
        type: "object",
        properties: {
          message: { type: "string", example: "Serviço deletado com sucesso" },
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
        description: "Não é possível excluir o Serviços primários",
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Não é possível deletar esse Serviço",
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
  postServiceSchema,
  getServiceSchema,
  getUserServicesSchema,
  updateServiceSchema,
  deleteServiceSchema,
};
