const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://dsdchouhan:devendrachouhan@cluster0.uz7j8ly.mongodb.net/ERP?retryWrites=true&w=majority",{
    // useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(()=>{
    console.log("connection is successful!!")
}).catch((e)=>{
    console.log("no connection!!!",e)
})