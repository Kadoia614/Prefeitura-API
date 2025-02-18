const getSetorSchema = {
  schema: {
    description: "Obtenha todos os setores",
    tags: ["Setor"],
    Response: {
      201: {
        description: "Setores obtidos com sucesso",
        type: "object",
        propetier: {
          setores: {
            type: "array",
            propetiers: {
              id: { type: "integer" },
              nome: { type: "string" },
              description: { type: "string" },
            },
          },
        },
      },

      401: {
        description: "Não autorizado",
        type: "object",
        propetier: {
          setores: {
            type: "array",
            propetiers: {
              id: { type: "integer" },
              nome: { type: "string" },
              description: { type: "string", example: "Não autorizado" },
            },
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

const postSetorSchema = {
  schema: {
    description: "Create a new sector",
    tags: ["Setor"],
    body: {
      type: "object",
      required: ["setor"],
      properties: {
        setor: {
          type: "object",
          required: ["name", "description"],
          properties: {
            name: { type: "string" },
            description: { type: "string" },
          },
        },
      },
    },

    response: {
      200: {
        description: "Setores cadastrado com sucesso",
        type: "object",
        propetier: {
          setores: {
            type: "array",
            propetiers: {
              id: { type: "integer" },
              nome: { type: "string" },
              description: { type: "string", example: "Setores cadastrado com sucesso" },
            },
          },
        },
      },

      401: {
        description: "Não autorizado",
        type: "object",
        propetier: {
          setores: {
            type: "array",
            propetiers: {
              id: { type: "integer" },
              nome: { type: "string" },
              description: { type: "string", example: "Não autorizado" },
            },
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

const updateSetorSchema = {
  schema: {
    description: "Create a new sector",
    tags: ["Setor"],
    body: {
      type: "object",
      required: ["setor"],
      properties: {
        setor: {
          type: "object",
          required: ["name", "description"],
          properties: {
            name: { type: "string" },
            description: { type: "string" },
          },
        },
      },
    },

    response: {
        200: {
            description: "Setores atualizado com sucesso",
            type: "object",
            propetier: {
              setores: {
                type: "array",
                propetiers: {
                  id: { type: "integer" },
                  nome: { type: "string" },
                  description: { type: "string", example: "Setores atualizado com sucesso"},
                },
              },
            },
          },
    
          401: {
            description: "Não autorizado",
            type: "object",
            propetier: {
              setores: {
                type: "array",
                propetiers: {
                  id: { type: "integer" },
                  nome: { type: "string" },
                  description: { type: "string", example: "Não autorizado" },    
                },
              },
            },
          },

          404: {
            description: "Não Encontrado",
            type: "object",
            propetier: {
              setores: {
                type: "array",
                propetiers: {
                  id: { type: "integer" },
                  nome: { type: "string" },
                  description: { type: "string", example: "Setor não encontrado" },    
                },
              },
            },
          },
    
          500: {
            description: "Erro interno no servidor",
            type: "object",
            properties: {
                message: { type: "string", example: "Erro interno no servidor" },
            }
          }
    }
  },
};

const deleteSetorSchema = {
  schema: {
    description: "Create a new sector",
    tags: ["Setor"],
    response: {
        200: {
            description: "Setores Excluido com sucesso",
            type: "object",
            propetier: {
              setores: {
                type: "array",
                propetiers: {
                  id: { type: "integer" },
                  nome: { type: "string" },
                  description: { type: "string", example: "Setores Excluido com sucesso"},
                },
              },
            },
          },
    
          401: {
            description: "Não autorizado",
            type: "object",
            propetier: {
              setores: {
                type: "array",
                propetiers: {
                  id: { type: "integer" },
                  nome: { type: "string" },
                  description: { type: "string", example: "Não autorizado" },    
                },
              },
            },
          },

          404: {
            description: "Não Encontrado",
            type: "object",
            propetier: {
              setores: {
                type: "array",
                propetiers: {
                  id: { type: "integer" },
                  nome: { type: "string" },
                  description: { type: "string", example: "Setor não encontrado" },    
                },
              },
            },
          },
    
          500: {
            description: "Erro interno no servidor",
            type: "object",
            properties: {
                message: { type: "string", example: "Erro interno no servidor" },
            }
          }
    }
  },
};

module.exports = {
  getSetorSchema,
  postSetorSchema,
  updateSetorSchema,
  deleteSetorSchema,
};
