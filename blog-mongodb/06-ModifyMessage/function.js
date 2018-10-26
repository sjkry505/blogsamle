var mongojs = require("mongojs");
var db = mongojs('127.0.0.1:27017/blog', ["posts", "messages"]);

var posts = [], messages = [], index, target;
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
    if (url == "modifymessage") {
        ModifyMessage();
    }
    if (url == "changemessage") {
        ChangeMessage();
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
        db.messages.find({"belong": new mongojs.ObjectID(index)}).toArray(function (err, docs) {
            messages = docs;
            content.innerHTML = `
                <label>${doc.title}</label><button onclick="self.location.href='#modifypost'">修改</button><br>
                <p>${doc.text}</p><br>
                <a onclick="self.location.href='#message'">留言</a><br>
                    ${messages.map(comment => `
                       <p>${comment.message}&nbsp;&nbsp;<button name="${comment._id}" onclick="fun(this)">修改</button></p>
                    `).join("\n")}
                <button onclick="self.location.href='#list'">回上頁</button>
            `
        })

    })
}

function ModifyPost () {
    var content = document.getElementById("content");
    db.posts.findOne({_id: new mongojs.ObjectID(index)}, function (err, doc) {
        if (err) throw err;
        content.innerHTML = `
            <label id="Title">${doc.title}</label><br>
            <textarea id="change">${doc.text}</textarea><br>
            <button onclick="self.location.href='#change'">確定</button>
        `
    })

}

function modify () {
    var title = document.getElementById("Title");
    var text = document.getElementById("change");
        db.posts.findOne({_id: new mongojs.ObjectID(index)}, function (err, doc) {
        if (err) throw err;
        db.posts.update({"title": doc.title}, {"title": doc.title, "text": text.value}, function (err, doc) {
            if (err) throw err;
        })
        window.location.hash = `post/${doc._id}`;
    })
    
}

function Message () {
    var content = document.getElementById("content");
    db.posts.findOne({_id: new mongojs.ObjectID(index)}, function (err, doc) {
        if (err) throw err;
        db.messages.find({"belong": new mongojs.ObjectID(index)}).toArray(function (err, docs) {
            if (err) throw err;
            messages = docs;
            content.innerHTML = `
                <label id="Title">${doc.title}</label><br>
                <p>${doc.text}</p><br><br>                
                <a onclick="self.location.href='#message'">留言</a><br>
                ${messages.map(comment => `
                    <p>${comment.message}</p>
                `).join("\n")}
                <textarea id="comment"></textarea>
                <button onclick="self.location.href='#createmessage'">發送</button>
        `
        })
    })
}

function CreateMessage () {
    var comment = document.getElementById("comment");
    db.posts.findOne({_id: new mongojs.ObjectID(index)}, function (err, doc) {
        if (err) throw err;
        db.messages.insert({"belong": new mongojs.ObjectID(index), "message": comment.value}, function (err, docs) {
            if (err) throw err;
            console.log("insert success");
        })
        window.location.hash = `post/${doc._id}`;
    })
}

function ModifyMessage () {
    var content = document.getElementById("content");
    db.posts.findOne({_id: new mongojs.ObjectID(index)}, function (err, doc) {
        if (err) throw err;
        content.innerHTML = `
                <label id="Title">${doc.title}</label><button onclick="self.location.href='#modifypost'">修改</button><br>
                <p>${doc.text}</p><br><br>
                <a onclick="self.location.href='#message'">留言</a><br>`
        db.messages.find({"belong": new mongojs.ObjectID(index)}).toArray(function (err, docs) {
            if (err) throw err;
            messages=docs;
            for (var i = 0; i < messages.length; i++) {
                if (target == messages[i]._id.toString()) {
                    content.innerHTML += `
                        <div>
                            <textarea id="modmes">${messages[i].message}</textarea>
                            <button onclick="self.location.href='#changemessage'">確定</button>
                        </div>
                    `
                } else {
                    content.innerHTML += `
                        <div>
                            <p id="${i}">${messages[i].message}&nbsp;&nbsp;<button name="${messages[i]._id}" onclick="fun(this)">修改</button></p>
                        </div>
                    `
                }
            }
            return content.innerHTML;
        })
    })
}

function ChangeMessage() {
    var modmes = document.getElementById("modmes");
    db.messages.findOne({_id: new mongojs.ObjectID(target)}, function (err, docs) {
        if (err) throw err;
            db.messages.update({_id: new mongojs.ObjectID(target)}, {"belong": new mongojs.ObjectID(index), "message": modmes.value});
        window.location.hash = `post/${new mongojs.ObjectID(index)}`;
    }) 
}


function fun(targetID) {
    target = targetID.name;
    window.location.hash = "modifymessage";
}
