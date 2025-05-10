import { ToastOptions } from "react-hot-toast";

const toastOptions = {
   'FAVOURITE_ADDED': {
     icon:'😊',
     style: {
        backgroundColor: 'var(--bg-color-3)',
        color: 'var(--bg-color-5)',
        boxShadow: 'none',
        margin: '10px',
     }
   },
   'FAVOURITE_DELETED': {
     icon: '🥺',
     style: {
        backgroundColor: 'var(--bg-color-3)',
        color: 'var(--bg-color-5)',
        boxShadow: 'none',
        margin: '10px',
     }
   } 
}

export default toastOptions;