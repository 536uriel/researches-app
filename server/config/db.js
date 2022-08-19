const mongoose = require('mongoose')

module.exports = function connectToDb(){
    mongoose.connect('mongodb://localhost/researches',(err => {
        if(err){
            console.log(err)
        }else{
            console.log('connected to reserches db')
        }
    }))
}


