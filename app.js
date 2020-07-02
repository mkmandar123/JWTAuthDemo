const express=require("express")
const app=express()
const jwt=require("jsonwebtoken")
const bodyParser=require("body-parser")

app.use(bodyParser.json())


app.post("/login",(req,res)=>{
    const{username,password}=req.body
    if(username=='admin'&&password=='admin'){

        const token=jwt.sign({username},"secretKey")
        res.send(token)
    }
    else{
        res.send("Invalid credentials")
    }
})

app.post("/restricted",(req,res)=>{
    const {token}=req.body
    jwt.verify(token,"secretKey",(err,decoded)=>{
        if(err)
            res.send(err)
        else
            res.send("Authorization successful")
    })
})


app.listen(3000,()=>{
    console.log("The server has been started")
})