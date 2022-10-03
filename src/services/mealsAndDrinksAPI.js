const baseEndpoint = (type) => {
  const drinksEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/';
  const mealsEndpoint = 'https://www.themealdb.com/api/json/v1/1/';
  return type === 'meals' ? mealsEndpoint : drinksEndpoint;
};

const selectedFilter = (filter) => {
  if (filter === 'name') {
    return 'search.php?s=';
  }
  if (filter === 'first-letter') {
    return 'search.php?f=';
  }
  if (filter === 'ingredient') {
    return 'filter.php?i=';
  }
};

const baseCategoriesEndpoint = (type) => {
  const mealsEndpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const drinksEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  return type === 'meals' ? mealsEndpoint : drinksEndpoint;
};

const recipeByCategoryEndpoint = (type) => {
  const mealsEndpoint = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const drinksEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
  return type === 'meals' ? mealsEndpoint : drinksEndpoint;
};

const getRecipeDetailsEndpoint = (type) => {
  const mealsEndpoint = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const drinksEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  return type === 'meals' ? mealsEndpoint : drinksEndpoint;
};

export {
  baseEndpoint,
  selectedFilter,
  baseCategoriesEndpoint,
  recipeByCategoryEndpoint,
  getRecipeDetailsEndpoint,
};
