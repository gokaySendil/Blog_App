const router = require("express").Router();
const {
  getUser,
  createUser,
  loginUser,
} = require("../controllers/userController");
const { protectRoute } = require("../middleware/authMiddleware");
router.post("/", createUser);
router.post("/login", loginUser);
router.get("/current", protectRoute, getUser);
module.exports = router;
