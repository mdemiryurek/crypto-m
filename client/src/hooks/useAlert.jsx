import React, {useContext} from 'react'
import { AlertContext } from "../context/AlertContext";

export const useAlert = () => {
    const {handleAlert} = useContext(AlertContext);

    const toggleAlert = (show, type, message) => {
        hideAlert();
        setTimeout(() => {
            handleAlert(show, type, message);
        }, 100);
    }
    const showSuccess = (message) => {
        toggleAlert(true, 'success', message);
    }

    const showError = (message) => {
        toggleAlert(true, 'error', message);
    }

    const showInfo = (message) => {
        toggleAlert(true, 'info', message);
    }

    const hideAlert = () => {
        handleAlert(false, '', '');
    }

    return {showSuccess, showError, showInfo, hideAlert};
}