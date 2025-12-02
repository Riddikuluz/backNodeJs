const express = require("express");
const router = express.Router();

router.use("/pruebaApi", require("./routes/pruebaApi"));

module.exports = router;
