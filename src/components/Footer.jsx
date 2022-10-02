/* eslint-disable react/jsx-max-depth */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { CookMasterContext } from '../context/CookMasterContext';

export default function Footer() {
  const {
    setSearchParam,
    setCategory,
    setResetCategoryFilter,
    resetCategoryFilter,
  } = useContext(CookMasterContext);

  const resetFilters = () => {
    setSearchParam('');
    setCategory('');
    setResetCategoryFilter(!resetCategoryFilter);
  };

  return (
    <div
      className="container sticky-bottom bg-white border-top shadow-sm px-md-4 py-2"
      data-testid="footer"
    >
      <div className="row">
        <div className="col-6">
          <p className="text-start mb-0">
            <Link to="/drinks" onClick={ () => resetFilters() }>
              <img
                src={ drinkIcon }
                alt="drinks"
                data-testid="drinks-bottom-btn"
                className="btn"
              />
            </Link>
          </p>
        </div>

        <div className="col-6">
          <p className="text-end mb-0">
            <Link to="/meals" onClick={ () => resetFilters() }>
              <img
                src={ mealIcon }
                alt="meals"
                data-testid="meals-bottom-btn"
                className="btn"
              />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
