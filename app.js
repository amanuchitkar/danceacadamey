const express = require("express");
const path = require("path");
const http = require("http");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

async function main() {
    await mongoose.connect('mongodb://localhost/contactDance');
}
const port = 8000;


//define mongoose schema
var contactSchima = new mongoose.Schema({
    name: String,
    // phone: String,
    // email: String,
    // address: String,
    // desc: String
});
var Contact = mongoose.model('Contact', contactSchima);

// app.post("/contact", (req, res) => {
//     var myData = new Contact(req.body);
//     myData.save()
//     .then(item => {
//     res.send("item saved to database");
//     })
//     .catch(err => {
//     res.status(400).send("unable to save to database");
//     });
//    });

app.post('/contact', (req, res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database ")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    // res.status(200).render('contact.pug');
});


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded({extended:true}));
// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
