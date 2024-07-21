import { Client, Account, ID } from "appwrite";
import { UsersNumber, Temp_OTP_Value } from "./src/Components/Body/Body";
import toast from 'react-hot-toast';

export let userId, sessionId;

const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('6670ed2a002e08747987');

const account = new Account(client);

export async function appwriteSendOTP(){
    // const token = await account.createPhoneToken(ID.unique(), UsersNumber);
    // userId = token.userId;
}
export async function appwriteSubmitOTP(){
    // const create_session = await account.createSession(userId, Temp_OTP_Value);
    // sessionId = create_session.$id
    sessionId = 23;
}
export async function appwriteLogOUT(){
    await account.deleteSessions(userId);
}