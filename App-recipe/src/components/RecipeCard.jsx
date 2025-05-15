// src/components/RecipeCard.jsx
import React, { useContext, useState } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import Modal from './Modal';
import RecipeForm from './RecipeForm';
import styles from '../styles/RecipeCard.module.css';

export default function RecipeCard({ recipe }) {
    const { deleteRecipe } = useContext(RecipeContext);
    const [editing, setEditing] = useState(false);

    return (
        <div className={styles.card}>
            {recipe.image ? <img src={recipe.image} alt='recipe' className={styles.image} /> : <div className={styles.placeholder}>No Image</div>}
            <h3 className={styles.title}>{recipe.title}</h3>
            <p className={styles.preview}>{recipe.ingredients}</p>
            <div className={styles.actions}>
                <button className={styles.edit} onClick={() => setEditing(true)}>Edit</button>
                <button className={styles.delete} onClick={() => deleteRecipe(recipe.id)}>Delete</button>
            </div>
            {editing && (
                <Modal onClose={() => setEditing(false)}>
                    <RecipeForm editRecipe={recipe} onClose={() => setEditing(false)} />
                </Modal>
            )}
        </div>
    );
}
