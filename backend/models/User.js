// Angrej Singh - 026
// Akashdeep Singh Gill - 925
// Karanpreet Sachdeva - 994
// Riya Sidhu - 435
// Manmeet Kaur - 039
const mongoose =require('mongoose')

const schema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:['admin','salePerson'],
        default:"salePerson"
    }
})

const User =new mongoose.model('User',schema)

module.exports = User