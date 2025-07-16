const jwt = require("jsonwebtoken");
function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Token não enviado" });

  try {
    const usuario = jwt.verify(token, process.env.SECRET_JWT);
    req.usuario = usuario;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token inválido ou expirado" });
  }
}

module.exports = verificarToken;
