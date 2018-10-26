# blog
This is a blog designed by `electron.js`.

There are three version for this project, one is only a  functional problem without any storage and decorate, other is using npm model - fs to storage user's individual imformation, the other is using database - mongodb for storage.

## version 1
Want to establish a blog project, we have to consider what functions we need. The following is codes for functions. if want more information, please click the link below.

code: https://github.com/zzz25839/blog/tree/master/blog

### Usage
step 1: `cd blog`

step 2: `electron 08-blog`

## version 2

With the functions, we can begin using the blog, but now we have a problem. We can't save the imformation we used to create, so we use the fs model for storage.

code: https://github.com/zzz25839/blog/tree/master/blog-fs

### Usage
step 1: `cd blog-fs`

step 2: `npm install fs`

step 3: `electron 08-blog`

Now you can use this blog without considering the imformation will lose.

## varsion 3

Above solution for data storage is using fs model, it will storage imformaion in local, but we can storage they on cloud, so we will use mongodb for our database.

code: https://github.com/zzz25839/blog/tree/master/blog-mongodb

### Usage
step 1: Download the mongodb => https://www.mongodb.com

step 2: Add mongodb to your environment variable

step 3: `cd blog-mongodb`

step 4: `npm install mongojs`

step 5: Open cmd and insert `mongod --dbpath <yourdbpath>` to connect to mongodb

step 6: `electron 08-blog`

If have any problem, you can watch [wiki](https://github.com/zzz25839/blog/wiki/Blog) where will explain why the code is writed.
