const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    info : {
        email : String ,
        password : String,
        admin : Boolean,
        cost : Number ,
        address : String 
    },

})


const User = mongoose.model('users', userSchema);

module.exports = User