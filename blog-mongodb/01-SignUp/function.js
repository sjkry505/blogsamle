var mongojs = require("mongojs");

var db = mongojs('127.0.0.1:27017/blog', ['users']);

function SignUp () {
    var account = document.getElementById("account");
    var password = document.getElementById("password");
    db.users.findOne({"username": account.value}, function (err, docs) {
        if(docs) {
            window.alert("帳號已存在");

            return;
        } else {
            db.users.insert({"username": account.value, "password" : password.value}, (err, records) => {
                if(err) {
                    return;
                } 
            });
            window.alert("註冊成功");
        }
    });
}