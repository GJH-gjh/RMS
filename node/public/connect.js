/**
 * 连接数据库
 */
let mongoose = require("mongoose");
//需要连接数据库  我们使用connect方法进行连接
//内置两个参数  第一个参数是IP地址 + 端口号 + 连接的数据库名   第二个参数是固定参数
mongoose.connect("mongodb://localhost/project",{useNewUrlParser : true});