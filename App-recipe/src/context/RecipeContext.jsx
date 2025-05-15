// src/context/RecipeContext.jsx
import React, {createContext, useState, useEffect} from 'react';

export const RecipeContext = createContext();

export function RecipeProvider({children}) {
    const [recipes, setRecipes] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        try {
            const data = localStorage.getItem('recipes');
            if (data) setRecipes(JSON.parse(data));
        } catch (error) {
            console.error('Failed to load recipes', error);
        } finally {
            setIsInitialized(true);
        }
    }, []);

    useEffect(() => {
        if (recipes.length === 0) {
            return;
        }
        if (isInitialized) {
            try {
                localStorage.setItem('recipes', JSON.stringify(recipes));
            } catch (error) {
                console.error('Failed to save recipes', error);
            }
        }
    }, [recipes, isInitialized]);

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
