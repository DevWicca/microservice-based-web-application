const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const {mongoURL} = require('./config/config')
const axios = require('axios')

// modle come in
const Order = require('./models/order')

// express init
const app = express()
mongoose.connect(mongoURL,
    { useNewUrlParser: true },
    () => console.log('Database Is Ready For You *_*'))

// bodyparser set up
app.use(bodyparser.json())

// get all orders
app.get('/orders',(req,res) => {
    Order.find({})
    .then(result =>{
        console.log(result)
        res.status(200).json(result)
    }).catch(err =>{
        if (err){
            throw err
        }
    })

})
//get one order with costomer and book

app.get('/order/:id',(req,res) =>{
    let id = req.params.id
    Order.findById(id)
    .then(order =>{
        if (order){
            axios.get('http://localhost:3001/customer/' + order.CustomerID)
            .then(result =>{
                let outorder ={
                    customerName: result.data.name
                }
                axios.get('http://localhost:3000/book/' + order.BookID)
                .then(result =>{
                    outorder.booktitle = result.data.title
                    res.status(200).json(outorder)
                })
            })

        }
    })
})

// make new order 
app.post('/order',(req,res)=>{
    
    let newOrder =new Order({
        CustomerID : mongoose.Types.ObjectId(req.body.CustomerID),
        BookID : mongoose.Types.ObjectId(req.body.BookID),
        initialDate : req.body.initialDate,
        deliveryDate : req.body.deliveryDate
    })

    newOrder.save()
    .then(result =>{
        if (result){
            console.log(result+"it save is done")
            res.status(200).json({
                message: "gg wp"
            })
        }
    })
    
})


module.exports = app