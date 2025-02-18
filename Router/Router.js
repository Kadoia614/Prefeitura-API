const User = require("../controller/AdminUser/adminUserController");
const Setor = require("../controller/Setor/setorController");
const services = require("../controller/AdminService/adminServicesController");
const demandasTi = require("../controller/DemandasTi/demandasTiController");
const login = require("../controller/Auth/login");
const logout = require("../controller/Auth/logout");
const alterPwd = require("../controller/UserSttings/alterPwdController");

const loginSchema = require("../schemas/Auth/loginSchema");
const logoutSchema = require("../schemas/Auth/logoutSchema");
const alterPwdSchema = require("../schemas/UserConfig/alterPwdSchema");
const {
  demandasGetSchema,
  demandasPostSchema,
  demandasDeleteSchema,
  assumirDemandasSchema,
  finalizarDemandaSchema,
  demandasGetHistory,
  getUserDemandas,
  updateUserDemandas,
} = require("../schemas/Demandas/demandaSchemas");
const {
  getUserSchema,
  postUserSchema,
  getOneUserSchema,
  deleteUserSchema,
  updateUserSchema,
} = require("../schemas/User/userSchema");
const {
  getServiceSchema,
  getUserServicesSchema,
  deleteServiceSchema,
  postServiceSchema,
  updateServiceSchema,
} = require("../schemas/Services/servicesSchema");
const {
  getSetorSchema,
  postSetorSchema,
  updateSetorSchema,
  deleteSetorSchema
} = require("../schemas/Setor/setorSchema");

async function routes(fastify, options) {
  // 📌 Users
  fastify.get("/user", getUserSchema, User.getAllUser);
  fastify.post("/user", postUserSchema, User.cadastrarUser);
  fastify.get("/user/:id", getOneUserSchema, User.getOneUser);
  fastify.put("/user/:id", updateUserSchema, User.atualizarUser);
  fastify.delete("/user/:id", deleteUserSchema, User.deletarUser);

  // 📌 Services
  fastify.get("/allservices", getServiceSchema, services.getAllServices);
  fastify.get("/services", getUserServicesSchema, services.getUserServices);
  fastify.post("/services", postServiceSchema, services.createServices);
  fastify.put("/services/:id", updateServiceSchema, services.atualizarService);
  fastify.delete("/services/:id", deleteServiceSchema, services.deletarService);

  // 📌 Setor
  fastify.get("/setor", getSetorSchema, Setor.pegarSetor);
  fastify.post("/setor", postSetorSchema, Setor.cadastrarSetor);
  fastify.put("/setor/:id", updateSetorSchema, Setor.atualizarSetor);
  fastify.delete("/setor/:id", deleteSetorSchema, Setor.deletarSetor);

  // 📌 Demandas TI
  fastify.get("/demandas", demandasGetSchema, demandasTi.pegarTodasDemandas);
  fastify.post("/demandas", demandasPostSchema, demandasTi.cadastrarDemandas);
  fastify.delete(
    "/demandas/:id",
    demandasDeleteSchema,
    demandasTi.deletarDemandas
  );
  fastify.put(
    "/demandas/assumir/:id",
    assumirDemandasSchema,
    demandasTi.assumirDemanda
  );
  fastify.get("/demandas/user", getUserDemandas, demandasTi.pegarUserDemandas);
  fastify.put(
    "/demandas/user/:id",
    updateUserDemandas,
    demandasTi.atualizarDemandas
  );
  fastify.get(
    "/demandas/user/history",
    demandasGetHistory,
    demandasTi.historyDemandas
  );
  fastify.put(
    "/demandas/finalizar/:id",
    finalizarDemandaSchema,
    demandasTi.finalizarDemanda
  );

  // 📌 Login
  fastify.post("/login", loginSchema, login.login);

  fastify.post("/logout", logoutSchema, logout.logout);

  // 📌 Alterar Senha
  fastify.post("/changePwd", alterPwdSchema, alterPwd.alterPwdController);
}

module.exports = routes;
