import React from "react";
import RecipeCard from "./RecipeCard";
import styles from '../styles/RecipeList.module.css';
import recipesList from '../data/recipesList';

export default function RecipeList() {

    return (
        <div className={styles.grid}>
            {recipesList.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}