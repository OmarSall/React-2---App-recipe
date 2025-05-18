// src/components/RecipeForm.jsx
import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import styles from '../styles/RecipeForm.module.css';
import debounce from 'lodash.debounce';
import { v4 as uuidv4 } from 'uuid';


export default function RecipeForm({ initialRecipe = null, onClose }) {
    const { addRecipe, updateRecipe } = useContext(RecipeContext);
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [allergens, setAllergens] = useState('');
    const [steps, setSteps] = useState('');
    const [image, setImage] = useState(null);

    const debouncedSaveDraftRef = useRef();

    useEffect(() => {
        if (initialRecipe) {
            setTitle(initialRecipe.title);
            setIngredients(initialRecipe.ingredients);
            setAllergens(initialRecipe.allergens);
            setSteps(initialRecipe.steps);
            setImage(initialRecipe.image);
        } else {
            const stored = localStorage.getItem('draft-recipe');
            if (stored) {
                try {
                    const draft = JSON.parse(stored);
                    setTitle(draft.title || '');
                    setIngredients(draft.ingredients || '');
                    setAllergens(draft.allergens || '');
                    setSteps(draft.steps || '');
                    setImage(draft.image || null);
                } catch (error) {
                    console.error('Failed to load draft recipe', error);
                }
            }
        }
    }, [initialRecipe]);

    // Debounced autosave
    useEffect(() => {
        debouncedSaveDraftRef.current = debounce((draft) => {
            localStorage.setItem('draft-recipe', JSON.stringify(draft));
        }, 1000);

        return () => {
            debouncedSaveDraftRef.current?.cancel(); // Clean up on unmount
        };
    }, []);

    // Autosave draft
    useEffect(() => {
        if (!initialRecipe && debouncedSaveDraftRef.current) {
            const draft = { title, ingredients, allergens, steps, image };
            debouncedSaveDraftRef.current(draft);
        }
    }, [title, ingredients, allergens, steps, image, initialRecipe]);

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
            id: initialRecipe ? initialRecipe.id : uuidv4(),
            title,
            ingredients,
            allergens,
            steps,
            image,
        };
        if (initialRecipe) {
            updateRecipe(recipe);
            if (onClose) {
                onClose?.();
            }
        } else {
            addRecipe(recipe);
            localStorage.removeItem('draft-recipe');
        }
        setTitle('');
        setIngredients('');
        setAllergens('');
        setSteps('');
        setImage(null);
    };

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>{initialRecipe ? 'Edit Recipe' : 'Create New Recipe'}</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input className={styles.input} placeholder="Title" value={title} onChange={event => setTitle(event.target.value)} />
                <textarea className={styles.input} placeholder="Ingredients" value={ingredients} onChange={event => setIngredients(event.target.value)} />
                <input className={styles.input} placeholder="Allergens" value={allergens} onChange={event => setAllergens(event.target.value)} />
                <textarea className={styles.input} placeholder="Steps" value={steps} onChange={event => setSteps(event.target.value)} />
                <input type="file" className={styles.input} onChange={handleImage} />
                <button type="submit" className={styles.button}>
                    {initialRecipe ? 'Update Recipe' : 'Save Recipe'}
                </button>
            </form>
        </div>
    );
}
