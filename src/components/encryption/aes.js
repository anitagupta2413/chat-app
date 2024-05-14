import CryptoJS from "crypto-js";
import {secretKey} from '../../secretKey' 

const encryptMessage = (message) => {
    return CryptoJS.AES.encrypt(message , secretKey).toString(); 
}

const decryptMessage = (message) => {
    return CryptoJS.AES.decrypt(message , secretKey).toString(CryptoJS.enc.Utf8)
}

export {encryptMessage , decryptMessage }