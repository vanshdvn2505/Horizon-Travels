const mongoose = require('mongoose')
const express = require('express')
const ejs = require('ejs')
const session = require('express-session')
const bcrypt = require('bcrypt')

const port = 5000;

// mongoose.connect('')

const app = express()
app.use(express.json());
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(session({
    secret: '123456',
    resave: false,
    saveUninitialized: true
}))


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        requred: true

    },
    email: {
        type: String,
        requried: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


const User = mongoose.model("Users", userSchema);

app.get("/", (req,res) => {
    res.render("signup");
})
app.get("/signup", (req,res) => {
    res.render("signup");
})

app.get("/login", (req,res) => {
    res.render("login");
})

app.post('/', async function(req,res){
    const {name, email, password} = req.body;
    console.log(name);
    console.log(email);
    console.log(password);
    req.session.email = email;
    req.session.name = name;

    if(!name || !email || !password){
        return res.send("<script>alert('Please Enter All Fields');window.location.href='/signup'</script>;");
    }

    if(password.length < 8){
        return res.send("<script>alert('Password Length Should Be Atleast 8');window.location.href = '/login'</script>")
    }
})


app.listen(port, () => {
    console.log("Listening...");
})