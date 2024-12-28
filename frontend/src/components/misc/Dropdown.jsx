
import styles from '../../styles/Dropdown.module.css';
import { useState } from 'react';

const Dropdown = ({children , DropdownTitle}) => {
    const [isDropped, setIsDropped] = useState(false);

    const toggleDropdown = () => {
        console.log(children);
        setIsDropped(!isDropped);
    }

    return (
        <div className={styles.dropdownContainer}>
            <button className={styles.dropdownButton} onClick={(e) => toggleDropdown()}>
                <h2 className={styles.dropdownTitle}>{DropdownTitle}</h2>
                <svg xmlns="http://www.w3.org/2000/svg" className={isDropped?styles.dropdownImageRotated:styles.dropdownImage} viewBox="0 -960 960 960" ><path d="M480-360 280-560h400L480-360Z"/></svg>
            </button>
            
            {isDropped &&
                <div className={styles.dropdownContentContainer}>
                    {children}
                </div>
            }       
        </div>
    );
}

export default Dropdown;
