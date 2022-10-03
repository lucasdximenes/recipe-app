import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getRecipeDetailsEndpoint } from '../services/mealsAndDrinksAPI';
import MealDetails from '../components/MealDetails';
import DrinkDetails from '../components/DrinkDetails';

export default function RecipeDetails() {
  const { id } = useParams();
  const {
    location: { pathname },
  } = useHistory();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const type = pathname.includes('meals') ? 'meals' : 'drinks';
    const URL = getRecipeDetailsEndpoint(type);

    const fetchRecipeDetails = async () => {
      const response = await fetch(`${URL}${id}`, { signal });
      const data = await response.json();
      setRecipe(data[type][0]);
    };
    fetchRecipeDetails();

    return () => controller.abort();
  }, [id, pathname]);

  return (
    <div className="container">
      {pathname.includes('meals') ? (
        <MealDetails recipe={ recipe } />
      ) : (
        <DrinkDetails recipe={ recipe } />
      )}
    </div>
  );
}
