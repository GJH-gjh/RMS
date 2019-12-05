require("../public/connect")
//链接数据库
const express = require("express")
const model = require("../modul/admin")
//导入数据库的数据的格式

const admin = new express.Router();
/**
 * {"username":"张三","age":12,"sex":1,"birthday":"2019-1-1","site":"江苏省南京市"}
 * 添加功能
 */

admin.get("/login", (req, res) => {
    let {username,password} = req.body;
    console.log(username)
    model.find({ username: username },{username :1,password :1,_id :0},(error, doc) => {
        if (error) {
            let json = {
                ok: false,
                msg: "登陆失败"
            }
            res.send(json)
        } else {
            console.log(doc);
            if(doc.length < 1){
                let json = {
                    ok: false,
                    msg: "用户名不存在"
                }
                res.send(json)
            }else{
                if(doc[0].password != password){
                    let json = {
                        ok: false,
                        msg: "密码错误"
                    }
                    res.send(json)
                }else if(doc[0].password  === password){
                    let json = {
                        ok: true,
                        msg: "登陆成功"
                    }
                    res.send(json)
                }
            }
        }
    })

})
// admin.post("/add", (req, res) => {
//     let obj = req.body;
//     model.create(obj, error => {
//         if (error) {
//             let json = {
//                 ok: false,
//                 msg: "唉呀妈呀，有错了"
//             }
//             res.send(json)
//         } else {
//             let json = {
//                 ok: true,
//                 msg: "成功"
//             }
//             res.send(json)
//         }
//     })
// })

module.exports = admin;