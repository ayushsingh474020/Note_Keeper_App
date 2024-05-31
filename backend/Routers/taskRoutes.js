const express = require("express")
const { protect } = require("../middleware/authMiddleware");
const { fetchTasks,fetchParticularTask,createNewTask,editTask,deleteTask, getTasks } = require("../controllers/taskController");
const router = express.Router()

router.route("/").get(protect,fetchTasks);
router.route("/search").get(protect,getTasks)
router.route("/:id").get(protect,fetchParticularTask);
router.route("/").post(protect,createNewTask);
router.route("/:id").put(protect,editTask);
router.route("/:id").delete(protect,deleteTask);

module.exports = router;