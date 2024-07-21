import mongoose from 'mongoose';

const BankDetailSchema = new mongoose.Schema({
    AccountHolderName:{
        type: String,
        required: true,
    },
    BankName:{
        type: String,
        required: true,
    },
    AccountNumber:{
        type: Number,
        required: true,
        unique: true,
    },
    AccountIFSC_code:{
        type: String,
        required: true,
    },
    isBankDataCreated:{
        type: Boolean
    },
    UserSignupObjectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Signup",
    },
})

const BankDetails = mongoose.model("BankDetails", BankDetailSchema);

export default BankDetails