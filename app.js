const express=require("express")
const app=express()
const jwt=require("jsonwebtoken")
const bodyParser=require("body-parser")

app.use(bodyParser.json())


app.get("/",(req,res)=>{
	res.send("HOME")
})



//Route for login
app.post("/login",(req,res)=>{
    const{username,password}=req.body

		//validating user
    if(username=='admin'&&password=='admin'){

				//generating a JWT
        const token=jwt.sign({username},"secretKey",{expiresIn:30})
        res.send(token)
    }

		//Invalid user
    else{
        res.send("Invalid credentials")
    }
})


//some restricted route
app.post("/restricted",(req,res)=>{
    const {token}=req.body

		//verifying the JWT
    jwt.verify(token,"secretKey",(err,decoded)=>{
        if(err)
            res.send(err)
        else
            res.send("Authorization successful")
    })
})


//Starting the server
app.listen(process.env.PORT || 3000,()=>{
    console.log("The server has been started")
})
