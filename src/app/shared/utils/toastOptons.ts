import { ToastOptions } from "react-hot-toast";

const toastOptions = {
   'FAVOURITE_ADDED': {
     icon:'😊',
     style: {
        backgroundColor: 'var(--dark-tertiary)',
        color: 'var(--light-primary)'
     }
   } as ToastOptions,
   'FAVOURITE_DELETED': {
     icon: '🥺',
     style: {
        backgroundColor: 'var(--dark-tertiary)',
        color: 'var(--light-primary)'
     }
   } 
}

export default toastOptions;