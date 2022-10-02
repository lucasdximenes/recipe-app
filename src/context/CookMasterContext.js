import React, { createContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import {
  baseEndpoint,
  selectedFilter,
  baseCategoriesEndpoint,
  recipeByCategoryEndpoint,
} from '../services/mealsAndDrinksAPI';

export const CookMasterContext = createContext();

function CookMasterContextProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('name');
  const [searchParam, setSearchParam] = useState('');
  const [type, setType] = useState('meals');
  const [category, setCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [resetCategoryFilter, setResetCategoryFilter] = useState(false);

  // fetchRecipes - fetches recipes from API
  useEffect(() => {
    const URL = `${baseEndpoint(type)}${selectedFilter(filter)}${searchParam}`;
    const controller = new AbortController();
    const { signal } = controller;

    const fetchRecipes = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(URL, { signal });
        const data = await response.json();

        if (data[type] === null) {
          global.alert(
            'Sorry, we haven\'t found any recipes for these filters.',
          );
        } else {
          setRecipes(data[type]);
        }

        setIsError(false);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchRecipes();

    return () => {
      controller.abort();
    };
  }, [filter, searchParam, type, resetCategoryFilter]);

  // fetchCategories - fetches categories from API
  useEffect(() => {
    const URL = baseCategoriesEndpoint(type);
    const controller = new AbortController();
    const { signal } = controller;

    const fetchCategories = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(URL, { signal });
        const data = await response.json();

        setCategories(data.drinks || data.meals);

        setIsError(false);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchCategories();

    return () => {
      controller.abort();
    };
  }, [type]);

  // fetchRecipesByCategory - fetches recipes by category from API
  useEffect(() => {
    const URL = `${recipeByCategoryEndpoint(type)}${category}`;
    const controller = new AbortController();
    const { signal } = controller;

    const fetchRecipesByCategory = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(URL, { signal });
        const data = await response.json();

        setRecipes(data.drinks || data.meals);

        setIsError(false);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    if (category !== 'All') {
      fetchRecipesByCategory();
    }

    return () => {
      controller.abort();
    };
  }, [category, type]);

  const contextValue = {
    recipes,
    filter,
    setFilter,
    searchParam,
    setSearchParam,
    setType,
    isLoading,
    isError,
    categories,
    category,
    setCategory,
    resetCategoryFilter,
    setResetCategoryFilter,
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
