require('dotenv').config();
const express=require('express');
const app =express();
const ejs= require('ejs');
const expressLayout =require('express-ejs-layouts');
const { Router, response } = require('express');
const routes= require('./resources/routes/web');
const PORT =process.env.PORT || 3300
const mongoose =require('mongoose');
const session= require('express-session');
const flash=require('express-flash');
const MongoStore = require('connect-mongo')(session);
const bodyParser= require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//database connection
const url= "mongodb://localhost/JuiceStore";
mongoose.connect(url,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});
mongoose.connection.on('connected', function(){  
    //console.log("Mongoose default connection is open to ", url);
 });
 mongoose.connection.on('error', function(err){
   // console.log("Mongoose default connection has occured "+err+" error");
});

//sessions
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave: false,
    store:new MongoStore({ mongooseConnection: mongoose.connection }),
    saveUninitialized: true,
    cookie: { maxAge:1000*60*60*24 }

}));
app.use(flash());

app.use(function(req,res,next){
    res.locals.session=req.session;
    next();
});


//ejs config
app.use(express.static('public'));
app.set('view engine','ejs');
app.set("views",`${__dirname}/resources/views`);
app.use(expressLayout);    


//routes
routes(app);


app.listen(PORT);

