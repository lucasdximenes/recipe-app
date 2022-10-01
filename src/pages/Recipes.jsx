import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

export default function Recipes() {
  const {
    location: { pathname },
  } = useHistory();
  const type = pathname.split('/')[1].split('')[0].toUpperCase();
  const title = `${type}${pathname.split('/')[1].slice(1)}`;

  return (
    <div>
      <Header title={ title } />
      <div>Recipes</div>
    </div>
  );
}
