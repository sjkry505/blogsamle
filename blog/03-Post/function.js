var posts = [], index;

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
            console.log("123");
            content.innerHTML = `
                <label>${posts[i].title}</label><br>
                <p>${posts[i].text}</p>
                <button onclick="self.location.href='#list'">回上頁</button>
            `
        }
    }   
}


