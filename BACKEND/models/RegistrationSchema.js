import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema({
    WhatsAppNumber:{
        type: Number,
        required: true,
        unique: true,
    },
    isRegister:{
        type: Boolean,
    }
});

const Registration = mongoose.model("Registration", RegistrationSchema);

export default Registration