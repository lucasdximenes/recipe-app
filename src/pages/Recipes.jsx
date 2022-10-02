/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CookMasterContext } from '../context/CookMasterContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoriesBar from '../components/CategoriesBar';

export default function Recipes() {
  const {
    location: { pathname },
    push,
  } = useHistory();
  const { recipes, setType } = useContext(CookMasterContext);
  const type = pathname.split('/')[1].split('')[0].toUpperCase();
  const title = type === 'M' ? 'Meals' : 'Drinks';
  const typePlural = type === 'M' ? 'Meal' : 'Drink';
  const MAX_RECIPES_CARD = 12;

  useEffect(() => {
    const fetchType = pathname.includes('meals') ? 'meals' : 'drinks';
    setType(fetchType);
  }, [pathname, setType]);

  return (
    <div>
      <Header title={ title } />

      <CategoriesBar />

      <div className="container">
        <div className="row mt-3">
          {recipes?.slice(0, MAX_RECIPES_CARD).map((recipe, index) => (
            <div
              className="col-12 col-md-6 col-lg-4"
              key={ index }
              data-testid={ `${index}-recipe-card` }
            >
              <div className="card mb-3">
                <img
                  src={ recipe[`str${typePlural}Thumb`] }
                  className="card-img-top"
                  alt={ recipe[`str${typePlural}`] }
                  data-testid={ `${index}-card-img` }
                />

                <div className="card-body d-flex justify-content-between align-items-center">
                  <h5 className="card-title" data-testid={ `${index}-card-name` }>
                    {recipe[`str${typePlural}`]}
                  </h5>

                  <button
                    type="button"
                    className="btn btn-primary"
                    data-testid={ `${index}-details-btn` }
                    onClick={ () => {
                      const { idMeal, idDrink } = recipe;
                      const id = idMeal || idDrink;
                      push(`/${pathname.split('/')[1]}/${id}`);
                    } }
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
