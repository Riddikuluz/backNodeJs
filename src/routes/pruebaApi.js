const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Prueba API funcionando 🚀" });
});

module.exports = router;
