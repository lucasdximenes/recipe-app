/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <div
      className="container fixed-bottom bg-white border-top shadow-sm px-md-4 p-3"
      data-testid="footer"
    >
      <div className="row">
        <div className="col-6">
          <p className="text-start mb-0">
            <Link to="/drinks">
              <img
                src={ drinkIcon }
                alt="drinks"
                data-testid="drinks-bottom-btn"
                className="btn"
                aria-hidden="true"
              />
            </Link>
          </p>
        </div>

        <div className="col-6">
          <p className="text-end mb-0">
            <Link to="/meals">
              <img
                src={ mealIcon }
                alt="meals"
                data-testid="meals-bottom-btn"
                className="btn"
                aria-hidden="true"
              />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
