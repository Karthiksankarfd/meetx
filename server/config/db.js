require("dotenv").config()
const mongoose  = require("mongoose")
const db_name = process.env.DATA_BASE_NAME;
const user_name = process.env.USER_NAME 
const password = process.env.DB_PASSSWORD 
const uri = `mongodb+srv://${user_name}:${password}@cluster-one.buuxkm3.mongodb.net/${db_name}?retryWrites=true&w=majority&appName=Cluster-one`
const connectToMongo = async (req , res)=>{
    try{
       await mongoose.connect(uri)
    }catch(e){
        console.log("CANNOT CONNECT TO DB" , e)
       
    }
}

module.exports =  connectToMongo