var mongojs = require("mongojs");
var db = mongojs('127.0.0.1:27017/blog', ["posts", "messages", "users"]);

var post = [], results = [], users = {}, messages = [], index, target;

function action () {
    var url = window.location.hash;
    var urlx = url.substring(0,5);
    if (urlx == "#post") {
        ReadPost();
    }
    if (url == "" || url == "#") {
        Login();
    }
    if (url == "#signup") {
        Signup();
    }
    if (url == "#new") {
        Create();
    }
    if (url == "#create") {
        NewPost();
    }
    if (url == "#list") {
        ListPost();
    }
    if (url == "#modifypost") {
        ModifyPost();
    }
    if (url == "#change") {
        modify();
    }
    if (url == "#message") {
        Message();
    }
    if (url == "#createmessage") {
        CreateMessage();
    }
    if (url == "#modifymessage") {
        ModifyMessage();
    }
    if (url == "#changemessage") {
        ChangeMessage();
    }
    if (url == "#search") {
        Search();
    }
}

window.onhashchange = action;
window.addEventListener("load", function () {
    document.querySelector("#content");
    action();
});
 function Create () {
    var title = document.getElementById("title");
    var text = document.getElementById("text");
    db.posts.insert({"title": title.value, "text": text.value, "belong" : users.username}, function (err, doc) {
        if (err) throw err;
        console.log("insert success");
    });
     window.location.hash = "list";
}

function ListPost () {
    var content = document.getElementById("content");
    if(users.username == null) window.location.hash = "";
    db.posts.find({"belong": users.username}).toArray(function (err, doc) {
        if (err) throw err;
        for(i=0; i<doc.length; i++) {
        post[doc.length-1-i] = doc[i];
        }
        content.innerHTML = `
        <div id="identify">
            <input id="search"></input>
            <button onclick="self.location.href='#search'"><img src="search.png" height="13px" width="13px"></button>
            <div id="person-img">
                <img src="person.png" height="80px" width="80px">
            </div>
            <div id="person">
                <p>Jack Wang</p>
            </div>
            <div id="person-post">
                <h2><a onclick="self.location.href='#list'">All posts</a></h2>
                <div>
                ${post.map( po => `
                    <p><a onclick="self.location.href='#post/${po._id}'">${po.title}</a></p>
                    `).join("\n")
                }
                </div>
                <button onclick="self.location.href='#create'">Add new post!</button>
            </div>
        </div>
        <div id="create">
            ${post.slice(0, 3).map(po => `
                <div id="post">
                    <p class="title">${po.title}</p><br>
                    <div id="post-content">
                        <p class="content">${po.text}</p> 
                    </div>
                    <a onclick="self.location.href='#post/${po._id}'">繼續閱讀...</a>
                </div>
            `).join("\n")}
        </div>
        `
    });

}

function NewPost () {
    var content = document.getElementById("content");
    if(users.username == null) window.location.hash = "";
    else {
        content.innerHTML = `
        <div id="identify">
            <input id="search"></input>
            <button onclick="self.location.href='#search'"><img src="search.png" height="13px" width="13px"></button>
            <div id="person-img">
                <img src="person.png" height="80px" width="80px">
            </div>
            <div id="person">
                <p>Jack Wang</p>
            </div>
            <div id="person-post">
                <h2><a onclick="self.location.href='#list'">All posts</a></h2>
                <div>
                ${post.map( po => `
                    <p><a onclick="self.location.href='#post/${po._id}'">${po.title}</a></p>
                    `).join("\n")
                }
                </div>
                <button onclick="self.location.href='#create'">Add new post!</button>
            </div>
        </div>
        <div id="create">
            <div id="create-form">
                <p id="create-p">New Post</p>
                <input id="title" type="text" placeholder="title"><br>
                <textarea id="text" placeholder="your content..."></textarea><br>
                <button onclick="Create()" id="create-button">發文</button>
            </div>
        </div>
        `
    }
}

function ReadPost () {
    var content = document.getElementById("content");
    if(users.username == null) window.location.hash = "";
    else {
        index = location.hash.substring(6);
        db.posts.findOne({_id: new mongojs.ObjectID(index)}, function (err,doc) {
            if (err) throw err;
            db.messages.find({"belong": new mongojs.ObjectID(index)}).toArray(function (err, docs) {
                messages = docs;
                content.innerHTML = `
                <div id="identify">
                    <input id="search"></input>
                    <button onclick="self.location.href='#search'"><img src="search.png" height="13px" width="13px"></button>
                    <div id="person-img">
                        <img src="person.png" height="80px" width="80px">
                    </div>
                    <div id="person">
                        <p>Jack Wang</p>
                    </div>
                    <div id="person-post">
                        <h2><a onclick="self.location.href='#list'">All posts</a></h2>
                        <div>
                        ${post.map( po => `
                            <p><a onclick="self.location.href='#post/${po._id}'">${po.title}</a></p>
                            `).join("\n")
                        }
                        </div>
                        <button onclick="self.location.href='#create'">Add new post!</button>
                    </div>
                 </div>
                <div id="create">
                    <div id="read">
                        <label id="Title">${doc.title}</label>
                        <button onclick="self.location.href='#modifypost'" id="read-button"><img src="edit.png" height="20px" width="20px"></button><br>
                        <div id="read-content">
                            <p id="read-p">${doc.text}</p>
                        </div>
                        <a onclick="self.location.href='#message'">留言</a><br>
                        <div id="read-comment">
                        ${messages.map(comment => `
                            <div>
                                <div id="bubble">
                                    <p>${comment.message}</p> 
                                    <button id="mod" name="${comment._id}" onclick="fun(this)"><img src="modmes.png" height="15px" width="15px"></button>   
                                </div> 
                                  
                            </div>
                        `).join("\n")}
                        </div>
                    </div>
                </div>
                `
            })
        })
    }
}

function ModifyPost () {
    var content = document.getElementById("content");
    if(users.username == null) window.location.hash = "";
    else {
        db.posts.findOne({_id: new mongojs.ObjectID(index)}, function (err, doc) {
            if (err) throw err;
            content.innerHTML = `
                <div id="identify">
                    <input id="search"></input>
                    <button onclick="self.location.href='#search'"><img src="search.png" height="13px" width="13px"></button>
                    <div id="person-img">
                        <img src="person.png" height="80px" width="80px">
                    </div>
                    <div id="person">
                        <p>Jack Wang</p>
                    </div>
                    <div id="person-post">
                        <h2><a onclick="self.location.href='#list'">All posts</a></h2>
                        <div>
                        ${post.map( po => `
                            <p><a onclick="self.location.href='#post/${po._id}'">${po.title}</a></p>
                            `).join("\n")
                        }
                        </div>
                        <button onclick="self.location.href='#create'">Add new post!</button>
                    </div>
                 </div>
                <div id="create">
                    <div id="read">
                        <label id="Title">${doc.title}</label>
                        <button onclick="self.location.href='#change'" id="read-button"><img src="save.png" height="20px" width="20px"></button><br>
                        <div id="read-content">
                            <textarea id="change">${doc.text}</textarea>
                        </div>
                        <a onclick="self.location.href='#message'">留言</a><br>
                        <div id="read-comment">
                        ${messages.map(comment => `
                            <div>
                                <div id="bubble">
                                    <p>${comment.message}</p> 
                                    <button id="mod" name="${comment._id}" onclick="fun(this)"><img src="modmes.png" height="15px" width="15px"></button>   
                                </div> 
                                  
                            </div>
                        `).join("\n")}
                        </div>
                    </div>
                </div>
            `
        })
    }
}

function modify () {
    var title = document.getElementById("Title");
    var text = document.getElementById("change");
        db.posts.findOne({_id: new mongojs.ObjectID(index)}, function (err, doc) {
        if (err) throw err;
        db.posts.update({_id: new mongojs.ObjectID(index), "belong": users.username}, {"title": doc.title, "text": text.value, "belong": users.username}, function (err, doc) {
            if (err) throw err;
        })
        window.location.hash = `post/${doc._id}`;
    })
    
}

function Message () {
    var content = document.getElementById("content");
    var search = document.getElementById("search").value;
    search = "";
    if(users.username == null) window.location.hash = "";
    else {
        db.posts.findOne({_id: new mongojs.ObjectID(index)}, function (err, doc) {
            if (err) throw err;
            db.messages.find({"belong": new mongojs.ObjectID(index)}).toArray(function (err, docs) {
                if (err) throw err;
                messages = docs;
                content.innerHTML = `
                <div id="identify">
                    <input id="search"></input>
                    <button onclick="self.location.href='#search'"><img src="search.png" height="13px" width="13px"></button>
                    <div id="person-img">
                        <img src="person.png" height="80px" width="80px">
                    </div>
                    <div id="person">
                        <p>Jack Wang</p>
                    </div>
                    <div id="person-post">
                        <h2><a onclick="self.location.href='#list'">All posts</a></h2>
                        <div>
                        ${post.map( po => `
                            <p><a onclick="self.location.href='#post/${po._id}'">${po.title}</a></p>
                            `).join("\n")
                        }
                        </div>
                        <button onclick="self.location.href='#create'">Add new post!</button>
                    </div>
                 </div>
                <div id="create">
                    <div id="read">
                        <label id="Title">${doc.title}</label>
                        <button onclick="self.location.href='#modifypost'" id="read-button"><img src="edit.png" height="20px" width="20px"></button><br>
                        <div id="read-content">
                            <p id="read-p">${doc.text}</p>
                        </div>
                        <a onclick="self.location.href='#message'">留言</a><br>
                        <div id="read-comment">
                            <textarea id="comment"></textarea>
                            <button onclick="self.location.href='#createmessage'" id="send"><img src="send.png" height="20px" width="20px"></button>
                        ${messages.map(comment => `
                            <div>
                                <div id="bubble">
                                    <p>${comment.message}</p>   
                                </div>   
                            </div>
                        `).join("\n")}
                        </div>
                    </div>
                </div>
                `
            })
        })
    }
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
    var search = document.getElementById("search").value;
    search = "";
    if(users.username == null) window.location.hash = "";
    else {
        db.posts.findOne({_id: new mongojs.ObjectID(index)}, function (err, doc) {
            if (err) throw err;
            db.messages.find({"belong": new mongojs.ObjectID(index)}).toArray(function (err, docs) {
                if (err) throw err;
                messages=docs;
                content.innerHTML = `
                    <div id="identify">
                        <input id="search"></input>
                        <button onclick="self.location.href='#search'"><img src="search.png" height="13px" width="13px"></button>
                        <div id="person-img">
                            <img src="person.png" height="80px" width="80px">
                        </div>
                        <div id="person">
                            <p>Jack Wang</p>
                        </div>
                        <div id="person-post">
                            <h2><a onclick="self.location.href='#list'">All posts</a></h2>
                            <div>
                            ${post.map( po => `
                                <p><a onclick="self.location.href='#post/${po._id}'">${po.title}</a></p>
                                `).join("\n")
                            }
                            </div>
                            <button onclick="self.location.href='#create'">Add new post!</button>
                        </div>
                    </div>
                    <div id="create">
                        <div id="read">
                            <label id="Title">${doc.title}</label>
                            <button onclick="self.location.href='#modifypost'" id="read-button"><img src="edit.png" height="20px" width="20px"></button><br>
                            <div id="read-content">
                                <p id="read-p">${doc.text}</p>
                            </div>
                            <a onclick="self.location.href='#message'">留言</a><br>
                            <div id="read-comment">
                            ${ (() => {
                                let html = ""
                                for (var i = 0; i < messages.length; i++) {
                                    if (target == messages[i]._id.toString()) {
                                        html += `
                                            <div id="mdms">
                                                <textarea id="modmes">${messages[i].message}</textarea>
                                                <button onclick="self.location.href='#changemessage'"><img src="send.png" height="20px" width="20px"></button>
                                            </div>
                                        `
                                    } else {
                                        html += `
                                            <div>
                                                <div id="bubble">
                                                    <p>${messages[i].message}</p>
                                                </div>
                                            <div>
                                        `
                                    }
                                }
                                return html;
                            })()}
                            </div>
                        </div>
                    </div>
                `
            })
        })
    }
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

function Search () {
    var result = document.getElementById("search");
    var content = document.getElementById("content");
    if(users.username == null) window.location.hash = "";
    else {
        db.posts.find({"title": result.value, "belong" : users.username}).toArray(function (err, doc) {
            if (err) throw err;
            results = doc;
            content.innerHTML = `
        <div id="identify">
            <input id="search"></input>
            <button onclick="self.location.href='#search'"><img src="search.png" height="13px" width="13px"></button>
            <div id="person-img">
                <img src="person.png" height="80px" width="80px">
            </div>
            <div id="person">
                <p>Jack Wang</p>
            </div>
            <div id="person-post">
                <h2><a onclick="self.location.href='#list'">All posts</a></h2>
                <div>
                ${post.map( po => `
                    <p><a onclick="self.location.href='#post/${po._id}'">${po.title}</a></p>
                    `).join("\n")
                }
                </div>
                <button onclick="self.location.href='#create'">Add new post!</button>
            </div>
        </div>
        <div id="create">
            <div id="po">
                ${(results.length == 0) ? 
                    `<div id="st"><p id="res">No results</p></div>` 
                    :
                    `${results.map( result => `
                        <div id="st">
                            <p id="re"><a onclick="self.location.href='#post/${result._id}'">${result.title}</a></p>
                            <p id="co">${result.text.substring(0, 35)}...</p>
                        </div>
                    `).join("\n")}` 
                }
            </div>
            <button onclick="self.location.href='#list'" id="back">回文章列表</button>
        </div>
            `
        })
    }
}

function Login  () {
    var content = document.getElementById("content");
    content.innerHTML = `
        <div id="welcome">
            <p>Welcome to EMBlog!</p>
            <div id="intro">
                <p>In EMBlog, you can post the article to share your daily life, or ask for the solution of your problem.</p>
            </div>
        </div>
        <div id="user">
            <button id="click" onclick="self.location.href='#'"><span>Log In</span></button><button id="unclick" onclick="self.location.href='#signup'"><span>Sign Up</span></button></h3>
                <input type="text" id="account" placeholder="Username"><br><br>
                <input type="password" id="password" placeholder="Password"><br>
                <button onclick="User()" id="user-button">Log in</button>
        </div>
    `
}

function User () {
    var account = document.getElementById("account");
    var password = document.getElementById("password");
    db.users.findOne({"username": account.value, "password" : password.value}, function (err, doc) {
        if(doc) {
            window.alert("登入成功");
            users = {"username": account.value, "password" : password.value};
            window.location.hash = "list";
            action();
        }
        else {
            account.value = "";
            password.value = "";
            window.alert("帳號或密碼錯誤");
        }
    })
}

function Signup () {
    var content = document.getElementById("content");
    content.innerHTML = `
        <div id="welcome">
            <p>Welcome to EMBlog!</p>
            <div id="intro">
                <p>In EMBlog, you can post the article to share your daily life, or ask for the solution of your problem.</p>
            </div>
        </div>
        <div id="user">
            <button id="unclick" onclick="self.location.href='#'"><span>Log In</span></button><button id="click" onclick="self.location.href='#signup'"><span>Sign Up</span></button></h3>
                <input type="text" id="account" placeholder="Username"><br><br>
                <input type="password" id="password" placeholder="Password"><br>
                <button onclick="Newuser()" id="user-button">Sign up</button>
        </div>
    `
}

function Newuser () {
    var account = document.getElementById("account");
    var password = document.getElementById("password");
    db.users.findOne({"username": account.value}, function (err, docs) {
        if(docs) {
            window.alert("帳號已存在");
            return;
        } else {
            db.users.insert({"username": account.value, "password" : password.value}, (err, records) => {
                if(err) throw err;
            });
            window.alert("註冊成功");
        }
        window.location.hash = "#";
    });
}
