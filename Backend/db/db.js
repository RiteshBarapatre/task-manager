const mongoose = require("mongoose")

const db = async ()=>{
    await mongoose.connect("mongodb+srv://riteshbarapatre543:38Jc5lbDtHdrCDCP@cluster0.5lohcow.mongodb.net/task-manager?retryWrites=true&w=majority")
    console.log(`Connection Successful...`)
}

module.exports = db