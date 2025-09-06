import Query from "../models/queryModel.js"

export  async function submitQuery(req,res){
  try {
    const {name,email,phone,subject,message}=req.body
    await Query.insertOne({
      name,
      email,
      phone,
      subject,
      message
    })
        res.status(200).json({message:"Query added sucessfully"})
  } catch (error) {
    next(error)
  }
}

export  async function getAllQuery(req,res,next){
  try {
   const query=await Query.find().select("-__v")
   res.status(200).json(query)
  } catch (error) {
     res.status(400).json({error:"Something went wrong"})
    next(error)
  }
}

export  async function DeleteQuery(req,res,next){
  try {
   const {id}=req.body
   await Query.deleteOne({_id:id})
   res.status(200).json({message:"Query deleted sucessfully"})
  } catch (error) {
     res.status(400).json({error:"Something went wrong"})
    next(error)
  }
}