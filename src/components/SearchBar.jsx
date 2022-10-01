import React from 'react';

export default function SearchBar() {
  return (
    <div className="my-3 my-md-0 mr-md-auto order-4 order-md-2 me-md-3">
      <div className="mb-2">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="search"
          value="ingredient"
          id="ingredient"
          className="form-check-input mx-2"
        />
        <label htmlFor="ingredient" className="form-check-label">
          Ingrediente
        </label>

        <input
          type="radio"
          data-testid="name-search-radio"
          name="search"
          value="name"
          id="name"
          className="form-check-input mx-2"
        />
        <label htmlFor="name" className="form-check-label">
          Nome
        </label>

        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="search"
          value="first-letter"
          id="first-letter"
          className="form-check-input mx-2"
        />
        <label htmlFor="first-letter" className="form-check-label">
          Primeira letra
        </label>
      </div>

      <div className="input-group">
        <input
          type="text"
          data-testid="search-input"
          placeholder="Buscar Receita"
          className="form-control me-2"
        />
        <button
          type="button"
          data-testid="exec-search-btn"
          className="btn btn-primary"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
