const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    }
})

schema.methods.verifyPassword = function(password){

    if(this.password == password){
        return true;
    }

    return false;
}

module.exports = model('users',schema)