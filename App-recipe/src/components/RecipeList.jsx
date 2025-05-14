// src/components/RecipeList.jsx
import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import RecipeCard from './RecipeCard';
import styles from '../styles/RecipeList.module.css';

export default function RecipeList() {
    const { recipes } = useContext(RecipeContext);
    return (
        <div className={styles.grid}>
            {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}
