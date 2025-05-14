// src/context/RecipeContext.jsx
import React, {createContext, useState, useEffect} from 'react';

export const RecipeContext = createContext();

export function RecipeProvider({children}) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        try {
            const data = localStorage.getItem('recipes');
            if (data) setRecipes(JSON.parse(data));
        } catch (err) {
            console.error('Failed to load recipes', err);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('recipes', JSON.stringify(recipes));
        } catch (err) {
            console.error('Failed to save recipes', err);
        }
    }, [recipes]);

    const addRecipe = (recipe) => setRecipes(prev => [...prev, recipe]);
    const deleteRecipe = (id) => setRecipes(prev => prev.filter(r => r.id !== id));
    const updateRecipe = (updated) =>
        setRecipes(prev => prev.map(recipe => (recipe.id === updated.id ? updated : recipe)));

    return (
        <RecipeContext.Provider value={{recipes, addRecipe, deleteRecipe, updateRecipe}}>
            {children}
        </RecipeContext.Provider>
    );
}
