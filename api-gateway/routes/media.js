const express = require("express");
const router = express.Router();
const { create, getAll, remove } = require("./handlers/media");

router.post("/", create);

router.get("/", getAll);

router.delete("/:id", remove);

module.exports = router;
