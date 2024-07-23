import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Razorpay from 'razorpay';
import crypto from 'crypto';
import mongoose from 'mongoose';

import Admin from './models/AdminSchema.js';
import BankDetails from './models/BankDetailSchema.js';
import BookingDetails from './models/BookingDetailSchema.js';
import PaymentDetails from './models/PaymentDetailSchema.js';
import Registration from './models/RegistrationSchema.js'
import Signup from './models/SignUpSchema.js'
import UserDetails from './models/UserDetailSchema.js'

const backend = express();
const Port = process.env.PORT || 3000;
const MongoDevelopmentURL = process.env.MONGO_ATLAS_DEV_URL;
const MongoProductionURL = process.env.MONGO_ATLAS_PRODUCTION_URL;

let updatedDetails;
// let SignUpUser, newSignedUpUserInfo, SignedUpUserObjectID;

backend.use(cors({
    origin: 'https://prowork.live',
    // origin: 'http://localhost:5000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

// const issue2options = {
//     origin:  "https://prowork.live/",
//     methods: "GET, POST, PUT, PATCH, POST, DELETE, OPTIONS",
//     allowedHeaders: 'Content-Type,Authorization',
//     credentials: true,
//     maxAge: 3600
//   };
//   backend.options("/issue-2", cors(issue2options));
// // backend.use(cors())
// backend.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "https://prowork.live");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, POST, DELETE, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     next();
//   })
backend.use(express.json());
backend.use(express.urlencoded({extended: true}))

const razorpay = new Razorpay( { key_id: process.env.RAZORPAY_KEY_ID_DEV , key_secret: process.env.RAZORPAY_KEY_SECRET_DEV } );

main().then(() =>{ console.log("Connection from Database established Successfully") }).catch((err) =>{ console.log(err) })
async function main(){ await mongoose.connect(MongoDevelopmentURL) }


backend.listen(Port, () =>{ console.log(`The server is running on Port number ${Port}`) });

backend.post("/payment/checkout", async (req, res) =>{
    console.log(req.body)
    const {name, amount} = req.body;
    const order = await razorpay.orders.create( { amount: amount, currency: "INR" } )
    await PaymentDetails.create( { order_id: order.id, name: name, amount: amount } )
    res.json({order})
})
backend.post("/payment/payment-verification", async (req, res) =>{
    const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;
    const body_data = razorpay_order_id  + "|" + razorpay_payment_id
    const verified = crypto.createHmac('sha256', 'IJM0eHFmjmdOLpxaT3e1S7Vi')
    .update(body_data).digest('hex');
    const doneVerified = verified == razorpay_signature
    if(doneVerified){
        await PaymentDetails.findOneAndUpdate({order_id:razorpay_order_id},{razorpay_payment_id:razorpay_payment_id, razorpay_order_id:razorpay_order_id,razorpay_signature:razorpay_signature});
        res.redirect(`http://localhost:5000/payment_success?payment_id=${razorpay_payment_id}`);
    }else{
        res.redirect(`http://localhost:5000/payment_failed?payment_id=${razorpay_payment_id}`);
    }
})


backend.post("/prowork/Founder", async (req, res) =>{
    const newUser = new Admin(req.body);
    UserInfo = await newUser.save();
})
backend.get("/prowork/Founder", async (req, res) =>{
    const All_Payment_Data = await Admin.find({});
    res.send(All_Payment_Data)
})


backend.post("/prowork/signup", async (req, res) =>{
    // res.set('Access-Control-Allow-Origin', '*');
    const SignUpUser = await Signup.find({PhoneNumber: req.body.PhoneNumber});

    if(SignUpUser[0] == undefined){
        const newSignedUpUser = new Signup(req.body);
        const newSignedUpUserInfo = await newSignedUpUser.save();
        const SignedUpUserObjectID = newSignedUpUserInfo._id;
        console.log(`New User Signed Up Successfully with Phone Number ${newSignedUpUserInfo.PhoneNumber}`);
        res.send(newSignedUpUserInfo);
    }else{
        const LogInUser = SignUpUser;
        const LoggedInUserObjectID = LogInUser[0]._id;
        console.log(`User Logged In Successfully with Phone Number ${LogInUser[0].PhoneNumber}`);
        res.send(LogInUser);
    }
});


backend.post("/prowork/userdetails",async (req, res) =>{
    const UserSignupObjectID = req.body.SignUpUserID
    const isDataCreated = true; 
    const Name = req.body.Name;
    const Email = req.body.Email;
    const HouseAddress = req.body.HouseAddress;
    const StreetAddress = req.body.StreetAddress;
    const PinCode = req.body.PinCode;
    const userDetails = new UserDetails({Name, Email, HouseAddress, StreetAddress, PinCode, isDataCreated, UserSignupObjectID });
    updatedDetails = await userDetails.save();
    res.send(updatedDetails)
});
backend.get("/prowork/userdetails/:id", async (req, res) =>{
    const UserSignupObjectID = req.params.id
    const userDetails = await UserDetails.find({UserSignupObjectID:UserSignupObjectID});
    res.send(userDetails);
})
backend.patch("/prowork/userdetails",async (req, res) =>{
    console.log(req.body)
    // const UserSignupObjectID = req.body.SignUpUserID
    // const Name = req.body.Name;
    // const Email = req.body.Email;
    // const HouseAddress = req.body.HouseAddress;
    // const StreetAddress = req.body.StreetAddress;
    // const PinCode = req.body.PinCode;
    // let updatedUserDetails = await UserDetails.findOneAndUpdate({UserSignupObjectID:UserSignupObjectID}, {Name, Email, HouseAddress, StreetAddress, PinCode});
    // updatedDetails = await updatedUserDetails.save();
    // res.send(updatedDetails)
    res.send(req.body)
});

backend.post("/prowork/register", async (req, res) =>{
    const isRegister = true; 
    const newWhatappNumber = new Registration({...req.body, isRegister});
    const savedWhatappNumber = await newWhatappNumber.save();
    console.log(`New Worker Registered Successfully with What's App Number ${savedWhatappNumber. WhatsAppNumber}`);
    res.send(savedWhatappNumber)
});


backend.post("/prowork/bankdetails",async (req, res) =>{
    const UserSignupObjectID = req.body.SignUpUserID
    const isBankDataCreated = true; 
    const AccountHolderName = req.body.AccountHolderName;
    const BankName = req.body.BankName;
    const AccountNumber = req.body.AccountNumber;
    const AccountIFSC_code = req.body.AccountIFSC_code;
    const userDetails = new BankDetails({AccountHolderName, BankName, AccountNumber, AccountIFSC_code, isBankDataCreated, UserSignupObjectID });
    updatedDetails = await userDetails.save();
    res.send(updatedDetails)
});
backend.get("/prowork/bankdetails/:id", async (req, res) =>{
    const UserSignupObjectID = req.params.id
    const userDetails = await BankDetails.find({UserSignupObjectID:UserSignupObjectID});
    res.send(userDetails);
})
backend.patch("/prowork/bankdetails",async (req, res) =>{
    const UserSignupObjectID = req.body.SignUpUserID
    const AccountHolderName = req.body.AccountHolderName;
    const BankName = req.body.BankName;
    const AccountNumber = req.body.AccountNumber;
    const AccountIFSC_code = req.body.AccountIFSC_code;
    let updatedUserDetails = await BankDetails.findOneAndUpdate({UserSignupObjectID:UserSignupObjectID}, {AccountHolderName, BankName, AccountNumber, AccountIFSC_code});
    updatedDetails = await updatedUserDetails.save();
    res.send(updatedDetails)
});

backend.post("/mybooking", async (req, res) =>{
    const Booking_Category = req.body.bookingcategory;
    const Service_Charge = req.body.servicec;
    const Travel_Charge = req.body.travelc;
    const Total_Charge = req.body.totalc;
    const UserSignupObjectID = req.body.SignUpUserID;
    const Booking_Date = req.body.BookingDate;
    const Booking_Time = req.body.BookingTime;
    const Payment_Status = req.body.PaymentStatus;
    const userDetails = new BookingDetails({Payment_Status, Booking_Date, Booking_Time, Booking_Category, Service_Charge, Travel_Charge, Total_Charge, UserSignupObjectID });
    await userDetails.save();
    console.log(userDetails)
})

backend.get("/mybooking/:id", async (req, res) =>{
    const UserSignupObjectID = req.params.id
    const userDetails = await BookingDetails.find({UserSignupObjectID:UserSignupObjectID});
    console.log(userDetails)
    res.send(userDetails)
})
