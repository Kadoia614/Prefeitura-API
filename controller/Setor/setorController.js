const { getAll, create, update, remove } = require("./setor");
const { verifyParam } = require("../../middleware/verifyParam");

exports.pegarSetor = async (request, reply) => {
  const token = request.cookies.token;

  try {
    const message = await getAll(token);

    return reply.status(201).send({setores: message});
  } catch (error) {
    return reply
      .status(error.status || 500)
      .send(error.message || "problemas internos");
  }
};

exports.cadastrarSetor = async (request, reply) => {
  const token = request.cookies.token;

  try {
    verifyParam(["name", "description"], request.body.setor);
    await create(token, request.body.setor);

    reply.status(200).send("Serviço cadatrado com sucesso");
  } catch (error) {
    reply
      .status(error.status || 500)
      .send({ message: error.message || "Problemas no servidor" });
  }
};

exports.atualizarSetor = async (request, reply) => {
      const token = request.cookies.token;
      
      try {
        verifyParam(["id"], request.params);
        verifyParam(["name", "description"], request.body.setor);
        const updated = await update(token, request.body.setor, request.params.id);  
    
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
}


exports.deletarSetor = async (request, reply) => {
    const token = request.cookies.token;
    
    try {
      verifyParam(["id"], request.params);
      const removed = await remove(token, request.params.id);  
  
      if (removed) {
        reply.status(200).send("Serviço apagado com sucesso");
      } else {
        reply.status(404).send("Não houve alterações");
      }
    } catch (error) {
      reply
        .status(error.status || 500)
        .send({ message: error.message || "Problemas no servidor..." });
    }
}
