import mongoose from 'mongoose';

const SignUpSchema = new mongoose.Schema({
    PhoneNumber:{
        type: Number,
        required: true,
        unique: true,
        min: 12,
    }
});

const Signup = mongoose.model("Signup", SignUpSchema);

export default Signup