import { ToastOptions } from "react-hot-toast";

const toastOptions = {
   'FAVOURITE_ADDED': {
     icon:'😊',
     style: {
        backgroundColor: 'var(--dark-tertiary)',
        color: 'var(--light-primary)',
        boxShadow: 'none',
        margin: '10px',
     }
   },
   'FAVOURITE_DELETED': {
     icon: '🥺',
     style: {
        backgroundColor: 'var(--dark-tertiary)',
        color: 'var(--light-primary)',
        boxShadow: 'none',
        margin: '10px',
     }
   } 
}

export default toastOptions;