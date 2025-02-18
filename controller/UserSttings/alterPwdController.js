const { verifyParam } = require("../../middleware/verifyParam");
const { alterPwd } = require("./alterPwd");

exports.alterPwdController = async (req, res) => {
  const token = req.cookies.token;
  
  try {
    verifyParam(["email", "oldPass", "newPass"], req.body);
  
    const { email, oldPass, newPass } = req.body;
    const updated = await alterPwd(token, email, oldPass, newPass)
    
    if(updated < 1){
      return res.status(401).send("Email ou senha incorretos");
    } else {
      return res.status(200).send("Senha alterada com sucesso");
    }
  } catch (error) {
    res
      .status(error.status || 500)
      .send(error.message || "Erro ao alterar a senha");
  }
};
