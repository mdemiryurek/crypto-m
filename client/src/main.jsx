import React from 'react'
import ReactDOM from 'react-dom'
import './../styles/global.scss'
import App from './App'
import { TransactionProvider} from './context/TransactionContext';
import { AlertProvider} from './context/AlertContext';

ReactDOM.render(
  <AlertProvider>
    <TransactionProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </TransactionProvider>
  </AlertProvider>,
  
  document.getElementById('root')
)
