import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CookMasterContext } from '../context/CookMasterContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Recipes() {
  const {
    location: { pathname },
  } = useHistory();
  const { recipes } = useContext(CookMasterContext);
  const type = pathname.split('/')[1].split('')[0].toUpperCase();
  const title = type === 'M' ? 'Meals' : 'Drinks';
  const typePlural = type === 'M' ? 'Meal' : 'Drink';
  const MAX_RECIPES_CARD = 12;

  return (
    <div>
      <Header title={ title } />

      <div className="container">
        <div className="row mt-3">
          {recipes.slice(0, MAX_RECIPES_CARD).map((recipe, index) => (
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

                <div className="card-body">
                  <h5 className="card-title" data-testid={ `${index}-card-name` }>
                    {recipe[`str${typePlural}`]}
                  </h5>
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
