var accounts = [];
const fs = require("fs");

fs.readFile(__dirname+"/account.txt", "UTF8", function (err, data) {
    if (err) throw err;
    accounts = JSON.parse(data);
})

function SignUp () {
    var account = document.getElementById("account");
    var password = document.getElementById("password");
    var present = 0;
    if (accounts.length == 0) {
        present = 1;
    } else {
        for (var i = 0; i<accounts.length; i++) {
            if (account.value == accounts[i].username) {
                present = 0; 
                break;
            }
            present = 1;
        }
    }
    if (present == 1) {
        accounts.push({"username": account.value, "password": password.value});
        fs.writeFile(__dirname+"/account.txt", JSON.stringify(accounts), (err) => {
            if (err) throw err;
            console.log("successfully writed");
        })
        window.alert("註冊成功");
    } else {
        window.alert("帳號已存在");
        account.value="";
        password.value="";
    }
    console.log(accounts);
}