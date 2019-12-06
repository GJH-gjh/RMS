const mongoose = require("mongoose")
//男为1
// 使用mongoose中的Schema属性来约束集合的字段
const admins = new mongoose.Schema({
    username:String,
    password:String,
});
//第一个参数是集合的名字   第二个参数是集合的约束
const model = mongoose.model("admins",admins);
module.exports = model;

// {"username":"GJH","password":123123}