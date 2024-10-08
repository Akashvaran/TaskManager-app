import mongoose from "mongoose";

function database(){
    mongoose.connect(process.env.DATABASE_URL)
    .then(res=>console.log("database is connect"))
    .catch(res=>console.log("database not connect"))
}

export default database;