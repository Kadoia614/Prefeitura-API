const Permission = require("../db/model/PermissionModel");
const User = require("../db/model/UserModel");

exports.checkPermission = async (userId, role, serviceId, permission) => {
  try {
    const permissionUser = await Permission.findOne({
      where: { user_id: userId, service_id: serviceId }
    });

    const userRole = await User.findOne({
      where: { id: userId },
      exclude: ["id", "name", "email", "password", "createdAt", "updatedAt"]
    });

    if (!permissionUser || !((permissionUser.dataValues.active && permission.includes(userRole.dataValues.role)) || role == 'admin')) {
      throw { status: 401, message: "Sem autorização"}
    }

    return true;

  } catch (error) {
    throw { status: error.status , message: error.message || "Sem autorização"}
  }
};
