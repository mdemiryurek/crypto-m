import React, {useContext} from 'react'
import { AlertContext } from "./context/AlertContext";
import Alert from "./components/Alert/Alert"
import Header from "./components/Header/Header"
import Welcome from "./components/Welcome/Welcome"
import Transactions from "./components/Transactions/Transactions"
import styles from './App.module.scss'

const { ethereum } = window;

const App = () => {
  const {isAlertShown, alertType, alertMessage} = useContext(AlertContext);

  return (
    <div className={styles.container}>
      {isAlertShown && (
        <Alert type={alertType}
          position='fixed'>
            {alertMessage}
        </Alert>
      )}
      {!ethereum && (
        <Alert type='error'
          position='inherit'>
          You must install MetaMask to use this web site.<br/>
          <a href="https://metamask.io/download/" target="_blank" alt="Download MetaMask">Download MetaMask</a>
        </Alert>
      )}
      <Alert type='info'
          position='inherit'>
          Please note; this web site's smart contract works on Ropsten Test Network.<br/>
        </Alert>
      <Header></Header>

      <main className={styles.main}>
        <div className='container'>
          <Welcome></Welcome>
          <Transactions></Transactions>
        </div>
        
      </main>

      <footer className={styles.footer}>
        crypto-m | Ethereum Wallet - <a href='https://github.com/mdemiryurek' target='_blank'>GitHub repository</a>
      </footer>
    </div>
  )
}

export default App