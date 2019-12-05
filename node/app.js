//引入express 框架
const express  = require("express")
//设置路径
const path = require("path")

const user = require("./controller/user")
const admin = require("./controller/admin")
const bodyParser = require("body-parser");


const app = new express()

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.use(bodyParser.urlencoded({extended:true}));  //bodyParser固定写法
app.use(bodyParser.json());    

app.use("/user",user);
app.use("/admin",admin);

app.listen(3000,"127.0.0.1",()=>{
    console.log("running");
})