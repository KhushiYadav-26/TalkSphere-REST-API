const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const { v4: uuidv4 }=require('uuid');
const methodOverride=require("method-override");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
let posts=[
    {  
        id:uuidv4(),
        username: "KhushiYadav",
        content: "Discipline is key to success."
    },{
        id:uuidv4(),
        username: "KhushbuPandey",
        content: "Simple living High Thinking."
    },{
        id:uuidv4(),
        username: "AshishKumar",
        content: "I got selected for my 1st internship!"
    },
];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let {username,content,photo}=req.body;
    let id=uuidv4();
    let photoUrl = (photo && photo.trim() !== "") ? photo : `https://cataas.com/cat?${Date.now()}`;

    posts.push({id,username,content,photo:photoUrl});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("show.ejs",{post});
});
app.patch("/posts/:id",(req,res)=>{
      let {id}=req.params;
      let {content, photo} = req.body;
      let post=posts.find((p)=> id===p.id);
      if (post) {
        post.content = content;
        if (photo && photo.trim() !== "") {
            post.photo = photo;
        }
    }
      res.redirect("/posts")
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> p.id===id);
    res.render("edit.ejs",{post});
    
    
});
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=> id!==p.id);
    res.redirect("/posts");
})

app.listen(port,()=>{
    console.log("listening to port : 8080");
})