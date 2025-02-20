exports.logout = async (request, reply) => {
  try {
    reply.clearCookie("token", {
      httpOnly: true, // Deve ser consistente com a configuração do cookie
      secure: false, // Deve ser consistente com a configuração do cookie
      sameSite: "strict", // Deve ser consistente com a configuração do cookie
      path: "/api"
    });
    reply.status(200).send("Logout bem-sucedido");
  } catch (error) {
    reply.status(error.status || 500).send(error.message || 'erro interno no servidor');
  }
};
