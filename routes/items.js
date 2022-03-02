const express = require("express");
const router = express.Router();
const {
  create,
  getDetail,
  update,
  destroy,
  move,
} = require("../controller/api/items");

router.post("/create", create);
router.get("/:id", getDetail);
router.put("/update/:id", update);
router.delete("/destroy/:id", destroy);
router.put("/move/:id", move);

module.exports = router;
