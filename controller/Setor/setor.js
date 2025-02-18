const DBSetor = require("../../db/model/SetorModel");
const { verifyToken } = require("../../middleware/auth");
const { checkPermission } = require("../../middleware/checkPermission");

const seviceID = 3;

// Cria um novo serviço
exports.create = async (token, setor) => {
  try {
    const user = await verifyToken(token);
    // Função que verifica se o usuário tem permissão para criar
    await checkPermission(user.id, user.role, seviceID, ["admin", "tecnico"]);

    const newSetor = await DBSetor.create({
      name: setor.name,
      description: setor.description,
    });
  } catch (error) {
    throw { status: 500, message: error.message || "Erro ao criar Setor" };
  }
};
// Obtem todos os serviços independente do usuário
exports.getAll = async (token) => {
  try {
    const user = await verifyToken(token);
    await checkPermission(user.id, user.role, seviceID, ["admin", "tecnico"]);

    const AllSetor = await DBSetor.findAll();

    return AllSetor;
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || "Erro ao obter Setor",
    };
  }
};

exports.update = async (token, service, paramId) => {
  try {
    const user = await verifyToken(token);
    // Função que verifica se o usuário tem permissão para editar
    await checkPermission(user.id, user.role, seviceID, ["admin", "tecnico"]);

    const [updated] = await DBSetor.update(
      {
        name: service.name,
        description: service.description,
      },
      {
        where: {
          id: paramId,
        },
      }
    );

    if (updated < 1) {
      throw { status: 404, message: "Setor não encontrado" };
    }

    return updated;
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || "Erro ao atualizar Setor",
    };
  }
};

exports.remove = async (token, paramId) => {
  try {
    const user = await verifyToken(token);
    // Função que verifica se o usuário tem permissão para deletar
    await checkPermission(user.id, user.role, seviceID, ["admin", "tecnico"]);

    const destroy = await DBSetor.destroy({
      where: {
        id: paramId,
      },
    });

    if (destroy < 1) {
      throw { status: 404, message: "Serviço não encontrado" };
    }

    return destroy;
  } catch (error) {
    throw { status: error.status || 500, message: error.message || "Erro ao remover serviço" };
  }
};