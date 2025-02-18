const sequelize = require("sequelize");
require("dotenv").config();

const DUser = process.env.DATABASE_USER;
const DKey = process.env.DATABASE_KEY;
const DName = process.env.DATABASE_NAME;
const DHost = process.env.DATABASE_HOST;

const Sequelize = new sequelize(DName, DUser, DKey, {
  host: DHost,
  dialect: "mariadb",
  define: {
    timestamps: false,
  },
});

Sequelize.authenticate()
  .then(() => {
    console.log("conectado ao banco de dados");
  })
  .catch((err) => {
    console.log(`Sem sucesso na conexão com o banco de dados ${err} `);
  });


// Sincronizar modelos sem excluir tabelas existentes
Sequelize.sync({ alter: true })
.then(() => {
    console.log("Modelos sincronizados com sucesso!");
})
.catch((err) => {
    console.error("Erro ao sincronizar modelos:", err);
});

module.exports = Sequelize;
