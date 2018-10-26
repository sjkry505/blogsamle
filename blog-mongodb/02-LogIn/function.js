var mongojs = require("mongojs");
var db = mongojs('127.0.0.1:27017/blog', ["users"]);

function LogIn () {
    var account = document.getElementById("account");
    var password = document.getElementById("password");
    db.users.findOne({"username": account.value, "password" : password.value}, function (err, doc) {
        if(doc) {
            window.alert("登入成功");
        }
        else {
            account.value = "";
            password.value = "";
            window.alert("帳號或密碼錯誤");
        }
    })
}