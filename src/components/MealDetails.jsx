/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import {
  getDoneRecipes,
  getInProgressRecipes,
  isFavoriteRecipe,
  saveFavoriteRecipe,
  removeFavoriteRecipe,
} from '../services/localStorage';
import styles from '../styles/RecipeDetails.module.css';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import favoriteIconWhite from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

const MEASURE_NUM = /\d+/g;
const MAX_RECOMENDATIONS = 6;

function MealDetails({ recipe }) {
  const extractInteger = (str) => str.match(MEASURE_NUM).join('');
  const isDone = getDoneRecipes().some(
    (doneRecipe) => doneRecipe.id === recipe.idMeal,
  );
  const inProgress = Object.keys(getInProgressRecipes().meals).some(
    (key) => key === recipe.idMeal,
  );
  const [recomendations, setRecomendations] = useState([]);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(null);
  const { push } = useHistory();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const fetchRecomendations = async () => {
      const response = await fetch(URL, { signal });
      const data = await response.json();
      setRecomendations(data.drinks);
    };
    fetchRecomendations();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const THREE_SECONDS = 3000;
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), THREE_SECONDS);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  useEffect(() => {
    setIsFavorite(isFavoriteRecipe(recipe.idMeal));
  }, [recipe]);

  const handleShare = () => {
    const url = window.location.href;
    copy(url);
    setCopied(true);
  };

  const handleFavorite = () => {
    const recipeToFav = {
      id: recipe.idMeal,
      type: 'meal',
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };

    if (isFavorite) {
      removeFavoriteRecipe(recipe.idMeal);
      setIsFavorite(false);
    } else {
      saveFavoriteRecipe(recipeToFav);
      setIsFavorite(true);
    }
  };

  return (
    <div>
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
            {recipe.strMeal}
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
          {recipe.strCategory}
        </h2>
      </div>

      <div className="row">
        <div className="col-12 col-md-6">
          <img
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
            data-testid="recipe-photo"
            className="img-fluid"
          />
        </div>

        <div className="col-12 col-md-6 mt-3 mt-md-0">
          <h3 className="text-center">Ingredients</h3>
          <ul className="list-group">
            {Object.keys(recipe).map((key) => {
              if (key.includes('strIngredient') && recipe[key]) {
                return (
                  <li
                    key={ key }
                    data-testid={ `${
                      Number(extractInteger(key)) - 1
                    }-ingredient-name-and-measure` }
                    className="list-group-item"
                  >
                    {recipe[key]}
                    {' '}
                    -
                    {' '}
                    {recipe[`strMeasure${extractInteger(key)}`]}
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

      {recipe.strYoutube && (
        // video area
        <div className="mt-3 shadow p-3 mb-5 bg-body rounded">
          <h2 className="text-center">Video</h2>
          <iframe
            title="recipe-video"
            data-testid="video"
            src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
            className="w-100"
          />
        </div>
      )}

      <h2>Recommendations</h2>
      <div className="row flex-nowrap overflow-auto mb-3">
        {recomendations
          .slice(0, MAX_RECOMENDATIONS)
          .map((recomendation, index) => (
            <div
              key={ index }
              className="card m-2 col-6 col-sm-4 col-md-3 col-lg-2"
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                src={ recomendation.strDrinkThumb }
                alt={ recomendation.strDrink }
                className="card-img-top"
              />
              <div className="card-body">
                <h5
                  className="card-title"
                  data-testid={ `${index}-recommendation-title` }
                >
                  {recomendation.strDrink}
                </h5>
              </div>
            </div>
          ))}
      </div>

      {!isDone ? (
        <div className="container shadow p-3 bg-white rounded sticky-bottom">
          <button
            type="button"
            className="btn btn-primary w-100 fw-bold"
            data-testid="start-recipe-btn"
            onClick={ () => push({
              pathname: `/meals/${recipe.idMeal}/in-progress`,
              state: { recipe },
            }) }
          >
            {inProgress ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        </div>
      ) : (
        <div className="container shadow p-3 bg-white rounded sticky-bottom">
          <button
            type="button"
            className="btn btn-primary w-100 fw-bold"
            onClick={ () => push('/done-recipes') }
          >
            Finished Recipe
          </button>
        </div>
      )}
    </div>
  );
}

MealDetails.propTypes = {
  recipe: propTypes.shape({
    idMeal: propTypes.string,
    strMeal: propTypes.string,
    strArea: propTypes.string,
    strCategory: propTypes.string,
    strMealThumb: propTypes.string,
    strInstructions: propTypes.string,
    strYoutube: propTypes.string,
    strAlcoholic: propTypes.string,
  }).isRequired,
};

export default MealDetails;
