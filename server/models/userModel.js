const mongoose = require("mongoose")
const Activity = require("../models/activitySchema");

const userschema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    mobile:{type:Number},
    bookings :[
        {type:mongoose.Schema.Types.ObjectId , ref:"Activity"}

    ]
})

const user =  mongoose.model("User" , userschema)
module.exports = user