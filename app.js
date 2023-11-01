const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

const items = ["Traveling can be a life-changing experience. It opens your eyes to new cultures, broadens your horizons, and fills your life with unforgettable memories. From the tranquil beaches of Bali to the bustling streets of Tokyo, the world is full of wonders waiting to be explored. In this blog, we'll share travel tips, destination recommendations, and personal anecdotes to inspire your next adventure",
    "The key to a successful career is continuous learning. Whether you're a recent graduate or a seasoned professional, staying up-to-date with industry trends is crucial. Our blog offers valuable insights, career advice, and resources to help you thrive in your chosen field. Join us on a journey of growth and achievement",
    "Wellness is more than just physical health; it's a holistic approach to living your best life. In this blog, we'll delve into topics like mindfulness, nutrition, fitness, and mental well-being. Our aim is to empower you with the knowledge and tools to lead a balanced, fulfilling life"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){

    const day = date.getDate();

    res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res){

    const item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems:workItems});
});

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});