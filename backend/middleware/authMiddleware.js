const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")

const protect = asyncHandler(async (req,res,next)=>{
    // console.log("inside protect")
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            // console.log(token)
            const decoded = jwt.verify(token,process.env.SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            // console.log("next")
            // console.log(req.user._id)
            console.log(req.query)
            next();
        } catch (error) {
            res.status(404);
            throw new Error("Not Authorised, token failed")
        }
    }
    else{
        res.status(404);
        throw new Error("Not Authorised, No token")
    }
})

module.exports = {protect};