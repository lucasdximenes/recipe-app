const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const saveMealsToken = (token = 1) => {
  localStorage.setItem('mealsToken', JSON.stringify(token));
};

const saveDrinksToken = (token = 1) => {
  localStorage.setItem('drinksToken', JSON.stringify(token));
};

const getDoneRecipes = () => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return doneRecipes || [];
};

const saveDoneRecipe = (recipe) => {
  const doneRecipes = getDoneRecipes();
  localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, recipe]));
};

const getInProgressRecipes = () => {
  const inProgressRecipes = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );
  return inProgressRecipes || { drinks: {}, meals: {} };
};

const saveProgressRecipe = (recipeId, type, recipe) => {
  const inProgressRecipes = getInProgressRecipes();
  const newInProgressRecipes = {
    ...inProgressRecipes,
    [type]: {
      ...inProgressRecipes[type],
      [recipeId]: recipe,
    },
  };
  localStorage.setItem(
    'inProgressRecipes',
    JSON.stringify(newInProgressRecipes),
  );
};

const getFavoriteRecipes = () => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return favoriteRecipes || [];
};

const saveFavoriteRecipe = (recipe) => {
  const favoriteRecipes = getFavoriteRecipes();
  localStorage.setItem(
    'favoriteRecipes',
    JSON.stringify([...favoriteRecipes, recipe]),
  );
};

const isFavoriteRecipe = (recipeId) => {
  const favoriteRecipes = getFavoriteRecipes();
  return favoriteRecipes.some((recipe) => recipe.id === recipeId);
};

const removeFavoriteRecipe = (recipeId) => {
  const favoriteRecipes = getFavoriteRecipes();
  const newFavoriteRecipes = favoriteRecipes.filter(
    (favoriteRecipe) => favoriteRecipe.id !== recipeId,
  );
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
};

export {
  saveUser,
  saveMealsToken,
  saveDrinksToken,
  getDoneRecipes,
  getInProgressRecipes,
  getFavoriteRecipes,
  saveFavoriteRecipe,
  removeFavoriteRecipe,
  isFavoriteRecipe,
  saveProgressRecipe,
  saveDoneRecipe,
};
