import mongoose from 'mongoose';


const userSchema  = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
  roles:{
    type:[String],
    Enum:['admin','store-keeper'],
    default:['store-keeper']
  },
  refreshToken: {
  type: String
}


});


const User  = mongoose.model('User',userSchema);
export default User;
