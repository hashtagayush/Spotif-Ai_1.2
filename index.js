const path = require("path"); //build in lib
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/spotif-ai')
.then((e)=>{console.log("mongodb connected")});

app.set("view engine", "ejs");
app.set("views" ,path.resolve("./views"));

app.get("/" , (req,res) =>{
  res.render("home");
});
app.listen(PORT, ()=> console.log(`server has started at port ${PORT}`));
