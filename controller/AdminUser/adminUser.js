const DBUser = require("../../db/model/UserModel");
const DBPermission = require("../../db/model/PermissionModel");
const DBService = require("../../db/model/ServiceModel");
const DBSetor = require("../../db/model/SetorModel");
const bcrypt = require("bcryptjs");

// Permissões disponíveis
const roles = ["admin", "tecnico", "gestor", "user"];

// Função para criar um usuário
exports.create = async (userTarget) => {
  try {
    // Gera um hash seguro para a senha
    const hashedPassword = await bcrypt.hash(userTarget.name, 10);

    // Cria o usuário no banco de dados
    const newUser = await DBUser.create({
      name: userTarget.name,
      email: userTarget.email,
      ramal: userTarget.ramal,
      setor_id: userTarget.setor_id,
      password: hashedPassword,
      role: userTarget.role,
    });

    // Obtém todos os serviços e define permissões padrão
    const services = await DBService.findAll();
    const permissions = services.map((service) => ({
      user_id: newUser.id,
      service_id: service.id,
      active: false,
    }));

    // Cria todas as permissões de uma vez (bulkInsert)
    await DBPermission.bulkCreate(permissions);

    return newUser;
  } catch (error) {
    throw new Error("Erro ao criar usuário: " + error.message);
  }
};

// Obtém um único usuário por ID
exports.getOne = async (paramId) => {
  try {
    const oneUser = await DBUser.findOne({
      where: { id: paramId },
      attributes: { exclude: ["password"] },
      include: {
        model: DBPermission,
        as: "permission",
        attributes: { exclude: ["id", "user_id"] },
      },
    });

    if (!oneUser) throw new Error("Usuário não encontrado");

    return oneUser;
  } catch (error) {
    throw new Error("Erro ao obter usuário: " + error.message);
  }
};

// Obtém todos os usuários
exports.getAll = async () => {
  try {
    const allUsers = await DBUser.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: DBPermission,
          as: "permission",
          attributes: { exclude: ["id", "user_id"] },
          include: [
            {
              model: DBService,
              as: "service",
              attributes: { exclude: ["id"] },
            },
          ],
        },
        {
          model: DBSetor,
          as: "setor",
          attributes: ["name"],
        },
      ],
    });

    const setor = await DBSetor.findAll();

    return { allUsers, setores: setor, roles };
  } catch (error) {
    throw new Error("Erro ao obter usuários: " + error.message);
  }
};

// Atualiza um usuário
exports.update = async (userTarget, paramId) => {
  try {
    // Atualiza o usuário
    const updated = await DBUser.update(
      {
        name: userTarget.name,
        email: userTarget.email,
        ramal: userTarget.ramal,
        setor_id: userTarget.setor_id,
        role: userTarget.role,
      },
      { where: { id: paramId } }
    );

    // Atualiza permissões em lote
    for (const service of userTarget.permission) {
      await DBPermission.update(
        {
          active: service.active,
        },
        {
          where: {
            user_id: paramId,
            service_id: service.service_id,
          },
        }
      );
    }

    return "Usuário atualizado com sucesso";
  } catch (error) {
    throw new Error("Erro ao atualizar usuário: " + error.message);
  }
};

// Remove um usuário
exports.remove = async (paramId) => {
  try {
    const deleted = await DBUser.destroy({ where: { id: paramId } });

    if (!deleted) throw new Error("Usuário não encontrado");

    return "Usuário removido com sucesso";
  } catch (error) {
    throw new Error("Erro ao remover usuário: " + error.message);
  }
};
