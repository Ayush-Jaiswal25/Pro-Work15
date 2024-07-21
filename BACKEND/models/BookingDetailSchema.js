import mongoose from 'mongoose';

const BookingDetailSchema = new mongoose.Schema({
    Booking_Category:{
        type: String
    },
    Service_Charge:{
        type: String
    },
    Travel_Charge:{
        type: String
    },
    Total_Charge:{
        type: String
    },
    Booking_Date:{
        type:String,
    },
    Booking_Time:{
        type:String,
        
    },
    Payment_Status:{
        type:String,

    },
    UserSignupObjectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Signup",
    },
})

const BookingDetails = mongoose.model("BookingDetails", BookingDetailSchema);

export default BookingDetails