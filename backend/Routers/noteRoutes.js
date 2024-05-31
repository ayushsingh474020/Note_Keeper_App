const express = require("express")
const { protect } = require("../middleware/authMiddleware");
const { fetchNotes,fetchParticularNote,createNewNote,editNote,deleteNote, getNotes, shareNote, fetchSharedNotes } = require("../controllers/noteController");
const router = express.Router()

router.route("/").get(protect,fetchNotes);
router.route("/search").get(protect,getNotes)
router.route("/share/:id").post(protect,shareNote)
router.route("/share").get(protect,fetchSharedNotes)
router.route("/:id").get(protect,fetchParticularNote);
router.route("/").post(protect,createNewNote);
router.route("/:id").put(protect,editNote);
router.route("/:id").delete(protect,deleteNote);


module.exports = router;