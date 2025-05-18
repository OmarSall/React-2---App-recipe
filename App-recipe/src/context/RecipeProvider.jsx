// src/context/RecipeContext.jsx
import React, { useState, useEffect } from 'react';
import { RecipeContext } from './RecipeContext';

export function RecipeProvider({children}) {
    // Initialize recipes state with data from localStorage or fallback to empty array
    const [recipes, setRecipes] = useState(() => {
       try {
           const data = localStorage.getItem('recipes');
           return data ? JSON.parse(data) : [];
       } catch (error) {
           console.error('Failed to load recipes from localStorage', error);
           return [];
       }
    });

    useEffect(() => {
        try {
            localStorage.setItem('recipes', JSON.stringify(recipes));
        } catch (error) {
            console.error('Failed to save recipes to localStorage', error);
        }
    }, [recipes]);


    const addRecipe = (recipe) =>
        setRecipes(previousState => [...previousState, recipe]);
    const deleteRecipe = (id) =>
        setRecipes(previousState => previousState.filter(recipe => recipe.id !== id));
    const updateRecipe = (updated) =>
        setRecipes(previousState =>
            previousState.map(recipe => (recipe.id === updated.id ? updated : recipe)));

    return (
        <RecipeContext.Provider value={{recipes, addRecipe, deleteRecipe, updateRecipe}}>
            {children}
        </RecipeContext.Provider>
    );
}
