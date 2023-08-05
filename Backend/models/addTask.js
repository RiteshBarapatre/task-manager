const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const addTask = new Schema({
    email : {
        type : String,
        required : true
    },
    title:{
        type : String,
        required : true
    },
    date:{
        type : String,
        required : true,
    },
    description:{
        type : String,
        required : true,
        minlength : 6
    },
    status : {
        type : String,
        required : true,
    }
})

module.exports = mongoose.model("addTask",addTask);