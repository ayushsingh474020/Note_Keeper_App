const express = require("express")
const router = express.Router()
const {registerUser,authUser,getUser, updateUser, fetchUsers, findUser} = require("../controllers/userController")
const {protect} = require("../middleware/authMiddleware")
// var multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/images')
//     },
//     filename: (req, file, cb) => {
//         cb(null, `user-${Date.now()}.jpeg`)
//     }
// });

// const filter = function(req,file,cb){
//     if(file.mimetype.startsWith("image")){
//         cb(null,true);
//     }else{
//         cb(new Error("not an image Please upload an Image"), false);
//     }
// }

// const upload = multer({ storage: storage, fileFilter:filter });

// userRouter.route("/profileImage")
// .get((req,res) => {
//     res.sendFile('multer.html', {'root': __dirname + '/../../frontend/'});
// })
// .post(upload.single('photo'), updateProfileImage)

router.route("/find/:id").get(protect,findUser)
router.route("/").post(registerUser).get(protect,getUser).put(protect,updateUser)
router.route("/login").post(authUser)


module.exports=router;