import React from 'react';
import Header from './Header';

import styles from './MainLayout.scss';

function MainLayout({ children, location }) {
  return (
    <div className={styles.normal}>
      <Header location={location} />
      <div className="container">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
