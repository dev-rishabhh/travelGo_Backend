import mongoose from "mongoose";
// process.env.ATLAS_URL

try{
    await mongoose.connect("mongodb://localhost:27017/holidayApp")
}catch(err){
    // console.log(err);
    console.log("error connecting to db");
}

process.on("SIGINT",async()=>{
    await client.close()
    process.exit(0)
})

