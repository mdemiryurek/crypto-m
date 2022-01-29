import React, {useEffect, useState, useContext} from 'react';
import { useAlert } from "../hooks/useAlert";
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();
const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

    return transactionContract;
}

export const TransactionProvider = ({children}) =>{
    const [currentAccount, setCurrentAccount]  = useState('');
    const [formData, setFormData] = useState({addressTo: '', amount: '', keyword: '', message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);
    const {showSuccess, showError} = useAlert();
    const staticErrorMessage = 'Sorry, something went wrong :(';

    const handleChange = (e, name) =>{
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value}));
    }

    const getAllTransactions = async() => {
        try{
            if (ethereum) {
                const transactionContract = getEthereumContract();
                const availableTransactions = await transactionContract.getAllTransactions()
                const structuredTransactions = availableTransactions.map((transaction) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }));
                
                setTransactions(structuredTransactions);
            }
            else {
                showError('Ethereum is not present!');
            }
        }
        catch(error) {
            showError(staticErrorMessage);
        }
    }

    const checkIfWalletIsConnected = async () =>{
        try {
            if (!ethereum) {
                return;
            }

            const accounts = await ethereum.request({method: 'eth_accounts'});

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            }
        }
        catch(error) {
            showError(staticErrorMessage);
        }
    }

    const checkIfTransactionsExists = async() => {
        try {
            if (ethereum) {
                const transactionContract = getEthereumContract();
                const currentTransactionCount = await transactionContract.getTransactionCount();
                window.localStorage.setItem('transactionCount', currentTransactionCount);
            }
        }
        catch(error) {
        }
    }

    const connectToWallet = async () =>{
        try {
            if(!ethereum){
                showError('Please install metamask!');
                return;
            }

            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
            getAllTransactions();
        }
        catch(error) {
            showError(staticErrorMessage);
        }
    }

    const sendTransaction = async() => {
        try {
            if (!ethereum) {
                showError('Please install metamask!');
                return;
            }

            const { addressTo, amount, keyword, message } = formData;

            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //2100 GWEI
                    value: parsedAmount._hex
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            
            setIsLoading(true);
            await transactionHash.wait();
            setIsLoading(false);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());

            showSuccess('Great! Your transaction has been completed!');
        }
        catch(error) {
            showError(staticErrorMessage);
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExists();
    }, []);

    return(
        <TransactionContext.Provider value={{
            connectToWallet,
            currentAccount,
            formData,
            setFormData,
            handleChange,
            sendTransaction,
            transactionCount,
            transactions,
            isLoading}}>
            {children}
        </TransactionContext.Provider>
    )
}