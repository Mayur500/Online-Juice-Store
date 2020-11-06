const express=require('express');
const app =express();
const ejs= require('ejs');
const expressLayout =require('express-ejs-layouts');
const PORT =process.env.PORT || 3300

//app.use(expressLayout);
app.use(express.static('public'));
app.set('view engine','ejs');
app.set("views",`${__dirname}/resources/views`);

app.get('/',(req,res)=>{
    res.render("home");
});
app.listen(PORT);

