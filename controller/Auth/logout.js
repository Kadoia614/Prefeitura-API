exports.logout = async (request, reply) => {
  try {
    reply.clearCookie("token");
  reply.status(200).send("Logout bem-sucedido");
  } catch (error) {
    reply.status(error.status || 500).send(error.messagem || 'erro interno no servidor')
  }
  
};
