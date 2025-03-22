import Image from 'next/image';
import styles from './styles.module.scss';
import IError from '../../types/IError';

export default function Error({code, errorMessage} : IError){
    return(
        <div className={styles.errorComponent}>
           <div className={styles.errorContainer}>
            <Image src={'/error.svg'} height={50} width={50} alt='error icon' />
            <div className={styles.errorInfo}>
                <p>There was an error retrieving the data from the server. Try to refresh the page</p>
                <span>CODE: {code}</span>
            </div>
           </div>
        </div>
    )
}