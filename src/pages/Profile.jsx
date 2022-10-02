import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  return (
    <div>
      <Header title="Profile" search={ false } />
      <div>Profile</div>
      <Footer />
    </div>
  );
}
