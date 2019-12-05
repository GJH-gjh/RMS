const mongoose = require("mongoose")
//男为1
// 使用mongoose中的Schema属性来约束集合的字段
const users = new mongoose.Schema({
    username:String,
    age:Number,
    sex:{
        type:Number,
        default : 1
    },
    birthday:String,
    site:String,

});
//第一个参数是集合的名字   第二个参数是集合的约束
const model = mongoose.model("users",users);
module.exports = model;

// {"username":"张三","age":12,"sex":1,"birthday":"2019-1-1","site":"江苏省南京市"}