const mongoose=require('mongoose')
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true
}).then(()=>{
console.log("db connected")
}).catch((err)=>{
    console.log("not connected")
})