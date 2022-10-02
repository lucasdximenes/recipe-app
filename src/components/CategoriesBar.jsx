import React, { useContext } from 'react';
import { CookMasterContext } from '../context/CookMasterContext';

const MAX_CATEGORIES = 5;

export default function CategoriesBar() {
  const {
    category,
    categories,
    setCategory,
    resetCategoryFilter,
    setResetCategoryFilter,
  } = useContext(CookMasterContext);

  return (
    <div className="container bg-white border-bottom shadow-sm px-md-4 p-3">
      <div className="d-flex flex-row align-items-center overflow-auto">
        <button
          type="button"
          className="btn btn-outline-secondary mx-2"
          data-testid="All-category-filter"
          onClick={ () => {
            setCategory('All');
            setResetCategoryFilter(!resetCategoryFilter);
          } }
        >
          All
        </button>

        {categories.slice(0, MAX_CATEGORIES).map((cat, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${cat.strCategory}-category-filter` }
            className="btn btn-outline-secondary mx-2"
            onClick={ () => {
              if (category === cat.strCategory) {
                setCategory('All');
                setResetCategoryFilter(!resetCategoryFilter);
              } else {
                setCategory(cat.strCategory);
              }
            } }
          >
            {cat.strCategory}
          </button>
        ))}
      </div>
    </div>
  );
}
