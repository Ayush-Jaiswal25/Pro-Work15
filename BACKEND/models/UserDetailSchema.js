import mongoose from 'mongoose';

const UserDetailSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true,
    },
    Email:{
        type: String,
        required: true,
        unique: true,
    },
    HouseAddress:{
        type: String,
        required: true,
    },
    StreetAddress:{
        type: String,
        required: true,
    },
    PinCode:{
        type: Number,
        required: true,
    },
    isDataCreated:{
        type: Boolean
    },
    UserSignupObjectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Signup",
    },
});

const UserDetails = mongoose.model("UserDetails", UserDetailSchema);

export default UserDetails