const { Router } = require("express");
const { register } = require("../controllers/user.controller");
const upload = require("../middlewares/multer.middleware");

const userRoutes = Router();

userRoutes.post("/register", upload.single("image"), register);

module.exports = userRoutes;
