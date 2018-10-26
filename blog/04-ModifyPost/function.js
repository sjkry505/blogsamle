var posts = [], index;

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
}

window.onhashchange = action;

function Create () {
    var title = document.getElementById("title");
    var text = document.getElementById("text");

    posts.push({"title": title.value, "text": text.value, "id": "post"+new Date()});
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
                <p>${posts[i].text}</p>
                <button onclick="self.location.href='#list'">回文章列表</button>
            `
        }
    }   
}

function ModifyPost () {
    var content = document.getElementById("content");
    console.log(index);
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
    window.location.hash = `${index}`;
}


