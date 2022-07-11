const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 7000;
require('./db/conn')
const userRouter = require('./routers/userRouter')
const User = require('./model/users');
app.use(express.json())
app.use(cors());
app.use(userRouter)


app.get("/",(req, res) => {
    res.send("hello...this is homepage!!!");
})

app.post("/users",(req,res)=>{
    const user = new User(req.body)
    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

app.get("/users",(req,res)=>{
    User.find({__id:"62b5a155a507ff4b83080c92"})
    .then((user)=>{
        res.status(200).send(user)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

app.delete("/users",(req,res)=>{
    User.deleteOne({__id:"62b5a155a507ff4b83080c92"})
    .then((user)=>{
        res.status(200).send(user)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

app.put("/users",(req,res)=>{
    User.findByIdAndUpdate("62b97d15d9380cfc8f469314",{
        "name":"pramond chouhan",
        "email":"pramodc@gmail.com",
        "mobile":8989898989
    })
    .then((user)=>{
        res.status(200).send(user)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

app.listen(port,()=>{
    console.log(`connection established on port ${port}`)
});