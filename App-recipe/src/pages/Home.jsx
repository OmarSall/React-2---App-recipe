// src/pages/Home.jsx
import React from 'react';
import { RecipeProvider } from '../context/RecipeContext';
import RecipeForm from '../components/RecipeForm';
import RecipeList from '../components/RecipeList';
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <RecipeProvider>
            <div className={styles.container}>
                <h1 className={styles.heading}>My Recipes</h1>
                <RecipeForm />
                <RecipeList />
            </div>
        </RecipeProvider>
    );
}
