const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const saveMealsToken = (token = 1) => {
  localStorage.setItem('mealsToken', JSON.stringify(token));
};

const saveDrinksToken = (token = 1) => {
  localStorage.setItem('drinksToken', JSON.stringify(token));
};

export { saveUser, saveMealsToken, saveDrinksToken };
