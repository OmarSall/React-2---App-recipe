import React from "react";
import styles from '../styles/RecipeCard.module.css';

export default function RecipeCard({ recipe }) {
    return (
       <div className={styles.card}>
           <div className={styles.imagePlaceholder}>Photo</div>
           <h3 className={styles.title}>{recipe.title}</h3>
           <p className={styles.preview}>Ingredients, steps preview...</p>
           <div className={styles.actions}>
               <button className={styles.edit}>Edit</button>
               <button className={styles.delete}>Delete</button>
           </div>
       </div>
    );
}