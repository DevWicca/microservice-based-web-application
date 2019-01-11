const express = require('express')
const mongoose = require('mongoose')


// i call you bodyParser
const bodyParser = require('body-parser')
// config model
const {mongoURL} = require ('./config/config')
// init express
const app = express()
// add mongose model
const Book = require('./models/book')

// mongodb connect 
mongoose.connect(mongoURL ,
    {useNewUrlParser: true },
    console.log('the Database Is Open And Ready For You ^_^ ')
)

// body pasrser
app.use(bodyParser.json())
// get all books but not now
app.get('/books',(req,res) => {
    Book.find().then( result =>{
        if (result){
            res.json(result)
        }
    })
})

// delete same book -__-
app.delete('/books/:id',(req,res)=>{
    let id = req.params.id
    Book.findByIdAndDelete(id)
    .then(result =>{
            res.status(200).json({
                mesage:"well you did it"
            })
            console.log('book is out ')
    }).catch(err =>{
        if (err){
            req.status(500).json({
                mesage:"well you did not found it"
            })
        }
    })
})
// make a new book
app.post('/book',(req,res) => {
    let body = req.body

    let newbook = new Book({
        title:body.title,
        author:body.author,
        numberPages:body.numberPages,
        publisher:body.publisher
    }) 
    newbook.save()
    .then(result => {
        console.log(result)
        if (result){
            res.status(200).json({
                well:"i win"
            })
        }
    })
    .catch(err =>{
        if (err){
            throw err
        }
    })

})
// get one book
app.get('/book/:id',(req,res) =>{
    let id = req.params.id
    Book.findById(id)
    .then(book =>{
        res.status(200).json(book)
    })
})


module.exports = app
