const express = require('express'); 
const port = 80;
const app = express(); 
const path = require("path"); 
const bodyparser = require("body-parser");
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}

//aapka data kis tarah save hoga
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    desc: String
  });
var Contact= mongoose.model('Contact', contactSchema);

// Express Specific Stuff
app.use('/static', express.static('static'));
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

// END POINT
app.get('/', (req,res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req,res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req,res)=>{
    //req.body matlab ho bhi data aa raha hai usse save krna hai
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("<h1>This data have been saved...</h1>");
    }).catch(() => {
        res.status(400).send("Sorry! Couldn't save your data");
    })
})

// START THE SERVER
app.listen(port, ()=> {
    console.log(`this is sucessfully runned on port ${port}`)
})