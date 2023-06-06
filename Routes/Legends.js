const { Router } = require("express");
const {
  GET_LEGENDS,
  GET_LEGEND,
  POST_LEGENDS,
  DELETE_LEGENDS,
  UPDATE_LEGENDS,
} = require("../Controllers/LegendsController");

const auth = require("../Middlewares/Auth");

const router = Router();

router.get("/", (req, res) => {
  res.send("hello world");
});

router.get("/getLegends", GET_LEGENDS);
router.get("/getSingleLegends/:id", auth, GET_LEGEND);
router.post("/postLegend",  auth,POST_LEGENDS);
router.put("/updateLegend/:id", auth, UPDATE_LEGENDS);
router.delete("/deleteLegend/:id", auth, DELETE_LEGENDS);

module.exports = router;
