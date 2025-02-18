const DBDemandas = require("../../db/model/demandasModel");
const DBUser = require("../../db/model/UserModel");
const DBSetor = require("../../db/model/SetorModel");
const { Op } = require("sequelize");

exports.getAll = async (user) => {
  try {
    let demandas = await DBDemandas.findAll({
      attributes: { exclude: ["user_id"] },
      where: {
        status: { [Op.not]: 3 },
      },

      include: [
        {
          model: DBUser,
          as: "user",
          attributes: ["name", "id", "ramal", "email"],
          include: [
            {
              model: DBSetor,
              as: "setor",
              attributes: ["name"],
            },
          ],
        },
        {
          model: DBUser,
          as: "responsavel_user",
          attributes: ["name", "id"],
        },
      ],
    });

    return { demandas, scopo: user.role };
  } catch (error) {
    throw {
      erro: error.status || 500,
      message: error.message || "Problemas no servidor",
    };
  }
};

exports.getUserDemanda = async (user) => {
  try {
    let userDemandas = await DBDemandas.findAll({
      attributes: { exclude: ["user_id"] },
      where: {
        [Op.and]: [
          { [Op.or]: [{ user_id: user.id }, { responsavel: user.id }] },
          { status: { [Op.not]: 3 } },
        ],
      },

      include: [
        {
          model: DBUser,
          as: "user",
          attributes: ["name", "id", "ramal", "email"],
          include: [
            {
              model: DBSetor,
              as: "setor",
              attributes: ["name"],
            },
          ],
        },
        {
          model: DBUser,
          as: "responsavel_user",
          attributes: ["name", "id"],
        },
      ],
    });
    return { userDemandas, scopo: user.role };
  } catch (error) {
    throw {
      error: error.status || 500,
      message: error.message || "Problemas internos no servidor",
    };
  }
};

exports.create = async (target, userTarget) => {
  try {
    const user = await DBUser.findOne({
      where: {
        id: userTarget,
      },
      attributes: { exclude: ["password"] },
    });

    await DBDemandas.create({
      user_id: user.id,
      patrimonio: target.patrimonio,
      description: target.description,
      prioridade: target.prioridade,
      status: 0,
    });
  } catch (error) {
    throw {
      error: error.status || 500,
      message: error.message || "Problemas internos no servidor",
    };
  }
};

exports.update = async (target, dataTarget) => {};

exports.remove = async (target) => {
  try {
    let excluded = await DBDemandas.destroy({
      where: { id: target },
    });

    if (excluded < 1) {
      throw { status: 404, message: "Demanda não encontrada" };
    }
  } catch (error) {
    throw {
      error: error.status || 500,
      message: error.message || "Problemas internos no servidor",
    };
  }
};

exports.getHistory = async (user) => {
  try {
    let historyDemandas = DBDemandas.findAll({
      where: {
        [Op.or]: [{ user_id: user.id }, { responsavel: user.id }],
        status: 3,
      },
    });
    return historyDemandas;
  } catch (error) {
    throw {
      error: error.status || 500,
      message: error.message || "Problemas internos no servidor",
    };
  }
};

exports.updateAssume = async (id, user) => {
  try {
    let updated = await DBDemandas.update(
      {
        status: 1,
        responsavel: user.id,
      },
      {
        where: {
          id: id,
        },
      }
    );

    console.log(user.id);
    return updated;
  } catch (error) {
    throw {
      error: error.status || 500,
      message: error.message || "Problemas internos no servidor",
    };
  }
};

exports.updateFinalizar = async (id) => {
  try {
    let finalized = await DBDemandas.update(
      {
        status: 3,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return finalized;
  } catch (error) {
    throw {
      error: error.status || 500,
      message: error.message || "Problemas internos no servidor",
    };
  }
};
