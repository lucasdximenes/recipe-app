import React, { createContext, useState } from 'react';
import propTypes from 'prop-types';
import fetchSearchAPI from '../services/mealsAndDrinksAPI';

export const CookMasterContext = createContext();

function CookMasterContextProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState('name');
  const [searchParam, setSearchParam] = useState('');
  const [type, setType] = useState('meals');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchRecipes = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSearchAPI(type, filter, searchParam);
      if (data[type] === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else {
        setRecipes(data[type]);
      }
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const contextValue = {
    recipes,
    filter,
    setFilter,
    searchParam,
    setSearchParam,
    setType,
    isLoading,
    isError,
    fetchRecipes,
  };

  return (
    <CookMasterContext.Provider value={ contextValue }>
      {children}
    </CookMasterContext.Provider>
  );
}

CookMasterContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default CookMasterContextProvider;
