const express =require("express")
const badyparser = require("body-parser")
const mongoose = require('mongoose')

//config
const {mongoURL} = require('./config/config')
// init express
const app = express()
// models come on
const Customers = require('./models/customer')
//mongodb conect
mongoose.connect(mongoURL,
    {useNewUrlParser: true },
    console.log('the Database Is Open And Ready For You ^_^ ')
    )
// badyparser config
app.use(badyparser.json())

// get all customer
app.get('/',(req,res) =>{
    Customers.find({})
    .then(result =>{
        if (result){
            console.log(result)
            res.status(200).json(result)
        }else{
            res.status(404).json({
                maessage:"you suck"
            })
        }
    })

})
// add customer
app.post('/',(req,res) =>{
    let newCustomer = new Customers({
        name:req.body.name,
        age:req.body.age,
        address:req.body.address
    })
    newCustomer.save()
    .then(result =>{
        res.status(200).json(result)
    }).catch(err =>{
        if (err){
            throw err
        }
    })
    
})
// got one customer
app.get('/customer/:id',(req,res) =>{
    let id = req.params.id
    Customers.findById(id).then(result => {
        if (result){
            res.status(200).json(result)
        }
    }).catch(err =>{
        if (err){
            throw err
        }
    })
})
// delete one customer
app.delete('/:id',(req,res) =>{
    let id = req.params.id
    Customers.findByIdAndDelete(id)
        .then(result =>{
            if (result){
                res.status(200).json({
                    maessage:'we did it'
                })
            }
        })
})


module.exports = app