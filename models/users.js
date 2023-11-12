const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    info : {
        email : String ,
        password : String,
        admin : Boolean,
        cash : Number ,
        address : String 
    },
    book : Object 

})

const User = mongoose.model('users', userSchema);

module.exports = User