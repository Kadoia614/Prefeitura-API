const { checkPermission } = require("../../middleware/checkPermission");
const { verifyToken } = require("../../middleware/auth");
const { verifyParam } = require("../../middleware/verifyParam");
const DBDemandas = require("../../db/model/demandasModel");
const {
  getAll,
  create,
  update,
  remove,
  getHistory,
  updateAssume,
  getUserDemanda,
  updateFinalizar
} = require("./demandasTi");

const SERVICE_ID = 4;

//#region /demandas
exports.pegarTodasDemandas = async (requestuest, reply) => {
  const token = requestuest.cookies.token;

  try {
    const user = await verifyToken(token);
    await checkPermission(user.id, user.role, SERVICE_ID, ["admin", "tecnico"]);

    const message = await getAll(user);

    reply.status(200).send({ demandas: message.demandas, scopo: message.scopo });
  } catch (error) {
    reply
      .status(error.status || 500)
      .send(error.message || "Erro ao buscar demandas");
  }
};

exports.cadastrarDemandas = async (requestuest, reply) => {
  const token = requestuest.cookies.token;

  try {
    const user = await verifyToken(token);

    await checkPermission(user.id, user.role, SERVICE_ID, [
      "admin",
      "gestor",
      "user",
    ]);

    await verifyParam(
      ["patrimonio", "description", "prioridade"],
      requestuest.body
    );

    let target = requestuest.body;

    let message = await create(target, user.id);

    reply.status(200).send("Demanda cadastrada com sucesso");
  } catch (error) {
    reply
      .status(error.status || 500)
      .send(error.message || "Erro ao buscar demandas");
  }
};

exports.deletarDemandas = async (requestuest, reply) => {
  const token = requestuest.cookies.token;

  try {
    const user = await verifyToken(token);
    await checkPermission(user.id, user.role, SERVICE_ID, ["admin"]);

    verifyParam(["id"], requestuest.params);
    const id = requestuest.params.id;

    const deleted = await remove(id);
    reply
      .status(200)
      .send({ message: "Demanda excluida com sucesso", scopo: user.role });
  } catch (error) {
    reply
      .status(error.status || 500)
      .send({ message: error.message || "Erro interno no servidor" });
  }
};

//#endregion /demandas

//#region /User
exports.atualizarDemandas = async (requestuest, reply) => {
  const token = requestuest.cookies.token;

  try {
    const user = await verifyToken(token);

    verifyParam(["id"], requestuest.params);
    verifyParam(
      ["patrimonio", "description", "prioridade", "status"],
      requestuest.body
    );
    let target = requestuest.body;
    let id = requestuest.params.id;

    await checkPermission(user.id, user.role, SERVICE_ID, [
      "admin",
      "gestor",
      "tecnico",
      "user",
    ]);

  
    let updated;

    switch (user.role) {
      case "admin":
        updated = await DBDemandas.update(
          {
            user_id: user.id,
            setor_id: user.setor_id,
            patrimonio: target.patrimonio,
            description: target.description,
            prioridade: target.prioridade,
            status: target.status,
          },
          {
            where: { id: id },
          }
        );
        break;
      case "tecnico":
        updated = await DBDemandas.update(
          {
            user_id: user.id,
            prioridade: target.prioridade,
          },
          {
            where: { id: id },
          }
        );
        break;
      case "user":
      case "gestor":
        updated = await DBDemandas.update(
          {
            user_id: user.id,
            description: target.description,
          },
          {
            where: { id: id },
          }
        );
        break;
      default:
        updated = await DBDemandas.update(
          {
            user_id: user.id,
            setor: target.setor,
            description: target.description,
          },
          {
            where: { id: id },
          }
        );
    }

    reply.status(200).send("Demanda atualizada");
  } catch (error) {
    reply
      .status(error.status || 500)
      .send(error.message || "Erro ao buscar demandas");
  }
};

exports.historyDemandas = async (requestuest, reply) => {
  const token = requestuest.cookies.token;

  try {
    const user = await verifyToken(token);
    await checkPermission(user.id, user.role, SERVICE_ID, [
      "admin",
      "tecnico",
      "user",
      "gestor",
    ]);

    const history = await getHistory(user);

    reply.status(200).send({demandas: history});
  } catch (error) {
    reply
      .status(error.status || 500)
      .send(error.message || "Erro ao buscar demandas");
  }
};

exports.pegarUserDemandas = async (requestuest, reply) => {
  const token = requestuest.cookies.token;

  try {
    const user = await verifyToken(token);

    await checkPermission(user.id, user.role, SERVICE_ID, [
      "tecnico",
      "user",
      "gestor",
    ]);

    const message = await getUserDemanda(user);

    reply.status(200).send({ demandas: message.userDemandas, scopo: message.scopo });
  } catch (error) {
    reply
      .status(error.status || 500)
      .send(error.message || "Erro ao buscar demandas");
  }
};

//#endregion /User
exports.assumirDemanda = async (request, reply) => {
  const token = request.cookies.token;

  try {
    await verifyParam(["id"], request.params);
    let id = request.params.id;
    const user = await verifyToken(token);
    await checkPermission(user.id, user.role, SERVICE_ID, ["tecnico"]);

    let updated = await updateAssume(id, user);

    reply.status(200).send(updated);
  } catch (error) {
    reply
      .status(error.status || 500)
      .send(error.message || "Erro ao buscar demandas");
  }
};

exports.finalizarDemanda = async (request, reply) => {
  const token = request.cookies.token;

  try {
    await verifyParam(["id"], request.params);
    let id = request.params.id;
    const user = await verifyToken(token);
    await checkPermission(user.id, user.role, SERVICE_ID, ["tecnico"]);

    let finalizada = await updateFinalizar(id);

    reply.status(200).send('demanda finalizada com sucesso');
  } catch (error) {
    reply
      .status(error.status || 500)
      .send(error.message || "Erro ao buscar demandas");
  }
}
