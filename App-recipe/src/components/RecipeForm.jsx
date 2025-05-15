// src/components/RecipeForm.jsx
import React, { useState, useContext, useEffect } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import styles from '../styles/RecipeForm.module.css';

export default function RecipeForm({ editRecipe = null, onClose }) {
    const { addRecipe, updateRecipe } = useContext(RecipeContext);
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [allergens, setAllergens] = useState('');
    const [steps, setSteps] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (editRecipe) {
            setTitle(editRecipe.title);
            setIngredients(editRecipe.ingredients);
            setAllergens(editRecipe.allergens);
            setSteps(editRecipe.steps);
            setImage(editRecipe.image);
        }
    }, [editRecipe]);

    const handleImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const recipe = {
            id: editRecipe ? editRecipe.id : Date.now(),
            title,
            ingredients,
            allergens,
            steps,
            image,
        };
        if (editRecipe) {
            updateRecipe(recipe);
            if (onClose) {
                onClose();
            }
        } else {
            addRecipe(recipe);
        }
        setTitle('');
        setIngredients('');
        setAllergens('');
        setSteps('');
        setImage(null);
    };

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>{editRecipe ? 'Edit Recipe' : 'Create New Recipe'}</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input className={styles.input} placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <textarea className={styles.input} placeholder="Ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)} />
                <input className={styles.input} placeholder="Allergens" value={allergens} onChange={e => setAllergens(e.target.value)} />
                <textarea className={styles.input} placeholder="Steps" value={steps} onChange={e => setSteps(e.target.value)} />
                <input type="file" className={styles.input} onChange={handleImage} />
                <button type="submit" className={styles.button}>
                    {editRecipe ? 'Update Recipe' : 'Save Recipe'}
                </button>
            </form>
        </div>
    );
}
