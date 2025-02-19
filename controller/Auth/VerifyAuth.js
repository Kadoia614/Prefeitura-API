const DBUser = require("../../db/model/UserModel");
const { verifyToken } = require("../../middleware/auth");

exports.verifyAuth = async (request, repply) => {
  const token = request.cookies.token;
  try {
    const user = await verifyToken(token);
    const verifyUser = await DBUser.findOne({
      where: {
        id: user.id,
      },
    });
    if (!verifyUser) {
      throw { message: "Unauthorized", status: 401 };
    }

    return repply.status(200).send('Usuário authenticado');
  } catch (error) {
    return repply.status(error.status || 401).send(error.message || "Unauthorized");
  }
};
