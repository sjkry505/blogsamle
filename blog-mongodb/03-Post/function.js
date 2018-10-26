var mongojs = require("mongojs");
var db = mongojs('127.0.0.1:27017/blog', ["posts"]);
var index, posts = [];


function action () {
    var url = window.location.hash.substring(1,5);
    if (url == "post") {
        ReadPost();
    }
    if (url == "list") {
        ListPost();
    }
    if (url == "new") {
        Create();
    }
    if (url == "") {
        NewPost();
    }
}

window.onhashchange = action;

function Create () {
    var title = document.getElementById("title");
    var text = document.getElementById("text");
    db.posts.insert({"title": title.value, "text": text.value}, function (err, doc) {
        if (err) throw err;
        console.log("insert success");
    });
     window.location.hash = "list";
}

function ListPost () {
    var content = document.getElementById("content");
    db.posts.find({}).toArray(function (err, doc) {
        if (err) throw err;
        posts = doc;
        content.innerHTML = `
        ${posts.map( post => `
            <label><a onclick="self.location.href='#post/${post._id}'">${post.title}</a></label><br>
        `).join("\n")}
        <button onclick="self.location.href='#'">新增文章</button>
    `
    });

}

function NewPost () {
    var content = document.getElementById("content");
    content.innerHTML = `
            <input id="title" type="text"><br>
            <textarea id="text"></textarea><br>
            <button onclick="self.location.href='#new'">發文</button>
    `
}

function ReadPost () {
    var content = document.getElementById("content")
    index = location.hash.substring(6);
    db.posts.findOne({_id: new mongojs.ObjectID(index)}, function (err,doc) {
        if (err) throw err;
        content.innerHTML = `
            <label>${doc.title}</label><br>
            <p>${doc.text}</p>
            <button onclick="self.location.href='#list'">回上頁</button>
        `
    })
}


