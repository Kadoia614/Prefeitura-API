exports.verifyParam = (param, requisition) => {
  param.forEach((e) => {
    try {
      if (!requisition[e] && !(requisition[e] == 0)) {
        throw { status: 500, message: "Favor preencher todos os campos" };
      }
    } catch (error) {
      throw { status: error.status || 500, message: error.message || "Parametro faltando" };;
    }
  });
};
