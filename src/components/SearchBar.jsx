import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CookMasterContext } from '../context/CookMasterContext';

const FIRST_LETTER = 'first-letter';

export default function SearchBar() {
  const {
    location: { pathname },
    push,
  } = useHistory();
  const {
    filter,
    setFilter,
    searchParam,
    setSearchParam,
    setType,
    fetchRecipes,
    recipes,
  } = useContext(CookMasterContext);

  useEffect(() => {
    const type = pathname.includes('meals') ? 'meals' : 'drinks';
    setType(type);
  }, [pathname, setType]);

  useEffect(() => {
    if (recipes?.length === 1) {
      const { idMeal, idDrink } = recipes[0];
      const id = idMeal || idDrink;
      push(`/${pathname.split('/')[1]}/${id}`);
    }
  }, [recipes, push, pathname]);

  useEffect(() => {
    if (filter === FIRST_LETTER && searchParam.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  }, [filter, searchParam]);

  return (
    <div className="my-3 my-md-0 mr-md-auto me-md-3">
      <div className="mb-2">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="search"
          value="ingredient"
          id="ingredient"
          className="form-check-input mx-2"
          onChange={ ({ target }) => setFilter(target.value) }
          checked={ filter === 'ingredient' }
        />
        <label htmlFor="ingredient" className="form-check-label">
          Ingredient
        </label>

        <input
          type="radio"
          data-testid="name-search-radio"
          name="search"
          value="name"
          id="name"
          className="form-check-input mx-2"
          onChange={ ({ target }) => setFilter(target.value) }
          checked={ filter === 'name' }
        />
        <label htmlFor="name" className="form-check-label">
          Name
        </label>

        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="search"
          value="first-letter"
          id="first-letter"
          className="form-check-input mx-2"
          onChange={ ({ target }) => {
            setFilter(target.value);
            setSearchParam('');
          } }
          checked={ filter === FIRST_LETTER }
        />
        <label htmlFor="first-letter" className="form-check-label">
          First letter
        </label>
      </div>

      <div className="input-group">
        <input
          type="text"
          data-testid="search-input"
          placeholder="Buscar Receita"
          className="form-control me-2"
          onChange={ ({ target }) => setSearchParam(target.value) }
          value={ searchParam }
        />
        <button
          type="button"
          data-testid="exec-search-btn"
          className="btn btn-primary"
          onClick={ () => {
            if (filter === FIRST_LETTER && searchParam.length > 1) {
              global.alert('Your search must have only 1 (one) character');
            } else {
              fetchRecipes();
            }
          } }
        >
          Search
        </button>
      </div>
    </div>
  );
}
