const { verifyToken } = require("../../middleware/auth");
const DBUser = require("../../db/model/UserModel");
const bcrypt = require("bcryptjs");

exports.alterPwd = async (token, email, oldpass, newPass) => {
  try {
    const user = await verifyToken(token);

    const userInfo = await DBUser.findOne({
      where: {
        email: email,
        id: user.id,
      },
    });

    if (!userInfo) {
      throw { status: 401, message: "Email ou senha incorretos" };
    }

    const validPassword = await bcrypt.compare(oldpass, userInfo.password);

    if (!validPassword && oldpass != userInfo.password) {
      throw { status: 401, message: "Email ou senha incorretos" };
    }

    const newHashedPass = await bcrypt.hash(newPass, 10);

    const updated = await DBUser.update(
      {
        password: newHashedPass,
        firstLogin: false,
      },
      {
        where: {
          email: email,
          id: user.id,
        },
      }
    );

    return updated;
  } catch (error) {
    throw { status: error.status || 500, message: error.message || "Erro ao alterar a senha" };
  }
};
