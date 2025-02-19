const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../../middleware/auth");
const { z } = require("zod"); // Importação correta do Zod

const DBUser = require("../../db/model/UserModel");
const bcrypt = require("bcryptjs"); // Para comparação de senha criptografada

exports.login = async (request, reply) => {
    
  const { email, pass, permanecerConectado } = request.body;

  try {
    const user = await DBUser.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return reply.status(401).send("Email ou senha incorretos");
    }

    const validPassword = await bcrypt.compare(pass, user.password);

    if (!validPassword && pass != user.password) {
      return reply.status(401).send("Email ou senha incorretos");
    }

    const tokenPayload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };
    
    const token = jwt.sign(tokenPayload, PRIVATE_KEY);

const tokenOptions = {
  httpOnly: false, 
  secure: false, 
  sameSite: "none",
  token: token,
  maxAge: permanecerConectado ? 3600 : 3600 * 8,
};
    
    if (permanecerConectado) {
      reply.cookie("token", token, { ...tokenOptions, maxAge: 3600 });
    } else {
      reply.cookie("token", token, { ...tokenOptions, maxAge: 3600 * 8 });
    }

    reply.status(200).send({
      firstLogin: user.firstLogin,
      message: "Login bem sucedido",
      scopo: user.role,
    });
  } catch (error) {
    console.error("Erro ao processar o login:", error);
    return reply.status(500).send({ message: "Erro interno no servidor", error: error });
  }
};