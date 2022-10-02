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

const fetchSearchAPI = async (type, filter, searchParam) => {
  const URL = `${baseEndpoint(type)}${selectedFilter(filter)}${searchParam}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export default fetchSearchAPI;
