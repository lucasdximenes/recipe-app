/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getRecipeDetailsEndpoint } from '../services/mealsAndDrinksAPI';
import {
  saveProgressRecipe,
  getInProgressRecipes,
  isFavoriteRecipe,
  saveFavoriteRecipe,
  removeFavoriteRecipe,
  saveDoneRecipe,
} from '../services/localStorage';
import styles from '../styles/RecipeDetails.module.css';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import favoriteIconWhite from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

const MEASURE_NUM = /\d+/g;

export default function RecipeInProgress() {
  const {
    location: { state, pathname },
    push,
  } = useHistory();
  const { id } = useParams();
  const extractInteger = (str) => str.match(MEASURE_NUM).join('');
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const type = pathname.includes('meals') ? 'meals' : 'drinks';
    const URL = getRecipeDetailsEndpoint(type);

    const fetchRecipe = async () => {
      const response = await fetch(`${URL}${id}`, { signal });
      const data = await response.json();
      setRecipe(data[type][0]);
    };
    setIngredients(getInProgressRecipes()[type][id] || []);
    setIsFavorite(isFavoriteRecipe(id));
    if (!state) fetchRecipe();
    else setRecipe(state.recipe);

    return () => controller.abort();
  }, [pathname, state, id]);

  useEffect(() => {
    const type = pathname.includes('meals') ? 'meals' : 'drinks';
    saveProgressRecipe(id, type, ingredients);
    const done = Object.keys(recipe).filter(
      (key) => key.includes('strIngredient') && recipe[key],
    ).length === ingredients.length;
    setIsDone(done);
  }, [ingredients, pathname, id, recipe]);

  useEffect(() => {
    const THREE_SECONDS = 3000;
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), THREE_SECONDS);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const handleIngredientCheck = (e, key) => {
    const { checked } = e.target;
    setIngredients((prev) => {
      if (checked) return [...prev, key];
      return prev.filter((ingredient) => ingredient !== key);
    });
  };

  const handleShare = () => {
    const url = window.location.href;
    copy(url);
    setCopied(true);
  };

  const handleFavorite = () => {
    const type = pathname.includes('meals') ? 'meals' : 'drinks';
    const recipeToFav = {
      id: recipe.idMeal || recipe.idDrink,
      type,
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    };

    if (isFavorite) {
      removeFavoriteRecipe(recipe.idMeal);
      setIsFavorite(false);
    } else {
      saveFavoriteRecipe(recipeToFav);
      setIsFavorite(true);
    }
  };

  const handleDone = () => {
    const type = pathname.includes('meals') ? 'meals' : 'drinks';
    const recipeToDone = {
      id: recipe.idMeal || recipe.idDrink,
      type,
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
    };

    saveDoneRecipe(recipeToDone);
    push('/done-recipes');
  };

  return (
    <div className="container">
      {copied && (
        <div
          // prettier-ignore
          className={
            `alert alert-success fixed-top text-center ${styles.alertBoxAnimation}`
          }
        >
          <p className="alert-text fw-bold fs-5">Link copied!</p>
        </div>
      )}

      <div className="mt-3 mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <h1 data-testid="recipe-title" className="text-center">
            {recipe.strMeal || recipe.strDrink}
          </h1>

          <div>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ handleShare }
              className="btn btn-outline-secondary"
            >
              <img src={ shareIcon } alt="share" className="img-fluid" />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ handleFavorite }
              className="btn btn-outline-secondary"
            >
              <img
                src={ isFavorite ? favoriteIcon : favoriteIconWhite }
                alt="favorite"
                className="img-fluid"
              />
            </button>
          </div>
        </div>

        <h2 data-testid="recipe-category" className="text-muted">
          {recipe.strCategory || recipe.strAlcoholic}
        </h2>
      </div>

      <div className="row">
        <div className="col-12 col-md-6">
          <img
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
            data-testid="recipe-photo"
            className="img-fluid"
          />
        </div>

        <div className="col-12 col-md-6 mt-3 mt-md-0">
          <h3 className="text-center">Ingredients</h3>
          <ul className="list-group">
            {Object.keys(recipe).map((key) => {
              if (key.includes('strIngredient') && recipe[key]) {
                const measureKey = key.replace('Ingredient', 'Measure');
                return (
                  <li key={ key } className="list-group-item">
                    <label
                      htmlFor={ key }
                      data-testid={ `${extractInteger(key)}-ingredient-step` }
                      className="form-check-label"
                    >
                      <input
                        type="checkbox"
                        id={ key }
                        data-testid={ `${extractInteger(
                          key,
                        )}-ingredient-name-and-measure` }
                        onChange={ (e) => handleIngredientCheck(e, key) }
                        checked={ ingredients.includes(key) }
                        className="form-check-input me-2"
                      />
                      {`${recipe[key]} - ${recipe[measureKey] || ''}`}
                    </label>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>

      <div className="mt-3">
        <h2 className="text-center">Instructions</h2>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>

      <div className="container shadow p-3 bg-white rounded sticky-bottom">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="btn btn-primary w-100 fw-bold"
          disabled={ !isDone }
          onClick={ () => handleDone() }
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}
