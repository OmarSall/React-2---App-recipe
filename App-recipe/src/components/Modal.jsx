// src/components/Modal.jsx
import React from 'react';
import styles from '../styles/Modal.module.css';

export default function Modal({ children, onClose }) {
    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
                <button className={styles.close} onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
}
