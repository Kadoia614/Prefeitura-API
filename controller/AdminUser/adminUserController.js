const { getAll, getOne, create, update, remove } = require("./adminUser");
const { verifyParam } = require("../../middleware/verifyParam");
const { verifyToken } = require("../../middleware/auth");
const { checkPermission } = require("../../middleware/checkPermission");
const { verifyEmail } = require("../../middleware/verifyEmail");

const serviceID = 1;
const roles = ["admin", "tecnico", "gestor", "user"];

exports.cadastrarUser = async (request, reply) => {
  const token = request.cookies.token;
  try {
    const user = await verifyToken(token);
    await checkPermission(user.id, user.role, serviceID, ["admin", "tecnico"]);
    await verifyParam(["name", "email", "role", "setor_id", "role"], request.body);

    let target = request.body;

    if (!roles.includes(target.role)) {
      return reply.status(400).send("Opção não disponível");
    }

    await create(target);
    return reply.status(201).send("Cadastro realizado com sucesso");
  } catch (error) {
    return reply
      .status(error.status || 500)
      .send(error.message || "Erro interno do servidor");
  }
};

exports.getOneUser = async (request, reply) => {
  const token = request.cookies.token;
  try {
    const user = await verifyToken(token);
    await verifyParam(["id"], request.params);
    await checkPermission(user.id, user.role, serviceID, "admin");

    const oneUser = await getOne(request.params.id);
    return reply.status(200).send({user: oneUser});
  } catch (error) {
    return reply
      .status(error.status || 500)
      .send(error.message || "Erro interno do servidor");
  }
};

exports.getAllUser = async (request, reply) => {
  const token = request.cookies.token;
  try {
    const user = await verifyToken(token);
    await checkPermission(user.id, user.role, serviceID, [
      "admin",
      "tecnico",
      "gestor",
    ]);

    const data = await getAll(token);
    return reply
      .status(200)
      .send({ users: data.allUsers, setores: data.setores, roles: data.roles });
  } catch (error) {
    return reply
      .status(error.status || 500)
      .send(error.message || "Erro interno do servidor");
  }
};

exports.atualizarUser = async (request, reply) => {
  const token = request.cookies.token;
  try {
    const user = await verifyToken(token);
    await verifyParam(["id"], request.params);
    await verifyParam(
      ["name", "email", "ramal", "setor_id", "role", "permission"],
      request.body.user
    );

    let target = request.body.user;
    await checkPermission(user.id, user.role, serviceID, ["admin", "tecnico"]);
    await verifyEmail(target.email);

    if (!roles.includes(target.role)) {
      return reply.status(400).send("Opção não disponível");
    }

    await update(target, request.params.id);
    return reply.status(200).send("Atualização bem-sucedida");
  } catch (error) {
    return reply
      .status(error.status || 500)
      .send(error.message || "Problemas ao atualizar usuário");
  }
};

exports.deletarUser = async (request, reply) => {
  const token = request.cookies.token;
  try {
    await verifyParam(["id"], request.params);
    const user = await verifyToken(token);
    await checkPermission(user.id, user.role, serviceID, "admin");

    let id = request.params.id;
    if (id == 1) {
      return reply.status(403).send("Não é possível deletar esse usuário");
    }

    await remove(id);
    return reply.status(200).send("Usuário deletado com sucesso");
  } catch (error) {
    return reply
      .status(error.status || 500)
      .send(error.message || "Problemas no servidor...");
  }
};
