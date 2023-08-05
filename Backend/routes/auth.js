const express = require("express")
const bcrypt = require("bcrypt");
const user = require("../models/user");


const router=express.Router();

router.post("/signup",async (req,res)=>{
    const {name,email,password} = req.body
    
    try {
        const userexist = await user.findOne({email})
        if(userexist){
            res.status(400).send("User Already Exist")
        }
        else{
            const hashedPassword = await bcrypt.hash(password,10)
            console.log(hashedPassword)
            const newUser = new user({
                name,
                email,
                password : hashedPassword
            })

            const userSave = await newUser.save()

            res.json(userSave)
        }
    } catch (error) {
        console.log(error)
    }

})

router.post("/login",async (req,res)=>{
    const {email,password} = req.body
    
    try {
        const emailExist = await user.findOne({email})

        if(emailExist){
            const storedPassword = emailExist.password

            const auth = await bcrypt.compare(password,storedPassword)

            if(auth){
                res.status(200).json(emailExist)
            }
            else{
                res.status(400).send("Password is wrong")
            }

        }else{
            res.status(200).send("Email does not exist")
        }

    } catch (error) {
        console.log(error)
    }
    

})


module.exports = router