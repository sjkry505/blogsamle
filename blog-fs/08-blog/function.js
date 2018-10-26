var posts = [], results = [],users = [], post = [], index, target, login=false;
const fs = require("fs");

fs.readFile(__dirname+"/posts.txt", "UTF8", function (err, data) {
    if (err) console.log("read failed");
    posts = JSON.parse(data);
    for(i=0; i<posts.length; i++) {
        post[posts.length-1-i] = posts[i];
    }
})

fs.readFile(__dirname+"/users.txt", "UTF8", function (err, data) {
    if (err) console.log("read failed");
    users = JSON.parse(data);
})

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
    if (url == "#searchresult") {
        SearchResult ();
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

    posts.push({"title": title.value, "text": text.value, "id": "post"+new Date(), "message": []});
    for(i=0; i<posts.length; i++) {
        post[posts.length-1-i] = posts[i];
    }
    fs.writeFile(__dirname+"/posts.txt", JSON.stringify(posts), (err) => {
        if (err) throw err;
        console.log("successfully writed");
    })
    window.location.hash = "#list";
}

function ListPost () {
    var content = document.getElementById("content");
    console.log(posts);
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
                    <p><a onclick="self.location.href='#${po.id}'">${po.title}</a></p>
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
                    <a onclick="self.location.href='#${po.id}'">繼續閱讀...</a>
                </div>
            `).join("\n")}
        </div>
`
}

function NewPost () {
    var content = document.getElementById("content");
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
                    <p><a onclick="self.location.href='#${po.id}'">${po.title}</a></p>
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

function ReadPost () {
    var content = document.getElementById("content")
    index = location.hash.substring(1);
    for (var i=0; i<posts.length; i++) {
        if (index == posts[i].id) {
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
                            <p><a onclick="self.location.href='#${po.id}'">${po.title}</a></p>
                            `).join("\n")
                        }
                        </div>
                        <button onclick="self.location.href='#create'">Add new post!</button>
                    </div>
                 </div>
                <div id="create">
                    <div id="read">
                        <label id="Title">${posts[i].title}</label>
                        <button onclick="self.location.href='#modifypost'" id="read-button"><img src="edit.png" height="20px" width="20px"></button><br>
                        <div id="read-content">
                            <p id="read-p">${posts[i].text}</p>
                        </div>
                        <a onclick="self.location.href='#message'">留言</a><br>
                        <div id="read-comment">
                        ${posts[i].message.map(comment => `
                            <div>
                                <div id="bubble">
                                    <p>${comment.message}</p> 
                                    <button id="mod" name="${comment.id}" onclick="fun(this)"><img src="modmes.png" height="15px" width="15px"></button>   
                                </div> 
                                  
                            </div>
                        `).join("\n")}
                        </div>
                    </div>
                </div>
            `
        }
    }   
}

function ModifyPost () {
    var content = document.getElementById("content");
    for (var i=0; i<posts.length; i++) {
        if (index == posts[i].id) {
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
                            <p><a onclick="self.location.href='#${po.id}'">${po.title}</a></p>
                            `).join("\n")
                        }
                        </div>
                        <button onclick="self.location.href='#create'">Add new post!</button>
                    </div>
                 </div>
                <div id="create">
                    <div id="read">
                        <label id="Title">${posts[i].title}</label>
                        <button onclick="self.location.href='#change'" id="read-button"><img src="save.png" height="20px" width="20px"></button><br>
                        <div id="read-content">
                            <textarea id="change">${posts[i].text}</textarea>
                        </div>
                        <a onclick="self.location.href='#message'">留言</a><br>
                        <div id="read-comment">
                        ${posts[i].message.map(comment => `
                            <div id="bubble">
                                <p>${comment.message}</p>
                            </div>
                        `).join("\n")}
                        </div>
                    </div>
                </div>
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
                            <p><a onclick="self.location.href='#${po.id}'">${po.title}</a></p>
                            `).join("\n")
                        }
                        </div>
                        <button onclick="self.location.href='#create'">Add new post!</button>
                    </div>
                 </div>
                <div id="create">
                    <div id="read">
                        <label id="Title">${posts[i].title}</label>
                        <button onclick="self.location.href='#modifypost'" id="read-button"><img src="edit.png" height="20px" width="20px"></button><br>
                        <div id="read-content">
                            <p id="read-p">${posts[i].text}</p>
                        </div>
                        <a onclick="self.location.href='#message'">留言</a><br>
                        <div id="read-comment">
                            <textarea id="comment"></textarea>
                            <button onclick="self.location.href='#createmessage'" id="send"><img src="send.png" height="20px" width="20px"></button>
                        ${posts[i].message.map(comment => `
                            <div id="bubble">
                                <p>${comment.message}</p>
                            </div>
                        `).join("\n")}
                        </div>
                    </div>
                </div>
            `
        }
    }
}

function CreateMessage () {
    var comment = document.getElementById("comment");
    for (var i=0; i<posts.length; i++) {
        if (index == posts[i].id) {
            posts[i].message.push({"message": comment.value, "id": "message"+posts[i].message.length});
        }
    }
    fs.writeFile(__dirname+"/posts.txt", JSON.stringify(posts), (err) => {
        if (err) throw err;
        console.log("successfully writed");
    })
    window.location.hash = `${index}`;

}

function ModifyMessage () {
    var content = document.getElementById("content");
    for (var i=0; i<posts.length; i++) {
        if (index == posts[i].id) {
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
                            <p><a onclick="self.location.href='#${po.id}'">${po.title}</a></p>
                            `).join("\n")
                        }
                        </div>
                        <button onclick="self.location.href='#create'">Add new post!</button>
                    </div>
                 </div>            
                <div id="create">
                    <div id="read">
                        <label id="Title">${posts[i].title}</label>
                        <button onclick="self.location.href='#modifypost'" id="read-button"><img src="edit.png" height="20px" width="20px"></button><br>
                        <div id="read-content">
                            <p id="read-p">${posts[i].text}</p>
                        </div>
                        <a onclick="self.location.href='#message'">留言</a><br>
                        <div id="read-comment">
                        ${
                            (()=>{
                            let html = "";
                            for (var j = 0; j < posts[i].message.length; j++) {
                                if (target == posts[i].message[j].id) {
                                    html += `
                                        <div id="mdms">
                                            <textarea id="modmes">${posts[i].message[j].message}</textarea>
                                            <button onclick="self.location.href='#changemessage'"><img src="send.png" height="20px" width="20px"></button>
                                        </div>
                                    `
                                } else {
                                    html += `
                                        <div id="bubble">
                                            <p>${posts[i].message[j].message}</p>
                                        </div>
                                    `
                                }
                            }
                            return html;
                            })()
                        }
                        </div>
                    </div>
                </div>
            `
        }
    }  
}

function ChangeMessage() {
    var modmes = document.getElementById("modmes");
    for (var i=0; i<posts.length; i++) {
        if (index == posts[i].id) {
            for (var j=0; j<posts[i].message.length; j++) {
                if (target == posts[i].message[j].id) {
                    posts[i].message[j].message = modmes.value;
                }
            }
        }
    }
    fs.writeFile(__dirname+"/posts.txt", JSON.stringify(posts), (err) => {
        if (err) throw err;
        console.log("successfully writed");
    })
    window.location.hash = `${index}`;
}


function fun(targetID) {
    target = targetID.name;
    window.location.hash = "modifymessage";
}

function Search () {
    results = [];
    var result = document.getElementById("search").value;
    for(var i=0; i<posts.length; i++) {
        if (result == posts[i].title) {
            results.push(posts[i]);
        }
    }
    window.location.hash = "searchresult";
}

function SearchResult () {
    var content = document.getElementById("content");
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
                    <p><a onclick="self.location.href='#${po.id}'">${po.title}</a></p>
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
                            <p id="re"><a onclick="self.location.href='#${result.id}'">${result.title}</a></p>
                            <p id="co">${result.text.substring(0, 35)}...</p>
                        </div>
                    `).join("\n")}` 
                }
            </div>
            <button onclick="self.location.href='#list'" id="back">回文章列表</button>
        </div>
    `
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
    var log = 0;
    if (users.length == 0) {
        log = 0;
    } else {
        for (var i=0; i<users.length; i++) {
            if (account.value == users[i].account && password.value == users[i].password) {
                log=1;
                break;
            } else {
                log = 0;
            }
        }
    }
    if (log == 1) {
        login = true;
        window.location.hash = "#list";
        action();
    } else {
        account.value = "";
        password.value = "";
        window.alert("帳號或密碼錯誤");
    }
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
    var present = 0;
    if (users.length == 0) {
        present = 1;
    } else {
        for (var i = 0; i<users.length; i++) {
            if (account.value == users[i].account) {
                present = 0; 
                break;
            }
            present = 1;
        }
    }
    if (present == 1) {
        users.push({"account": account.value, "password": password.value});
        window.location.hash = "#";
    } else {
        window.alert("帳號已存在");
        account.value="";
        password.value="";
    }
    fs.writeFile(__dirname+"/users.txt", JSON.stringify(users), (err) => {
        if (err) throw err;
        console.log("successfully writed");
    })
}
