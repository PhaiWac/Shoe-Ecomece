const { default: mongoose } = require("mongoose");

const ItemsSchema = new mongoose.Schema({
    name : String ,
    price : Number ,
    image : String ,
    count : Number 
})

const Items = mongoose.model('items', ItemsSchema);

module.exports = Items