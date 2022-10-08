require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const routes = require("./resources/routes/web");
const PORT = process.env.PORT || 3300;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const Passport = require("passport");
const MONGO_URL = process.env.MONGO_URL;
const Emitter =require('events');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database connection
const url = MONGO_URL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", function() {
  console.log("Mongoose default connection is open to ", url);
});
mongoose.connection.on("error", function(err) {
  // console.log("Mongoose default connection has occured "+err+" error");
});

//sessions
const eventEmitter= new Emitter();
app.set('eventEmitter', eventEmitter);

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(flash());

const passportInit = require("./app/config/passport");
const { Socket } = require("socket.io");
passportInit(Passport);
app.use(Passport.initialize());
app.use(Passport.session());

app.use(function(req, res, next) {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", `${__dirname}/resources/views`);
app.use(expressLayout);

//routes
routes(app);

//

const server =app.listen(PORT ,()=>
console.log("Server is working"));


const io= require('socket.io')(server);


io.on('connection',(socket)=>{

  socket.on('join',(orderId)=>
  socket.join(orderId))
})

eventEmitter.on('orderUpdated',(data)=>{
  //console.log('there');
io.to(`order_${data.id}`).emit('orderUpdated',data);
})


eventEmitter.on('orderPlaced',(data)=>{
io.to(`adminRoom`).emit('orderPlaced',data);
})