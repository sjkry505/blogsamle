const fs = require("fs");
var posts = [], index;

fs.readFile(__dirname+"/posts.txt", "UTF8", (err, data) => {
    if (err) throw err;
    posts = JSON.parse(data);
})

function action () {
    var url = window.location.hash.substring(1);
    var urlx = url.substring(0,4);
    if (urlx == "post") {
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
    if (url == "modifypost") {
        ModifyPost();
    }
    if (url == "change") {
        modify();
    }
    if (url == "message") {
        Message();
    }
    if (url == "createmessage") {
        CreateMessage();
    }
}

window.onhashchange = action;

function Create () {
    var title = document.getElementById("title");
    var text = document.getElementById("text");

    posts.push({"title": title.value, "text": text.value, "id": "post"+new Date(), "message": []});
    fs.writeFile(__dirname+"/posts.txt", JSON.stringify(posts), (err) => {
        if (err) throw err;
        console.log("successfully writed");
    })
    window.location.hash = "list";
}

function ListPost () {
    var content = document.getElementById("content");
    content.innerHTML = `
        ${posts.map( post => `
            <label><a onclick="self.location.href='#${post.id}'">${post.title}</a></label><br>
        `).join("\n")}
        <button onclick="self.location.href='#'">新增文章</button>
    `
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
    index = location.hash.substring(1);
    for (var i=0; i<posts.length; i++) {
        if (index == posts[i].id) {
            content.innerHTML = `
                <label id="Title">${posts[i].title}</label><button onclick="self.location.href='#modifypost'">修改</button><br>
                <p>${posts[i].text}</p><br><br>
                <a onclick="self.location.href='#message'">留言</a><br>
                ${posts[i].message.map(comment => `
                    <p>${comment.message}</p>
                `).join("\n")}
                <button onclick="self.location.href='#list'">回文章列表</button>
            `
        }
    }   
}

function ModifyPost () {
    var content = document.getElementById("content");

    for (var i=0; i<posts.length; i++) {
        if (index == posts[i].id) {
            content.innerHTML = `
                <label id="Title">${posts[i].title}</label><br>
                <textarea id="change">${posts[i].text}</textarea><br>
                <button onclick="self.location.href='#change'">確定</button>
            `
        }
    }
}

function modify () {
    var title = document.getElementById("Title");
    var text = document.getElementById("change");
    for (var i=0; i<posts.length; i++) {
        if (index == posts[i].id) {
            posts[i].text = text.value;
        }
    }
    fs.writeFile(__dirname+"/posts.txt", JSON.stringify(posts), (err) => {
        if (err) throw err;
        console.log("successfully writed");
    })
    window.location.hash = `${index}`;
}

function Message () {
    var content = document.getElementById("content");

    for (var i=0; i<posts.length; i++) {
        if (index == posts[i].id) {
            content.innerHTML = `
                <label id="Title">${posts[i].title}</label><br>
                <p>${posts[i].text}</p><br><br>
                <a onclick="self.location.href='#message'">留言</a><br>
                <textarea id="comment"></textarea>
                <button onclick="self.location.href='#createmessage'">發送</button>
            `
        }
    }
}

function CreateMessage () {
    var comment = document.getElementById("comment");
    for (var i=0; i<posts.length; i++) {
        if (index == posts[i].id) {
            posts[i].message.push({"message": comment.value});
        }
    }
    fs.writeFile(__dirname+"/posts.txt", JSON.stringify(posts), (err) => {
        if (err) throw err;
        console.log("successfully writed");
    })
    window.location.hash = `${index}`;
}
