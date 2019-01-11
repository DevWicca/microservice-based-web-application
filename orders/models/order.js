const mongoose =require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    CustomerID: {
        type : mongoose.SchemaTypes.ObjectId,
        require: true
    },
    BookID:{
        type:mongoose.SchemaTypes.ObjectId,
        require:true
    },
    initialDate:{
        type:Date,
        require:true
    },
    deliveryDate:{
        type:Date,
        require:true
    }
})


module.exports = mongoose.model('Order',OrderSchema)