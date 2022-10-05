import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getUser, clearLocalStorage } from '../services/localStorage';

export default function Profile() {
  const user = getUser();
  const { push } = useHistory();

  return (
    <div>
      <Header title="Profile" search={ false } />

      <div className="container my-3">
        <h1 data-testid="profile-email" className="text-center">
          {user.email}
        </h1>

        <div className="d-flex flex-column align-items-center justify-content-center">
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => push('/done-recipes') }
            className="btn btn-primary mt-3"
          >
            Done Recipes
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => push('/favorite-recipes') }
            className="btn btn-primary mt-3"
          >
            Favorite Recipes
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            className="btn btn-danger mt-3"
            onClick={ () => {
              clearLocalStorage();
              push('/');
            } }
          >
            Logout
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
