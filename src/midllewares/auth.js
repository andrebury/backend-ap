const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: ".env",
});

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(400).send({ erro: "Token nao informado" });

  const parts = authHeader.split(" ");
  if (!parts.length === 2)
    return res.status(401).send({ erro: "error de Token" });

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ erro: "token mal formatado" });

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ erro: "Token invalido" });

    req.usuarioID = decoded.id;
    return next();
  });
};
