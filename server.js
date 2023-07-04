const express = require('express');
const routes = require('./controllers');
const app = express();
const exphb = require("express-handlebars");
const hbs = exphb.create();
const path = require("path");
const sequelize = require("./config/connection")
const session = require("express-session")
const SequelizeStore = require("connect-session-sequelize")(session.Store)

const PORT = process.env.PORT || 8888;

// const sess = {
//     secret: 'Super secret secret',
//     cookie: {
//       maxAge: 300000,
//       httpOnly: true,
//       secure: false,
//       sameSite: 'strict',
//     },
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//       db: sequelize
//     })
//   };

// app.use(session(sess))


app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set('views', './views/layouts')

app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static(path.join(__dirname,"public")));


app.use(routes);

sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => console.log("Server is Running! " + PORT));
})
