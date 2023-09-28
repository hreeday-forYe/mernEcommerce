import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true,
    unique: true
  },
  password: {
    type:String,
    required:true,
  },
  isAdmin: {
    type:Boolean,
    required:true,
    default: false
  }
},{
  timestamps:true,
});

// Adding methods to our Schema meaning 
userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}

// Pre means before doing something in this case before saving to the database of the user
userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", userSchema);
export default User;