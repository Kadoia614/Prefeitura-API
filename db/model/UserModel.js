const Sequelize = require("sequelize");
const db = require("../context/db");
const Setor = require("./SetorModel"); // Certifique-se de que o modelo Setor esteja correto
const moment = require("moment");

const User = db.define(
  "User",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(70),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    ramal: {
      type: Sequelize.STRING(255),
      allowNull: true,
      unique: false,
      defaultValue: "null",
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    setor_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    role: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    firstLogin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);

// Associação correta 1:1
User.belongsTo(Setor, { foreignKey: "setor_id", as: "setor", onDelete: "CASCADE"});
Setor.hasOne(User, { foreignKey: "setor_id", as: "user" });

module.exports = User;
