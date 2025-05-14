import React from 'react';
import styles from '../styles/RecipeForm.module.css';

export default function RecipeForm() {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Create New Recipe</h2>
            <form className={styles.form}>
                <input className={styles.input} placeholder='Recipe title' />
                <textarea className={styles.input} placeholder='Recipe ingredients (comma separated)' />
                <input className={styles.input} placeholder='Allergens (optional)' />
                <textarea className={styles.input} placeholder='Cooking steps' />
                <input type='file' className={styles.input} />
                <button type='submit' className={styles.button}>
                    Save Recipe
                </button>
            </form>
        </div>
    );
}