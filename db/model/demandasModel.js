const db = require("../context/db");
const Sequelize = require("sequelize");
const User = require("./UserModel");
const Setor = require("./SetorModel");

const Demandas = db.define(
  "Demandas",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    patrimonio: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    prioridade: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    responsavel: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null, // Define como null para indicar "sem responsável"
    },
  },
  {
    timestamps: true,
  }
);

// Configuração das relações
User.hasMany(Demandas, { foreignKey: "user_id", as: "demandas" });
Demandas.belongsTo(User, { foreignKey: "user_id", as: "user" });

User.hasMany(Demandas, { foreignKey: "responsavel", as: "responsavel_demandas" });
Demandas.belongsTo(User, { foreignKey: "responsavel", as: "responsavel_user" });

// Configuração das relações
Setor.hasMany(Demandas, { foreignKey: "setor_id", as: "demandas" });
Demandas.belongsTo(Setor, { foreignKey: "setor_id", as: "setor" });

module.exports = Demandas;
