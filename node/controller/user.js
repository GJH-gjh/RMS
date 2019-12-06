require("../public/connect")
//链接数据库
const express = require("express")
const model = require("../modul/user")
//导入数据库的数据的格式

const user = new express.Router();
/**
 * {"username":"张三","age":"12","sex":1,"birthday":"2019-1-1","site":"江苏省南京市"}
 * 添加功能
 */

user.post("/add", (req, res) => {
    let obj = req.body;
    model.create(obj, error => {
        if (error) {
            let json = {
                ok: false,
                msg: "唉呀妈呀，有错了"
            }
            res.send(json)
        } else {
            let json = {
                ok: true,
                msg: "成功"
            }
            res.send(json)
        }
    })
})

/**
 * username:"xx"
 * 查找功能
 */
user.get("/get", (req, res) => {
    let { username } = req.body;
    model.find({ username: username }, (error, doc) => {
        if (error) {
            let json = {
                ok: false,
                msg: "查找失败"
            }
            res.send(json)
        } else {
            if (doc.length < 1) {
                let json = {
                    ok: false,
                    msg: "用户不存在"
                }
                res.send(json)
            } else {
                let json = {
                    ok: false,
                    msg: "查找成功",
                    result: doc
                }
                res.send(json)
            }
        }
    })

})
/**
 * 查找所有用户信息
 */
user.get("/getall", (req, res) => {
    model.find({}, (error, doc) => {
        if (error) {
            let json = {
                ok: false,
                msg: "查找失败"
            }
            res.send(json)
        } else {
            let json = {
                ok: false,
                msg: "查找成功",
                result: doc
            }
            res.send(json)
        }
    })

})
/**
 * 更新功能
 */
user.post("/set", (req, res) => {
    let { _id } = req.body;
    model.update({ _id: _id }, req.body, (error, doc) => {
        if (error) {
            let json = {
                ok: false,
                msg: "更新失败"
            }
            res.send(json)
        } else {
            let json = {
                ok: false,
                msg: "更新成功",
                result: doc
            }
            res.send(json)
        }
    })

})
/**
 * 删除功能
 */
user.get("/del", (req, res) => {
    let { _id } = req.body;
    model.remove({ _id: _id }, (error, doc) => {
        if (error) {
            let json = {
                ok: false,
                msg: "删除失败"
            }
            res.send(json)
        } else {
            let json = {
                ok: false,
                msg: "删除成功",
                result: doc
            }
            res.send(json)
        }
    });
})

module.exports = user;