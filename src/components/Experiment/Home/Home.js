import React from 'react';
import Template from './Template/Template';
import styles from './Home.scss'
const Home = () => {


  return (
    <div className={styles.container}>
      Home
      <div className={styles.list}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((template, index) => {
            return <Template className={styles.item} key={index}/>;
          })
        }
      </div>
    </div>
  );
};

Home.propTypes = {
};

export default Home;
