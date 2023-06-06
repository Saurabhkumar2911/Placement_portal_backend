const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.LOGIN = async (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }

  if (id != process.env.ADMIN_ID || password != process.env.ADMIN_PASSWORD) {
    return res.status(400).json({ msg: "Wrong credential" });
  }

  jwt.sign(
    { id: id, password: password },
    process.env.JWT_SECRET,
    { expiresIn: 36000 },
    (err, token) => {
      if (err) throw err;
      return res.json({
        token,
        status: "success",
      });
    }
  );
};

module.exports.SIGN_IN = (req, res) => {
  res.send({ res: "success" });
};

module.exports.AUTH = (req, res) => {
  res.send({ res: "we are in auth route" });
};
