/* eslint-disable max-len */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, search, profile }) {
  const [searchBar, setSearchBar] = useState(false);
  const { push } = useHistory();

  return (
    <div className="bg-white border-bottom shadow-sm container px-md-4 p-3">
      <div className="d-flex flex-column flex-md-row align-items-center">
        <h5
          className="my-0 me-md-auto fw-normal order-1"
          data-testid="page-title"
        >
          {title}
        </h5>

        {search && (
          <div className="mr-md-3 me-md-2 order-3 order-md-3">
            <img
              src={ searchIcon }
              alt="search"
              data-testid="search-top-btn"
              className="btn"
              onClick={ () => setSearchBar(!searchBar) }
              aria-hidden="true"
            />
          </div>
        )}

        {profile && (
          <div className="my-3 my-md-0 mr-md-auto order-2 order-md-4">
            <img
              src={ profileIcon }
              alt="profile icon"
              data-testid="profile-top-btn"
              className="btn"
              onClick={ () => push('/profile') }
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {searchBar && <SearchBar />}
    </div>
  );
}

Header.propTypes = {
  title: propTypes.string.isRequired,
  search: propTypes.bool,
  profile: propTypes.bool,
};

Header.defaultProps = {
  search: true,
  profile: true,
};

export default Header;
