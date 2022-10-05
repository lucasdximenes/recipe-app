/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { getDoneRecipes } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import styles from '../styles/RecipeDetails.module.css';

const copy = require('clipboard-copy');

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState(getDoneRecipes());
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
    const filteredRecipes = getDoneRecipes().filter((recipe) => {
      if (filter === 'All') return true;
      return recipe.type === filter;
    });
    setDoneRecipes(filteredRecipes);
  }, [filter]);

  return (
    <div>
      <Header title="Done Recipes" search={ false } />

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
            className="btn btn-secondary"
            onClick={ () => setFilter('All') }
          >
            All
          </button>

          <button
            type="button"
            data-testid="filter-by-meal-btn"
            className="btn btn-secondary"
            onClick={ () => setFilter('meal') }
          >
            Meals
          </button>

          <button
            type="button"
            data-testid="filter-by-drink-btn"
            className="btn btn-secondary"
            onClick={ () => setFilter('drink') }
          >
            Drinks
          </button>
        </div>

        {doneRecipes.map((recipe, index) => (
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
                        const cuttedUrl = url.split('/done-recipes')[0];
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

                    <h4
                      data-testid={ `${index}-horizontal-done-date` }
                      className="card-text"
                    >
                      {recipe.doneDate}
                    </h4>

                    <div className="d-flex flex-wrap gap-2">
                      {recipe.tags.map((tag) => (
                        <span
                          key={ tag }
                          data-testid={ `${index}-${tag}-horizontal-tag` }
                          className="badge bg-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
