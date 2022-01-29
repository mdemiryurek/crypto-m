import React, {useEffect, useState} from 'react';

export const AlertContext = React.createContext();

export const AlertProvider = ({children}) =>{
    const [isAlertShown, setIsAlertShown]  = useState(false);
    const [alertType, setAlertType]  = useState('');
    const [alertMessage, setAlertMessage]  = useState('');

    const handleAlert = (shown, type, message) => {
        setIsAlertShown(shown);
        setAlertType(type);
        setAlertMessage(message);
    }
    
    return(
        <AlertContext.Provider value={{
            isAlertShown,
            alertType,
            alertMessage,
            handleAlert}}>
            {children}
        </AlertContext.Provider>
    )
}