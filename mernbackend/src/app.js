const { json } = require("express");
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/registers");
/*const authController = require('./controllers/authController')*/

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(views_path);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register.hbs");
});

app.get("/index", (req, res) => {
    res.render("index.hbs");
});
app.get("/overview", (req, res) => {
    res.render("overview.hbs");
});
app.get("/team", (req, res) => {
    res.render("team.hbs");
});
app.get("/contact", (req, res) => {
    res.render("contact.hbs");
});
app.get("/login", (req, res) => {
    res.render("register.hbs");
});

//creating new user in our database

app.post("/register", async(req, res) => {
    try {
        const registerEmployee = new Register({
            email: req.body.email,
            fullName: req.body.fullName,
            password: req.body.password,
        });
        const registered = await registerEmployee.save();
        res.status(201).render("register.hbs");
    } catch (error) {
        res.status(400).send(error);
    }
});

//login check / validation

app.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user_email = await Register.findOne({ email: email });
        if (user_email.password == password) {
            res.status(201).redirect("/page3");
        } else {
            res.send("ERROR! INVALID LOGIN DETAILS.");
        }
        res.send(user_email.password);
        console.log(user_email);
    } catch (error) {
        res.status(400).send("ERROR! INVALID LOGIN DETAILS.");
    }
});

// page 3
app.get("/page3", (req, res) => {
    res.render("page3.hbs");
});

/*app.get("/
56 B.Tech.EC VI Sem.pdf ", (req, res) => {
res.render("56 B.Tech. EC VI Sem.pdf");
});*/



app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
});