import React, {useContext} from 'react';
import { TransactionContext} from '../../context/TransactionContext';
import { shortenAddress } from '../../utils/shortenAddress';
import useFetch from '../../hooks/useFetch';
import styles from './Transactions.module.scss'

const TransactionCard = ({addressTo, addressFrom, timestamp, message, keyword, amount, url}) => {
    const gifUrl = useFetch({keyword});
    return (
        <div className={styles.card}>
            <div>
                <p className="fs-large fc-third">{timestamp}</p>
                <div className='space-6'>
                    <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
                        <p>From: {shortenAddress(addressFrom)}</p>
                    </a>
                    <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
                        <p>To: {shortenAddress(addressTo)}</p>
                    </a>
                    <p>Amount: {amount} ETH</p>
                    {message && (
                        <p>Message: {message}</p>
                    )}
                </div>
                <img src={gifUrl || url}
                    alt="nature"
                    style={styles.image}/>
            </div>
        </div>
    )
}

const Transactions = () => {
    const { transactions, currentAccount } = useContext(TransactionContext);
 
   return (
        <div>
            {currentAccount && (
                <h2 className='fc-secondary'>Latest Transactions</h2>
            )}

            <div className={styles.list}>
                {transactions.reverse().map((transaction, i) => (
                    <TransactionCard key={i} {...transaction} />
                ))}
            </div>
        </div>
    )
}

export default Transactions;