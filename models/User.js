const mongoose = require('mongoose');

// DB Model Schema for User
const UserSchema = mongoose.Schema({

    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String,
        default:'123456'
    },
    dob:{
        type:String
    },
    role:{
        type:String,
        ref:'role'
    },
    city:{
        type:String
    },
    state:{
        type:String
    }

});

module.exports = mongoose.model('user',UserSchema);