const express = require("express");
const router = express.Router();
const {
  getAll,
  create,
  getDetail,
  update,
  destroy,
} = require("../controller/api/todos");

router.get("/", getAll);
router.post("/create", create);
router.get("/:id", getDetail);
router.put("/update/:id", update);
router.delete("/destroy/:id", destroy);

module.exports = router;
