const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.PRIVATE_KEY = process.env.SECRET_KEY;

exports.verifyToken = (token) => {
  return new Promise((resolve) => {
    if (!token) {
      throw { status: 401 , message: "Sem token fornecido" };
    }

    jwt.verify(token, exports.PRIVATE_KEY, function (err, decoded) {
      if (err) {
        throw { status: 401 , message: "Incorrect Token." };
      }
      return resolve({ err: false, auth: true, role: decoded.role, id: decoded.id });
    });
  });
};

exports.tokenGenerate = (user) => {
  jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    PRIVATE_KEY,
    {
      expiresIn: 1800,
    }
  );
};
