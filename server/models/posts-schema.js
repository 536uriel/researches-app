const {Schema,model,Types} = require('mongoose');

const schema = new Schema({
    title:{
        type:String,
        required:true
    },
    desc:String,
    body:{
        type:Object,
        required:true
    },
    userId:{
        required:true,
        type:Types.ObjectId,
        ref:'users'
    }
})

module.exports = model('posts',schema)