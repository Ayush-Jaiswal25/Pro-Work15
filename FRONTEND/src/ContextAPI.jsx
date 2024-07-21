import { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';
export const MyContext = createContext(null);

const MyContextProvider = (props) =>{
    const URL = 'https://pro-work15-backend.onrender.com';
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [HouseAddress, setHouseAddress] = useState("")
    const [StreetAddress, setStreetAddress] = useState("")
    const [PinCode, setPinCode] = useState("")

    

    const [AccountHolderName, setAccountHolderName] = useState("")
    const [BankName, setBankName] = useState("")
    const [AccountNumber, setAccountNumber] = useState("")
    const [AccountIFSC_code, setAccountIFSC_code] = useState("")

    const [PhoneNumber, setPhoneNumber] = useState("")
    const [WhatsAppNumber, setWhatsAppNumber] = useState("")

    const [LoginFirst, setLoginFirst] = useState(false)
    const [DataEdited, setDataEdited] = useState(false)
    const [BankDataEdited, setBankDataEdited,] = useState(false)
    
    
    
    const [SessionID, setSessionID, removeSessionID] = useCookies(['SessionID'])
    const [SignUpUserID, setSignUpUserID, removeSignUpUserID] = useCookies(['SignUpUserID'])
    const [UserNumber, setUserNumber, removeUserNumber] = useCookies(['UserNumber'])
    const [DataUpdatedFirstTime, setDataUpdatedFirstTime, removeDataUpdatedFirstTime] = useCookies(['isDataCreated'])
    const [BankDataUpdatedFirstTime, setBankDataUpdatedFirstTime, removeBankDataUpdatedFirstTime] = useCookies(['isBankDataCreated'])
    const [RegisterFirstTime, setRegisterFirstTime, removeRegisterFirstTime] = useCookies(['isRegister'])

   const contextValue = {
    URL,
    Name, setName,
    Email, setEmail,
    HouseAddress, setHouseAddress,
    StreetAddress, setStreetAddress,
    PinCode, setPinCode,

    

    AccountHolderName, setAccountHolderName,
    BankName, setBankName,
    AccountNumber, setAccountNumber,
    AccountIFSC_code, setAccountIFSC_code,

    PhoneNumber, setPhoneNumber,
    WhatsAppNumber, setWhatsAppNumber,

    LoginFirst, setLoginFirst,
    DataEdited, setDataEdited,
    BankDataEdited, setBankDataEdited,

    DataUpdatedFirstTime, setDataUpdatedFirstTime, removeDataUpdatedFirstTime,
    BankDataUpdatedFirstTime, setBankDataUpdatedFirstTime, removeBankDataUpdatedFirstTime,
    SessionID, setSessionID, removeSessionID,
    SignUpUserID, setSignUpUserID, removeSignUpUserID,
    UserNumber, setUserNumber, removeUserNumber,
    RegisterFirstTime, setRegisterFirstTime, removeRegisterFirstTime
   }

    return(
        <MyContext.Provider value={contextValue}>
            {props.children}
        </MyContext.Provider>
    )
}
export default MyContextProvider;
