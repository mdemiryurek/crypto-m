import React, {useContext} from 'react'
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum} from "react-icons/si";
import { BsInfoCircle} from "react-icons/bs";
import { TransactionContext } from "../../context/TransactionContext";
import { useAlert } from "../../hooks/useAlert";
import { shortenAddress } from '../../utils/shortenAddress';
import Textbox from '../Textbox/Textbox';
import Button from '../Button/Button';
import styles from './Welcome.module.scss';

const Welcome = () => {
    const { connectToWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, isLoading } = useContext(TransactionContext);
    const {showError, hideAlert} = useAlert();
    const handleSubmit = (e) => {
        const { addressTo, amount, keyword, message } = formData;
        hideAlert();

        if(!addressTo || !amount || !keyword || !message) {
            showError('Please fill the form!');
            return;
        }
        sendTransaction();
    }

    return (
        <>
            <div className={styles.welcome}>
                <div>
                    <h1 className={styles.underline}>Send crypto across the world</h1>
                    <p>Explore the crpto world, send Ethereum, see your transactions. </p>

                    {!currentAccount && (
                        <div className={styles.buttonWrapper}>
                            <Button type="button"
                                title="Connect Wallet"
                                onClick={connectToWallet}>
                            </Button>
                        </div>
                    )}
                </div>
                
                <div className={styles.ethereumCard}>
                    <div className={styles.cardIcons}>
                        <SiEthereum fontSize={21} color='#fff'></SiEthereum>
                        <BsInfoCircle fontSize={17} color='#fff'></BsInfoCircle>
                    </div>

                    <div>
                        <p className='fs-small'>{shortenAddress(currentAccount)}</p>
                        <p className='fs-xx-large'>Ethereum</p>
                    </div>
                </div>
            </div>

            <div className={styles.welcome}>
                <div className={styles.features}>
                    <div> Reliability </div>
                    <div> Security </div>
                    <div> Ethereum </div>
                    <div> WEB 3.0 </div>
                    <div> Low fees </div>
                    <div> Blockchain </div>
                </div>

                {/* Send ethereum */}
                <div className={styles.form}>
                    <h2>Send Crypto Money</h2>
                    { !currentAccount && (
                        <p className={styles.warningMessage}>You must be connected your account to send money!</p>
                    )}

                    <Textbox placeHolder='Address To' name='addressTo' type='text' handleChange={handleChange}></Textbox>
                    <Textbox placeHolder='Amount (ETH)' name='amount' type='number' handleChange={handleChange}></Textbox>
                    <Textbox placeHolder='Keyword (Gif)' name='keyword' type='text' handleChange={handleChange}></Textbox>
                    <Textbox placeHolder='Enter Message' name='message' type='text' handleChange={handleChange}></Textbox>

                    <Button type="button"
                        title={isLoading ? 'Sending...' : 'Send'}
                        buttonStyle="secondary"
                        loading={isLoading}
                        disabled={!currentAccount}
                        onClick={handleSubmit}>
                    </Button>
                </div>
            </div>
        </>
        
    )
}

export default Welcome;