const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken")

const registerUser=asyncHandler (async(req,res)=>{
    const {name,email,password,pic}=req.body
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    const userExists = await User.findOne({email:email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists")
    }

    const user = await User.create({
        name,email,password,pic
    })

    if(user){
        res.status(200);
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id),
        });

    }
    else{
        res.status(400);
        throw new Error("Failer to crate user");
    }
})

const authUser = asyncHandler (async (req,res)=>{
    const {email,password}=req.body;

    const user = await User.findOne({email:email});
    if(user && (await user.matchPassword(password))){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id),
        })
    }
    else{
        res.status(400);
        throw new Error("Invalid email or user")
    }
})

const updateUser = asyncHandler(async (req,res) => {
    const {email,name} = req.body;
    console.log(email,name)

    // const user = await User.findOne({_id:req.user._id});
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user._id, {email:email,name:name}, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400);
        throw new Error(error)
    }
})

const getUser = asyncHandler(async (req,res) => {
    console.log(req.query)
    if(req.query.search===''){
        try {
            console.log(req.user)
            console.log(req.query)
            res.status(200).json(req.user)
        } catch (error) {
            res.status(400);
            throw new Error("Invalid email or user")
        } 
    } 
    else{
        console.log(req.query.search);
        const keyword=req.query.search
            ?{
                $or:[
                    {name:{$regex:req.query.search, $options:"i"}},
                    {email:{$regex:req.query.search, $options:"i"}}
                ]

            }:{};
        const users = await User.find(keyword).find({_id:{$ne:req.user._id}});
        console.log(users)
        res.send(users);
    }
})

// const findUser = asyncHandler(async (req,res) => {
//     const userId = req.params.id;
//     try {
//         const user = await User.findOne({_id:userId});
//         if(user){
//             res.status(200).json(user)
//         }
//         else{
//             console.log("No User found")
//         }
//     } catch (error) {
//         res.status(400)
//         throw new Error(error)
//     } 
// })

const findUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;
        
        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        const user = await User.findOne({ _id: userId });

        if (user) {
            return res.status(200).json(user);
        } else {
            console.log("No User found");
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = {registerUser,authUser,getUser,updateUser,findUser}