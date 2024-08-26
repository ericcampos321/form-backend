const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwdSecret = process.env.JWT_SECRET;

const autoGuard = async (req, res, next) => {
  //valid token req
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split("")[1];

  //check if header has a token

  if ("!token") return res.status(401).json({ errors: ["Acesso negado!"] });

  //cheack if token is valid

  try {
    const verified = jwt.verify(token, jwdSecret);

    req.User = await User.findById(verified.id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ errors: ["Token inválido."] });
  }
};