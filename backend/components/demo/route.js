const express = require("express");
const router = express.Router();
const {createData, getData} = require("./controller");

router.post(
    "/create",
    createData
)
router.get(
    "/getData",
    getData
)

module.exports = router;