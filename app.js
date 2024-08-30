//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const path = require('path');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

var posts = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {

    // let postsString = [];

    // for (i = 0; i < posts.length; i++) {
    //     postsString.push(posts[i].postTitle);
    // }
    res.render("home", { posts: posts, _: _ , startingContent : homeStartingContent});
    // console.log(posts);

});

app.get("/about", function(req, res) {
    res.render("about", { aboutText: aboutContent })
});

app.get("/contact", function(req, res) {
    res.render("contact", { contactText: contactContent })
});

app.get("/compose", function(req, res) {
    res.render("compose");
});

app.post("/compose", function(req, res) {
    res.redirect("/compose");
    let postTitle = req.body.postTitle;
    let postBody = req.body.postBody;

    let post = {
        postTitle: postTitle,
        postBody: postBody,
    }

    posts.push(post);
});

app.get("/posts/:postName", function(req, res) {
    // console.log(req.params);
    // res.redirect("/");


    posts.forEach(function(post) {
        let reqPostName = _.kebabCase(req.params.postName);
        let myPostTitle = _.kebabCase(post.postTitle);
        if (myPostTitle === reqPostName) {
            res.render("post", { posts: posts, returnedPost: { postTitle: post.postTitle, postBody: post.postBody } });
            // console.log(req.params.postName + " is a Match ");


        }
    });
});





app.listen(8000, function() {
    console.log("Server started on port 8000");
});