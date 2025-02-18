const DBUser = require("../../db/model/UserModel");
const DBPermission = require("../../db/model/PermissionModel");
const DBService = require("../../db/model/ServiceModel");
const { verifyToken } = require("../../middleware/auth");
const { checkPermission } = require("../../middleware/checkPermission");

const seviceID = 2

// Obtem todos os serviços independente do usuário
exports.getAll = async (token) => {
  try {
    const user = await verifyToken(token);
    await checkPermission(user.id, user.role, seviceID, ['admin']);

    const AllServices = await DBService.findAll();
    return AllServices;
  } catch (error) {
    throw { status: error.status || 500, message: error.message || "Erro ao obter serviços" };
  }
};

// Obtem todos os serviços do usuário
exports.getOne = async (token) => {
  try {
    const user = await verifyToken(token);
    // Verifica se o usuário é admin para ignorar a verificação de permissões de visualização
    if (user.role != "admin") {
      const services = await DBService.findAll({
        include: {
          model: DBPermission,
          as: "permission", // Alias definido no relacionamento
          where: { user_Id: user.id, active: true },
          attributes: { exclude: ["id", "user_Id"] },
          include: {
            model: DBService,
            as: "service", // Alias definido no relacionamento
            attributes: { exclude: ["id"] },
          },
        },
      });
            
      return services;
    } else {
      const services = await DBService.findAll({
        include: {
          model: DBPermission,
          as: "permission", // Alias definido no relacionamento
          attributes: { exclude: ["id", "user_Id"] },
          where: { user_Id: user.id },
        },
      });

      return services;
    }
  } catch (error) {
    throw { status: error.status || 500, message: error.message || "Erro ao obter serviços" };
  }
};

// Cria um novo serviço
exports.create = async (token, service) => {
  try {
    const user = await verifyToken(token);
    // Função que verifica se o usuário tem permissão para criar
    await checkPermission(user.id, user.role, seviceID, 'admin');

    const newService = await DBService.create({
      name: service.name,
      description: service.description,
      url: service.url,
    });

    const users = await DBUser.findAll();

    for (const user of users) {
      await DBPermission.create({
        user_id: user.id,
        service_id: newService.id,
        active: false,
      });
    }
  } catch (error) {
    throw { status: 500, message: error.message || "Erro ao criar serviço" };
  }
};

// Atualiza um serviço
exports.update = async (token, service, paramId) => {
  try {
    const user = await verifyToken(token);
    // Função que verifica se o usuário tem permissão para editar
    await checkPermission(user.id, user.role, seviceID, 'admin');

    const [updated] = await DBService.update(
      {
        name: service.name,
        description: service.description,
        url: service.url,
      },
      {
        where: {
          id: paramId,
        },
      }
    );

    if (updated < 1) {
      throw { status: 404, message: "Serviço não encontrado" };
    }

    return updated;
  } catch (error) {
    throw { status: 500, message: error.message || "Erro ao atualizar serviço" };
  }
};

// Remove um serviço
exports.remove = async (token, paramId) => {
  try {
    const user = await verifyToken(token);
    // Função que verifica se o usuário tem permissão para deletar
    await checkPermission(user.id, user.role, seviceID, 'admin');

    const destroy = await DBService.destroy({
      where: {
        id: paramId,
      },
    });

    if (destroy < 1) {
      throw { status: 404, message: "Serviço não encontrado" };
    }

    return destroy;
  } catch (error) {
    throw { status: 500, message: error.message || "Erro ao remover serviço" };
  }
};