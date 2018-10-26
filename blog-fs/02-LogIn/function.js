var accounts = [];
const fs = require("fs");

fs.readFile(__dirname+"/account.txt", "UTF8", (err, data) => {
    if (err) throw err;
    accounts = JSON.parse(data);
})

function LogIn () {
    var account = document.getElementById("account");
    var password = document.getElementById("password");
    var log = 0;
    if (accounts.length == 0) {
        log = 0;
    } else {
        for (var i=0; i<accounts.length; i++) {
            if (account.value == accounts[i].username && password.value == accounts[i].password) {
                log=1;
                break;
            } else {
                log = 0;
            }
        }
    }
    if (log == 1) {
        window.alert("登入成功");
    } else {
        account.value = "";
        password.value = "";
        window.alert("帳號或密碼錯誤");
    }
}