const { Router } = require("express");
// const { SIGN_IN } = require("../controllers/AuthController");
const auth = require("../Middlewares/Auth");
const router = Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  if (id !== process.env.ADMIN_ID || password !== process.env.ADMIN_PASSWORD) {
    return res.status(400).json({ msg: "Wrong credential" });
  }

  jwt.sign(
    { id: id, password: password },
    process.env.JWT_SECRET,
    { expiresIn: 36000 },
    (err, token) => {
      if (err) {
        return res.json({
          err: "error",
        });
      }
      return res.json({
        token,
        status: "success",
      });
    }
  );
});
router.get("/signin", auth, (req, res) => {
  res.send({
    res: "success",
  });
});

router.get("/", auth, (req, res) => {
  res.send({ res: "success" });
});

module.exports = router;
