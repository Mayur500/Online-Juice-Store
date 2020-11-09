const express=require('express');
const app =express();
const ejs= require('ejs');
const expressLayout =require('express-ejs-layouts');
const PORT =process.env.PORT || 3300

app.use(express.static('public'));
app.set('view engine','ejs');
app.set("views",`${__dirname}/resources/views`);
app.use(expressLayout);

app.get('/',(req,res)=>{
    res.render("home");
});
app.get('/cart',(req,res)=>{
    res.render("customers/cart");
});
app.get("/register" , (req,res)=>{
 res.render("auth/register");
 
});
app.get("/login" , (req,res)=>{
    res.render("auth/login");
 });
app.listen(PORT);
