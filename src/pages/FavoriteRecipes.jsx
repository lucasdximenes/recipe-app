/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import {
  getFavoriteRecipes,
  removeFavoriteRecipe,
} from '../services/localStorage';
import styles from '../styles/RecipeDetails.module.css';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState(getFavoriteRecipes());
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState('All');
  const { push } = useHistory();

  useEffect(() => {
    const THREE_SECONDS = 3000;
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), THREE_SECONDS);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  useEffect(() => {
    const filteredRecipes = getFavoriteRecipes().filter((recipe) => {
      if (filter === 'All') return true;
      return recipe.type === filter;
    });
    setFavoriteRecipes(filteredRecipes);
  }, [filter]);

  const handleFavorite = (recipeId) => {
    removeFavoriteRecipe(recipeId);
    setFavoriteRecipes(getFavoriteRecipes());
    setFilter('All');
  };

  return (
    <div>
      <Header title="Favorite Recipes" search={ false } />

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

        <div className="btn-group d-flex justify-content-center gap-2 my-3">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            className={ `btn btn-secondary ${filter === 'All' ? 'active' : ''}` }
            onClick={ () => setFilter('All') }
          >
            All
          </button>

          <button
            type="button"
            data-testid="filter-by-meal-btn"
            className={ `btn btn-secondary ${filter === 'meal' ? 'active' : ''}` }
            onClick={ () => setFilter('meal') }
          >
            Meals
          </button>

          <button
            type="button"
            data-testid="filter-by-drink-btn"
            className={ `btn btn-secondary ${
              filter === 'drink' ? 'active' : ''
            }` }
            onClick={ () => setFilter('drink') }
          >
            Drinks
          </button>
        </div>

        <div className="row">
          {favoriteRecipes.map((recipe, index) => (
            <div key={ recipe.id } className="card mb-3 shadow">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={ recipe.image }
                    alt={ recipe.name }
                    data-testid={ `${index}-horizontal-image` }
                    className="img-fluid rounded-start"
                  />
                </div>

                <div className="col-md-8">
                  <div className="card-body">
                    <div className="d-flex gap-2 align-items-center mb-3">
                      <button
                        type="button"
                        data-testid={ `${index}-horizontal-share-btn` }
                        onClick={ () => {
                          const url = window.location.href;
                          const cuttedUrl = url.split('/favorite-recipes')[0];
                          const type = recipe.type === 'meal' ? 'meals' : 'drinks';
                          copy(`${cuttedUrl}/${type}/${recipe.id}`);
                          setCopied(true);
                        } }
                        className="btn btn-outline-secondary"
                      >
                        <img src={ shareIcon } alt="share" />
                      </button>

                      <button
                        type="button"
                        onClick={ () => {
                          const type = recipe.type === 'meal' ? 'meals' : 'drinks';
                          push(`/${type}/${recipe.id}`);
                        } }
                        className="btn btn-primary"
                      >
                        Details
                      </button>

                      <button
                        type="button"
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        onClick={ () => handleFavorite(recipe.id) }
                        className="btn btn-outline-secondary"
                      >
                        <img src={ blackHeartIcon } alt="favorite" />
                      </button>
                    </div>

                    <div>
                      <h3
                        data-testid={ `${index}-horizontal-name` }
                        className="card-title"
                      >
                        {recipe.name}
                      </h3>

                      <h4
                        data-testid={ `${index}-horizontal-top-text` }
                        className="card-text"
                      >
                        {recipe.type === 'meal'
                          ? `${recipe.nationality} - ${recipe.category}`
                          : recipe.alcoholicOrNot}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
