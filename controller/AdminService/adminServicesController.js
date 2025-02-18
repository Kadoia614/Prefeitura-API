const { getAll, getOne, create, update, remove } = require("./adminService");
const { verifyParam } = require("../../middleware/verifyParam");

exports.getAllServices = async (request, reply) => {
  const token = request.cookies.token;

  try {
    const services = await getAll(token);

    return reply.status(201).send({services: services});
  } catch (error) {
    return reply
      .status(error.status || 500)
      .send(error.message || "problemas internos");
  }
};

exports.getUserServices = async (request, reply) => {
  const token = request.cookies.token;

  try {
    const services = await getOne(token);

    return reply.status(201).send({services: services});
  } catch (error) {
    return reply
      .status(error.status || 500)
      .send(error.message || "Problemas no servidor");
  }
};

exports.createServices = async (request, reply) => {
  const token = request.cookies.token;

  try {
    verifyParam(["name", "description", "url"], request.body.service);
    await create(token, request.body.service);

    reply.status(200).send("Serviço cadatrado com sucesso");
  } catch (error) {
    reply
      .status(error.status || 500)
      .send({ message: error.message || "Problemas no servidor" });
  }
};

exports.atualizarService = async (request, reply) => {
  const token = request.cookies.token;
  
  try {
    verifyParam(["id"], request.params);
    verifyParam(["name", "description", "url"], request.body.service);
    const updated = await update(token, request.body.service, request.params.id);  

    if (updated) {
      reply.status(200).send("Serviço atualizado com sucesso");
    } else {
      reply.status(404).send("Não houve alterações");
    }
  } catch (error) {
    reply
      .status(error.status || 500)
      .send({ message: error.message || "Problemas no servidor..." });
  }
};

exports.deletarService = async (request, reply) => {
  const token = request.cookies.token;

  try {
    verifyParam(["id"], request.params);
    if(request.params.id == 1 || request.params.id == 2 || request.params.id == 3){
      throw { status: 403, message: "Não é possível deletar esse serviço" };
    }
    await remove(token, request.params.id);
    

      reply.status(200).send("Serviço excluido com sucesso");
  } catch (error) {
    reply
      .status(error.status || 500)
      .send( error.message || "Problemas no servidor..." );
  }
};